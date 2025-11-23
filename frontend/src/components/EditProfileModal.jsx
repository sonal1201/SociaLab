import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";
import { toast } from "sonner";
import { getUserData } from "@/context/userContext";

const EditProfileModal = ({ open, setOpen }) => {
  const { user, setUser } = getUserData();

  const [formState, setFormState] = useState({
    username: "",
    fullname: "",
    bio: "",
    profileImageUrl: "",
  });

  const [previewImg, setPreviewImg] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load initial user data in form
  useEffect(() => {
    if (user?.profile) {
      const data = {
        username: user.profile.username,
        fullname: user.profile.fullname,
        bio: user.profile.bio,
        profileImageUrl: user.profile.profileImageUrl,
      };

      setFormState(data);
      setPreviewImg(data.profileImageUrl);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageSelect = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreviewImg(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const fd = new FormData();
      fd.append("username", formState.username);
      fd.append("fullname", formState.fullname);
      fd.append("bio", formState.bio);

      if (file) fd.append("profileImage", file);

      const token = localStorage.getItem("accessToken");

      const res = await axios.put(
        "http://localhost:3001/api/v1/onBoard/edit-profile",
        fd,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUser(res.data.updatedUser);
      toast.success("Profile updated successfully!");

      setOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-6 max-w-sm rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold text-[#36572c]">
            Edit Profile
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#36572c]">
              <img
                src={previewImg || "/default-avatar.png"}
                alt="preview"
                className="w-full h-full object-cover"
              />
            </div>

            <label className="cursor-pointer text-sm text-[#36572c] font-medium">
              Change Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
            </label>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[#36572c] font-semibold">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="username"
              value={formState.username}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 text-sm"
              placeholder="your_username"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[#36572c] font-semibold">
              Fullname <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullname"
              value={formState.fullname}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 text-sm"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[#36572c] font-semibold">Bio</label>
            <textarea
              name="bio"
              value={formState.bio}
              onChange={handleChange}
              rows="3"
              className="border rounded-md px-3 py-2 text-sm resize-none"
              placeholder="Write something about yourself..."
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-4 w-full bg-[#36572c] hover:bg-[#43634d] text-white py-2 rounded-lg disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
