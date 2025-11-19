import Logout from "@/components/Logout";
import { Button } from "@/components/ui/button";
import { getUserData } from "@/context/userContext";
import axios from "axios";
import React from "react";

const Feed = () => {
  const { user, setUser } = getUserData();
  console.log(user)

  return (
    <div>
      <h1>Welcome @{user?.profile?.fullname}</h1>
      <Logout />
    </div>
  );
};

export default Feed;
