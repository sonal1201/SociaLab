import React, { useState } from "react";
import axios from "axios";
import { getUserData } from "@/context/userContext";

import { toast } from "sonner";

const FeedBar = ({ refreshFeed }) => {
  const { user } = getUserData();

  const [postText, setPostText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [postImage, setPostImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPostImage(file);
    setImagePreview(URL.createObjectURL(file));

    e.target.value = null;
  };

  const removeImage = () => {
    setPostImage(null);
    setImagePreview(null);

    const fileInput = document.getElementById("postImageInput");
    if (fileInput) fileInput.value = "";
  };

  const uploadPost = async () => {
    if (!postText.trim() && !postImage) {
      toast.error("Write something or add an image!");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("accessToken");

      const formData = new FormData();
      formData.append("caption", postText);
      if (postImage) formData.append("postImage", postImage);

      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/user/posts`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          validateStatus: () => true, 
        }
      );


      if (res.status >= 200 && res.status < 300) {
        toast.success("Post uploaded!");
      } else if (res.data?.post) {
        toast.success("Post uploaded!"); 
      } else {
        toast.error(res.data?.error || "Failed to upload post");
        return;
      }

      setPostText("");
      removeImage();
      refreshFeed && refreshFeed();
    } catch (error) {
      console.log("Post upload error:", error);
      toast.error("Failed to upload post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full  flex flex-col">
      <div className="border-b border-gray-300 p-4 flex items-start gap-3">
        <img
          src={user?.profile?.profileImageUrl || "/default-avatar.png"}
          alt="me"
          className="w-10 h-10 rounded-full object-cover"
        />

        <div className="flex-1">
          <textarea
            placeholder="What's on your mind?"
            rows={4}
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            className="w-full bg-transparent border-none outline-none resize-none 
              text-gray-800 placeholder-gray-500 "
          />

          {imagePreview && (
            <div className="relative mt-3">
              <img
                src={imagePreview}
                className="rounded-xl max-h-72 object-cover border"
                alt="preview"
              />
            </div>
          )}

          <div className="flex items-center gap-3 justify-end mt-2">
            {!imagePreview ? (
              <label
                className="cursor-pointer text-[#36572c] text-sm font-medium 
                  border border-gray-300 rounded-full px-4 py-1 
                  hover:bg-gray-100 transition"
              >
                <input
                  id="postImageInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                Add Image
              </label>
            ) : (
              <button
                onClick={removeImage}
                className="cursor-pointer text-[#36572c] text-sm font-medium 
                  border border-gray-300 rounded-full px-4 py-1 
                  hover:bg-gray-100 transition"
              >
                Remove Image
              </button>
            )}

            <button
              onClick={uploadPost}
              disabled={loading}
              className="hover:bg-[#43634d] bg-[#36572c] text-white px-4 py-1 
                rounded-full cursor-pointer disabled:opacity-50"
            >
              {loading ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedBar;
