import React, { useState, useEffect } from "react";
import axios from "axios";

const FollowUser = ({ userId, initialFollowState }) => {
  const [isFollowing, setIsFollowing] = useState(initialFollowState);
  const [loading, setLoading] = useState(false);

  const handleFollow = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const token = localStorage.getItem("accessToken");

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user/follow/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsFollowing(res.data.isFollowing);
    } catch (err) {
      console.log("Follow Error:", err);
    }

    setLoading(false);
  };

  return (
    <button
      onClick={handleFollow}
      disabled={loading}
      className={`px-4 py-1 rounded-full text-sm font-medium transition
        ${isFollowing ? "bg-gray-300 text-gray-800" : "bg-[#36572c] text-white"}
        ${loading && "opacity-70 cursor-not-allowed"}
      `}
    >
      {loading ? "..." : isFollowing ? "Following" : "Follow"}
    </button>
  );
};

export default FollowUser;
