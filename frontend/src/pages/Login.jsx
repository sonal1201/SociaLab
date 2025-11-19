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

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = getUserData();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
        "http://localhost:3001/api/v1/user/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        try {
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("user", JSON.stringify(res.data.updateUser));
        } catch (e) {
          console.warn(
            "Could not save access token or user to localStorage",
            e
          );
        }
        setUser(res.data.updateUser);

        navigate("/feed");
        toast.success(res.data.message || "Logged in");
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
                Login With Your Account
              </CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label className={"text-[#36572c]"} htmlFor="email">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="m@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label className={"text-[#36572c]"} htmlFor="password">
                        Password
                      </Label>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <Button
                        type="button"
                        variant={"ghost"}
                        className={
                          "w-fit absolute right-0 top-0 px-3 py-2 hover:bg-transparent"
                        }
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="text-gray-600" />
                        ) : (
                          <Eye />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Button
                  type="submit"
                  className="w-full mt-8 hover:bg-[#43634d] bg-[#36572c] cursor-pointer"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader className="mr-2 animate-spin" />
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
                <p className="text-center text-sm text-[#36572c]">
                  Don't have an account?
                  <span
                    className="underline cursor-pointer text-[#1f3d16]"
                    onClick={() => navigate("/register")}
                  >
                    Sign up
                  </span>
                </p>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
