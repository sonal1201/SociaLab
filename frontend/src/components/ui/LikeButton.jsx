import React, { useState } from "react";
import axios from "axios";
import { Heart } from "lucide-react";
import { toast } from "sonner";

const LikeButton = ({ postId, likedBy }) => {
  const token = localStorage.getItem("accessToken");

  const myId = JSON.parse(localStorage.getItem("user"))?.id;
  const alreadyLiked = likedBy.some((l) => l.userId === myId);

  const [liked, setLiked] = useState(alreadyLiked);
  const [count, setCount] = useState(likedBy.length);

  const toggleLike = async () => {
    try {
      if (liked) {
        await axios.delete(
          `http://localhost:3001/api/v1/user/posts/${postId}/unlike`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setLiked(false);
        setCount((c) => c - 1);
      } else {
       //like
        await axios.post(
          `http://localhost:3001/api/v1/user/posts/${postId}/like`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setLiked(true);
        setCount((c) => c + 1);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <button
      onClick={toggleLike}
      className="flex items-center gap-1 text-sm cursor-pointer"
    >
      <Heart
        size={20}
        className={liked ? "fill-red-500 text-red-500" : "text-gray-600"}
      />
      <span>{count}</span>
    </button>
  );
}; 

export default LikeButton;
