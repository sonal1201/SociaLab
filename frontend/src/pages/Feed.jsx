import { useLogout } from "@/components/Logout";
import ProfileSidebar from "@/components/ProfileSidebar";
import StatusSideBar from "@/components/StatusSideBar";
import { getUserData } from "@/context/userContext";
import { Menu } from "lucide-react";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { Highlighter } from "@/components/ui/highlighter";
import FeedBar from "@/components/feedBar";

const Feed = () => {
  const navigate = useNavigate();
  const { user } = getUserData();
  const logoutHandler = useLogout();

  return (
    <div className="max-w-7xl mx-auto w-full h-screen">
      {/* MOBILE NAVBAR */}

      <div className="md:hidden w-full flex items-center justify-between px-4 py-3 border-b border-gray-300 bg-white sticky top-0 z-50">
        <h2 className="text-xl font-bold text-white">
          <Highlighter action="highlight" color="#36572c" padding={15}>
            Socialogy
          </Highlighter>
        </h2>

        {/* DROPDOWN MENU */}
        <DropdownMenu>
          <DropdownMenuTrigger className="p-2 rounded-md border border-gray-300">
            <Menu size={24} className="text-black" />
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-40">
            <DropdownMenuItem onClick={() => navigate("/profile")}>
              Profile
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={logoutHandler}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-12 w-full h-full">
        <div className="col-span-2 px-2 py-4 hidden md:block">
          <StatusSideBar />
        </div>

        <div className="col-span-12 md:col-span-7 border-x border-gray-300 p-4 h-[calc(107vh-60px)] scrollbar-hide overflow-y-auto ">
          <h1>
            Welcome @
            <span className="font-bold text-green-900">
              {user?.profile?.username}
            </span>
          </h1>
          <FeedBar />
        </div>

        <div className="col-span-3 p-4 hidden md:block">
          <ProfileSidebar />
        </div>
      </div>
    </div>
  );
};

export default Feed;
