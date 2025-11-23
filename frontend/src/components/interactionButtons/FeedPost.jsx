import React from "react";
import LikeButton from "../ui/LikeButton";
import CommentButton from "../ui/CommentButton";
import { useNavigate } from "react-router-dom";

const FeedPost = ({ post }) => {
  const profile = post.user.profile;
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate(`/profile/${post.user.id}`);
  };

  return (
    <div className="border border-gray-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <div
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition"
          onClick={goToProfile}
        >
          <img
            src={profile?.profileImageUrl || "/default-avatar.png"}
            className="w-10 h-10 rounded-full object-cover"
          />
          <p className="font-semibold">@{profile?.username}</p>
        </div>

        <span className="text-xs text-gray-500 ml-auto">
          {new Date(post.createdAt).toLocaleString()}
        </span>
      </div>

      {post.caption && <p className="text-gray-700 mb-3">{post.caption}</p>}

      {post.image && (
        <img src={post.image} className="w-full rounded-xl object-cover" />
      )}

      <div className="flex items-center justify-start gap-7 mt-4 text-gray-600">
        <LikeButton postId={post.id} likedBy={post.likes} />
        <CommentButton postId={post.id} comments={post.comments} />
      </div>
    </div>
  );
};

export default FeedPost;
