import { Button } from "@/components/ui/button";
import { getUserData } from "@/context/userContext";
import axios from "axios";
import { toast } from "sonner";
import React from "react";

export const useLogout = () => {
  const { setUser } = getUserData();
  const accessToken = localStorage.getItem("accessToken");

  const logoutHandler = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/user/logout`,
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
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return logoutHandler;
};

