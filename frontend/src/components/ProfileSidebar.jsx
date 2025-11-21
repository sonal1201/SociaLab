import React from "react";
import { TowerControlIcon } from "lucide-react";
import { getUserData } from "@/context/userContext";

const ProfileSidebar = () => {
  const { user } = getUserData();

  return (
    <>
      <div className="mt-5 ">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex justify-center items-center w-full lg:w-30">
            <div className="rounded-full bg-gray-200 p-5 overflow-hidden">
              {user?.profile?.profileImageUrl ? (
                <img
                  src={user.profile.profileImageUrl}
                  alt="avatar"
                  className="w-12 h-12 object-cover rounded-full"
                />
              ) : (
                <img
                  src="/default-avatar.png"
                  className="w-12 h-12 rounded-full opacity-70"
                  alt="default"
                />
              )}
            </div>
          </div>

          <div className="text-center lg:text-left w-full">
            <div className="text-black text-lg font-semibold">
              @{user?.profile?.username}
            </div>

            <div className="flex justify-evenly lg:justify-start w-full gap-5 mt-4 text-black">
              <div className="text-center">
                <h2 className="text-sm text-gray-600">Follower</h2>
                <h2 className="font-bold">{0}</h2>
              </div>

              <div className="text-center">
                <h2 className="text-sm text-gray-600">Following</h2>
                <h2 className="font-bold">{0}</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="text-sm mt-4 text-gray-700">
          <h2 className="text-gray-600">Bio:</h2>
          <h2 className="text-black">{user?.profile?.bio || "No bio added"}</h2>
        </div>
      </div>
    </>
  );
};

export default ProfileSidebar;
