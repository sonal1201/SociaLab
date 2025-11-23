import React, { useState } from "react";
import { getUserData } from "@/context/userContext";
import FeedComponent from "@/components/FeedComponent.jsx";
import FeedBarr from "@/components/FeedBarr";

const Feed = () => {
  const { user } = getUserData();
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div>
      <h1 className="mb-4">
        Welcome @
        <span className="font-bold text-green-900">
          {user?.profile?.username}
        </span>
      </h1>

      <FeedBarr refreshFeed={() => setRefreshKey((k) => k + 1)} />

      <FeedComponent key={refreshKey} />
    </div>
  );
};

export default Feed;
