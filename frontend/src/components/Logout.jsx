import { Button } from "@/components/ui/button";
import { getUserData } from "@/context/userContext";
import axios from "axios";
import React from "react";

const Logout = () => {
  const { user, setUser } = getUserData();
  console.log(user);
  const accessToken = localStorage.getItem("accessToken");

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3001/api/v1/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.data.success) {
        setUser(null);
        localStorage.clear();
        toast.success(res.data.message);
      }
    } catch (error) {}
  };
  return (
    <div>
      <Button onClick={logoutHandler}>Logout</Button>
    </div>
  );
};

export default Logout;
