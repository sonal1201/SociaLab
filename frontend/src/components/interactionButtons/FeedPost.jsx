import React from "react";
import LikeButton from "../ui/LikeButton";
import CommentButton from "../ui/CommentButton";

const FeedPost = ({ post }) => {
  const profile = post.user.profile;

  return (
    <div className="border border-gray-200 rounded-xl p-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src={profile?.profileImageUrl || "/default-avatar.png"}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold">@{profile?.username}</p>
          <span className="text-xs text-gray-500">
            {new Date(post.createdAt).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Caption */}
      {post.caption && <p className="text-gray-700 mb-3">{post.caption}</p>}

      {/* Image */}
      {post.image && (
        <img src={post.image} className="w-full rounded-xl object-cover" />
      )}

      {/* Buttons */}
      <div className="flex items-center justify-start gap-5 mt-4 text-gray-600">
        <LikeButton postId={post.id} likedBy={post.likes} />
        <CommentButton postId={post.id} comments={post.comments} />
      </div>
    </div>
  );
};

export default FeedPost;
