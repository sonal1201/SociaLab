import React, { useEffect, useState } from "react";
import axios from "axios";
import FeedPost from "./interactionButtons/FeedPost";

const FeedComponent = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeed = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/user/feed`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setPosts(res.data.posts || []);
    } catch (error) {
      console.log("Feed Error:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">Loading feed...</div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No posts yet. Follow users to see their posts.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 py-4">
      {posts.map((post) => (
        <FeedPost key={post.id} post={post} />
      ))}
    </div>
  );
};

export default FeedComponent;
