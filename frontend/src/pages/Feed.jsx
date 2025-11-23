import React, { useState } from "react";
import { getUserData } from "@/context/userContext";
import FeedBar from "@/components/FeedBar";
import FeedComponent from "@/components/FeedComponent";

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

      <FeedBar refreshFeed={() => setRefreshKey((k) => k + 1)} />

      <FeedComponent key={refreshKey} />
    </div>
  );
};

export default Feed;
