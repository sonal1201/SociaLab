import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserData } from "@/context/userContext";
import { getProfileData } from "@/api/user";
import FeedPost from "@/components/interactionButtons/FeedPost";
import EditProfileModal from "@/components/EditProfileModal";
import { ArrowLeft } from "lucide-react";

const Profile = () => {
  const { user } = getUserData();
  const { userId } = useParams();
  const finalUserId = userId || user?.id;

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);

  const navigate = useNavigate();

  const fetchProfile = async () => {
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

  if (loading) {
    return <div className="text-center mt-10">Loading profile...</div>;
  }

  if (!profile) {
    return <div className="text-center mt-10 text-red-600">User not found</div>;
  }

  const isMe = finalUserId === user?.id;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div
        onClick={() => navigate("/feed")}
        className="flex w-fit p-2 rounded-full items-center gap-2 mb-4 hover:bg-gray-100 cursor-pointer text-[#36572c]"
      >
        <ArrowLeft size={20} />
      </div>

      <div className="flex items-center justify-center flex-col gap-4 mb-6">
        <img
          src={profile.profile?.profileImageUrl || "/default-avatar.png"}
          className="w-24 h-24 rounded-full object-cover"
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

          {isMe ? (
            <button
              onClick={() => setEditOpen(true)}
              className="mt-2 px-4 py-1 bg-[#36572c] text-white rounded-lg"
            >
              Edit Profile
            </button>
          ) : (
            <button className="mt-2 px-4 py-1 bg-[#36572c] text-white rounded-lg">
              Follow
            </button>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="font-semibold">Bio</h2>
        <p className="text-gray-700">
          {profile.profile.bio || "No bio added."}
        </p>
      </div>

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
