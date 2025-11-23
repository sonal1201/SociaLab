import axios from "axios";

export const getProfileData = async (userId) => {
  const token = localStorage.getItem("accessToken");

  const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data.user;
};
