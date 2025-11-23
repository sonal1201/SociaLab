import React, { useEffect, useState } from "react";
import axios from "axios";
import { getUserData } from "@/context/userContext";
import { toast } from "sonner";
import { RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SuggestedUsers = () => {
  const { user } = getUserData();
  const navigate = useNavigate();

  const [suggested, setSuggested] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [followingIds, setFollowingIds] = useState([]);
  const [cooldown, setCooldown] = useState(false);

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  useEffect(() => {
    if (!user?.id) return;

    const fetchFollowing = async () => {
      const token = localStorage.getItem("accessToken");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/user/get-following/${user.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const ids = res.data.following.map((f) => f.followingId);
      setFollowingIds(ids);
    };

    fetchFollowing();
  }, [user]);

  const fetchSuggestedUsers = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/user/all-users`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      let users = res.data.users || [];

      users = users
        .filter((u) => u.id !== user.id)
        .filter((u) => !followingIds.includes(u.id));

      setSuggested(shuffleArray(users).slice(0, 7));
    } catch (error) {
      console.log("Suggested Users Error:", error);
    }
  };

  useEffect(() => {
    if (!user?.id || followingIds.length === 0) return;
    fetchSuggestedUsers();
  }, [user, followingIds]);

  const refreshSuggestions = async () => {
    if (cooldown) {
      toast.warning("Please wait before refreshing again");
      return;
    }

    setRefreshing(true);
    setCooldown(true);

    await fetchSuggestedUsers();

    setTimeout(() => setRefreshing(false), 10000);
    setTimeout(() => setCooldown(false), 10000);
  };

  const followUser = async (followId) => {
    try {
      setLoadingId(followId);
      const token = localStorage.getItem("accessToken");

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user/follow/${followId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Followed successfully");

      setSuggested((prev) => prev.filter((u) => u.id !== followId));
    } catch (error) {
      toast.error("Failed to follow");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-md font-semibold text-black">Suggested Users</p>

        <button
          onClick={refreshSuggestions}
          disabled={cooldown}
          className={`p-1 rounded-md cursor-pointer transition 
            ${cooldown ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-200"}`}
        >
          <RefreshCw
            size={16}
            className={
              refreshing ? "animate-spin text-[#36572c]" : "text-[#36572c]"
            }
          />
        </button>
      </div>

      {suggested.length === 0 ? (
        <p className="text-sm text-gray-500">No new suggestions</p>
      ) : (
        <div className="space-y-3">
          {suggested.map((u) => (
            <div
              key={u.id}
              className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg"
            >
              <div
                className="flex items-center gap-3 flex-1 cursor-pointer"
                onClick={() => navigate(`/profile/${u.id}`)}
              >
                <img
                  src={u.profile?.profileImageUrl || "/default-avatar.png"}
                  className="w-10 h-10 rounded-full object-cover"
                />

                <div>
                  <p className="font-medium text-black">
                    @{u.profile?.username}
                  </p>
                  <p className="text-xs text-gray-500">{u.profile?.fullname}</p>
                </div>
              </div>

              <button
                className="bg-[#36572c] text-white text-xs cursor-pointer px-3 py-1 rounded-md disabled:opacity-50"
                disabled={loadingId === u.id}
                onClick={() => followUser(u.id)}
              >
                {loadingId === u.id ? "Following..." : "Follow"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SuggestedUsers;
