import axios from "axios";

export const getProfileData = async (userId) => {
  const token = localStorage.getItem("accessToken");

  const res = await axios.get(`http://localhost:3001/api/v1/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data.user;
};
