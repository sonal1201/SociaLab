import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getUserData } from "@/context/userContext";
import { getProfileData } from "@/api/user";
import FeedPost from "@/components/interactionButtons/FeedPost";
import EditProfileModal from "@/components/EditProfileModal";
import { ArrowLeft } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Profile = () => {
  const { user } = getUserData();
  const { userId } = useParams();
  const finalUserId = userId || user?.id;

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const navigate = useNavigate();

  const fetchProfile = async () => {
    setLoading(true);

    try {
      const data = await getProfileData(finalUserId);
      setProfile(data);
    } catch (error) {
      console.log("Profile load error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (finalUserId) fetchProfile();
  }, [finalUserId]);

  useEffect(() => {
    if (profile && profile.followers && user) {
      const following = profile.followers.some((f) => f.followerId === user.id);
      setIsFollowing(following);
    }
  }, [profile, user]);

  const handleFollowToggle = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const url = isFollowing
        ? `${import.meta.env.VITE_API_URL}/api/v1/user/unfollow/${finalUserId}`
        : `${import.meta.env.VITE_API_URL}/api/v1/user/follow/${finalUserId}`;

      await axios.post(
        url,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setIsFollowing(!isFollowing);
      fetchProfile();
    } catch (error) {
      console.log("Follow/Unfollow error:", error);
    }
  };

  if (loading) {
    return (
      <div className="text-center gap-3 mt-10">
        <Spinner /> Loading profile...
      </div>
    );
  }

  if (!profile) {
    return <div className="text-center mt-10 text-red-600">User not found</div>;
  }

  const isMe = finalUserId === user?.id;

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Back Button */}
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            onClick={() => navigate("/feed")}
            className="cursor-pointer p-1 rounded-full w-fit hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Back to Feed</p>
        </TooltipContent>
      </Tooltip>

      {/* Profile Header */}
      <div className="flex items-center justify-center flex-col gap-4 mb-6">
        <img
          src={profile.profile?.profileImageUrl || "/default-avatar.png"}
          className="w-24 h-24 rounded-full hover:scale-110 object-cover"
        />

        <div className="text-center">
          <h1 className="text-xl font-bold">@{profile.profile?.username}</h1>
          <p className="text-gray-600">{profile.profile?.fullname}</p>

          <div className="flex justify-evenly w-full gap-20 mt-4 text-black">
            <div className="text-center">
              <h2 className="text-sm text-gray-600">Follower</h2>
              <h2 className="font-bold">{profile.followers.length}</h2>
            </div>

            <div className="text-center">
              <h2 className="text-sm text-gray-600">Following</h2>
              <h2 className="font-bold">{profile.following.length}</h2>
            </div>
          </div>

          {/* Follow / Edit button */}
          {isMe ? (
            <button
              onClick={() => setEditOpen(true)}
              className="mt-2 px-4 py-1 cursor-pointer bg-[#36572c] text-white rounded-lg"
            >
              Edit Profile
            </button>
          ) : (
            <button
              onClick={handleFollowToggle}
              className={`mt-2 px-4 py-1 cursor-pointer rounded-lg 
              ${isFollowing ? "bg-gray-400 text-black" : "bg-[#36572c] text-white"}`}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>
          )}
        </div>
      </div>

      {/* Bio */}
      <div className="mb-6">
        <h2 className="font-semibold">Bio</h2>
        <p className="text-gray-700">
          {profile.profile.bio || "No bio added."}
        </p>
      </div>

      {/* Posts */}
      <h2 className="font-semibold text-lg mb-3">Posts</h2>
      <div className="space-y-5">
        {profile.posts.length === 0 ? (
          <p className="text-gray-500 text-center">No posts yet.</p>
        ) : (
          profile.posts.map((post) => <FeedPost key={post.id} post={post} />)
        )}
      </div>

      <EditProfileModal open={editOpen} setOpen={setEditOpen} />
    </div>
  );
};

export default Profile;
