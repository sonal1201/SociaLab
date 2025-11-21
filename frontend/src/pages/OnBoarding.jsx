import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Highlighter } from "@/components/ui/highlighter";
import { Eye, EyeClosed, EyeOff, Loader } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { getUserData } from "@/context/userContext";

const OnBoarding = () => {
  const navigate = useNavigate();
  const { setUser } = getUserData();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    bio: "",
    profileImageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:3001/api/v1/onBoard/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (res.data.success) {
        navigate("/feed");
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message || res.data.error || "Login failed");
      }
    } catch (error) {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Something went wrong";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative h-screen w-full bg-linear-to-b from-[#6b8c75] to-[#dff6e9] overflow-hidden">
      <div className="min-h-screen flex flex-col to-muted/20">
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-md space-y-1 ">
            <div className="text-center font-sans text-3xl font-bold  text-white ">
              <Highlighter action="highlight" color="#36572c" padding={15}>
                SOCIALOGY
              </Highlighter>
            </div>
            <div className="text-center space-y-2 text-md font-sans tracking-tight text-[#114900]">
              A simple, clean space to share your world.
            </div>
          </div>
          <Card className="w-full max-w-sm mt-2">
            <CardHeader>
              <CardTitle className={"text-[#36572c] text-center"}>
                Complete Your Profile
              </CardTitle>
              <CardDescription className={"text-center"}>
                Set up your username and basic details
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center gap-3 mt-2">
                    <label htmlFor="profileImage" className="cursor-pointer">
                      <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-[#36572c] shadow-md hover:opacity-90 transition">
                        {formData.profileImageUrl ? (
                          <img
                            src={formData.profileImageUrl}
                            alt="Profile Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex text-xs items-center text-center justify-center bg-gray-100 text-gray-600">
                            Upload Photo
                          </div>
                        )}
                      </div>
                    </label>

                    <label
                      htmlFor="profileImage"
                      className="text-[#36572c]  text-sm cursor-pointer hover:underline"
                    >
                      Change Your Profile Picture
                    </label>

                    <input
                      id="profileImage"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      //fix this
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        const previewUrl = URL.createObjectURL(file);

                        setFormData((prev) => ({
                          ...prev,
                          profileImageUrl: previewUrl, // local browser URL
                        }));
                      }}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label className={"text-[#36572c] required"} htmlFor="text">
                      Username <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="username"
                      type="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="example_12"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label className={"text-[#36572c] required"} htmlFor="text">
                      Fullname <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="fullname"
                      type="fullname"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleChange}
                      placeholder=""
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label className={"text-[#36572c] required"} htmlFor="text">
                      Bio
                    </Label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Tell us something about yourself..."
                      required
                      maxrows={4}
                      className="w-full rounded-md border shadow:2xl  p-2 focus:outline-none focus:ring-3 focus:ring-gray-600/30  resize-none"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Button
                  type="submit"
                  className="
    w-full mt-8 bg-[#36572c] hover:bg-[#43634d] cursor-pointer
    disabled:opacity-60 disabled:cursor-not-allowed
  "
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader className="mr-2 animate-spin" />
                    </>
                  ) : (
                    "Complete Profile"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OnBoarding;
