import Logout from "@/components/Logout";
import { Button } from "@/components/ui/button";
import { getUserData } from "@/context/userContext";
import axios from "axios";
import React from "react";

const Feed = () => {
  const { user, setUser } = getUserData();
  console.log(user);
  const accessToken = localStorage.getItem("accessToken");

  return (
    <div>
      <h1>Feed Page {user.email}</h1>
      <Logout />
    </div>
  );
};

export default Feed;
