import React, { useState } from "react";
import { getUserData } from "@/context/userContext";
import LikeButton from "./ui/likeButton";
import CommentButton from "./ui/CommentButton";

const FeedBar = () => {
  const { user } = getUserData();

  const [postText, setPostText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);

    e.target.value = null;
  };

  const removeImage = () => {
    setImagePreview(null);

    const fileInput = document.getElementById("postImageInput");
    if (fileInput) fileInput.value = "";
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="border-b border-gray-300 p-4 flex items-start gap-3">
        <img
          src={user?.profile?.profileImageUrl || "/default-avatar.png"}
          alt="me"
          className="w-10 h-10 rounded-full object-cover"
        />

        <div className="flex-1">
          <textarea
            placeholder="What's on your mind?"
            rows={2}
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            className="w-full bg-transparent border-none outline-none resize-none 
                    text-gray-800 placeholder-gray-500"
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
                className=" cursor-pointer text-[#36572c] text-sm font-medium 
                        border border-gray-300 rounded-full px-4 py-1 
                        hover:bg-gray-100 transition"
              >
                Remove Image
              </button>
            )}

            <button className="hover:bg-[#43634d] bg-[#36572c] cursor-pointer text-white px-4 py-1 rounded-full">
              Post
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1  py-4 space-y-6">
        <div className="border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <img src="/default-avatar.png" className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-semibold">@username</p>
              <span className="text-xs text-gray-500">2 hours ago</span>
            </div>
          </div>

          <p className="text-gray-700 mb-3">
            This is a sample post. Add your UI here.
          </p>

          <img
            src="/default-avatar.png"
            className="w-full rounded-xl"
            alt="post"
          />

          <div className="flex items-center justify-start gap-7 mt-4 text-gray-600">
            <LikeButton />
            <CommentButton />
          </div>
          
        </div>
        
      </div>
      <div className="flex-1  py-4 space-y-6">
        <div className="border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <img src="/default-avatar.png" className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-semibold">@username</p>
              <span className="text-xs text-gray-500">2 hours ago</span>
            </div>
          </div>

          <p className="text-gray-700 mb-3">
            This is a sample post. Add your UI here.
          </p>

          <img
            src="/default-avatar.png"
            className="w-full rounded-xl"
            alt="post"
          />

          <div className="flex items-center justify-start gap-7 mt-4 text-gray-600">
            <LikeButton />
            <CommentButton />
          </div>
          
        </div>
        
      </div>
      <div className="flex-1  py-4 space-y-6">
        <div className="border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <img src="/default-avatar.png" className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-semibold">@username</p>
              <span className="text-xs text-gray-500">2 hours ago</span>
            </div>
          </div>

          <p className="text-gray-700 mb-3">
            This is a sample post. Add your UI here.
          </p>

          <img
            src="/default-avatar.png"
            className="w-full rounded-xl"
            alt="post"
          />

          <div className="flex items-center justify-start gap-7 mt-4 text-gray-600">
            <LikeButton />
            <CommentButton />
          </div>
          
        </div>
        
      </div>
      <div className="flex-1  py-4 space-y-6">
        <div className="border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <img src="/default-avatar.png" className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-semibold">@username</p>
              <span className="text-xs text-gray-500">2 hours ago</span>
            </div>
          </div>

          <p className="text-gray-700 mb-3">
            This is a sample post. Add your UI here.
          </p>

          <img
            src="/default-avatar.png"
            className="w-full rounded-xl"
            alt="post"
          />

          <div className="flex items-center justify-start gap-7 mt-4 text-gray-600">
            <LikeButton />
            <CommentButton />
          </div>
          
        </div>
        
      </div>
      <div className="flex-1  py-4 space-y-6">
        <div className="border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <img src="/default-avatar.png" className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-semibold">@username</p>
              <span className="text-xs text-gray-500">2 hours ago</span>
            </div>
          </div>

          <p className="text-gray-700 mb-3">
            This is a sample post. Add your UI here.
          </p>

          <img
            src="/default-avatar.png"
            className="w-full rounded-xl"
            alt="post"
          />

          <div className="flex items-center justify-start gap-7 mt-4 text-gray-600">
            <LikeButton />
            <CommentButton />
          </div>
          
        </div>
        
      </div>
    </div>
  );
};

export default FeedBar;
