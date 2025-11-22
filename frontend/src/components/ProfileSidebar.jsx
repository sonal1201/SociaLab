import React, { useEffect, useState } from "react";
import axios from "axios";
import { getUserData } from "@/context/userContext";
import SuggestedUsers from "./SuggestedUsers";
import { RefreshCw } from "lucide-react";

const ProfileSidebar = () => {
  const { user } = getUserData();

  const [followers, setFollowers] = useState(0);
  const [followings, setFollowings] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCounts = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const followerRes = await axios.get(
        `http://localhost:3001/api/v1/user/get-follower/${user.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const followingRes = await axios.get(
        `http://localhost:3001/api/v1/user/get-following/${user.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setFollowers(followerRes.data?.followers?.length ?? 0);
      setFollowings(followingRes.data?.following?.length ?? 0);
    } catch (error) {
      console.log("profileSideBar Error:", error);
    }
  };

  useEffect(() => {
    if (!user) return;
    fetchCounts();
  }, [user]);

  return (
    <>
      <div className="mt-5">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Profile Image */}
          <div className="flex justify-center items-center w-full lg:w-30">
            <div className="rounded-full bg-gray-200 overflow-hidden">
              {user?.profile?.profileImageUrl ? (
                <img
                  src={user.profile.profileImageUrl}
                  alt="avatar"
                  className="w-20 h-20 object-cover border-4 hover:scale-110 transition-all duration-300 border-gray-400 rounded-full"
                />
              ) : (
                <img
                  src="/default-avatar.png"
                  className="w-20 h-20 rounded-full opacity-70"
                  alt="default"
                />
              )}
            </div>
          </div>

          {/* Username + counts */}
          <div className="text-center lg:text-left w-full">
            <div className="text-black text-lg font-semibold">
              @{user?.profile?.username}
            </div>

            <div className="flex justify-evenly lg:justify-start w-full gap-4 mt-4 text-black">
              <div className="text-center">
                <h2 className="text-sm text-gray-600">Follower</h2>
                <h2 className="font-bold">{followers}</h2>
              </div>

              <div className="text-center">
                <h2 className="text-sm text-gray-600">Following</h2>
                <h2 className="font-bold">{followings}</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="text-sm mt-4 text-gray-700">
          <h2 className="text-gray-600">Bio:</h2>
          <h2 className="text-black">{user?.profile?.bio || "No bio added"}</h2>
        </div>
      </div>

      <div className="w-full border-t border-gray-300 my-5"></div>

      {/* Suggested Users */}
      <SuggestedUsers onFollowChange={fetchCounts} />
    </>
  );
};

export default ProfileSidebar;
