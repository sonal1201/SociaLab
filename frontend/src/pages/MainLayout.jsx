import React from "react";
import StatusSideBar from "@/components/StatusSideBar";
import ProfileSidebar from "@/components/ProfileSidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Highlighter } from "@/components/ui/highlighter";
import { useLogout } from "@/components/Logout";
import { getUserData } from "@/context/userContext";

const MainLayout = () => {
  const navigate = useNavigate();
  const logout = useLogout();
  const { user } = getUserData();

  return (
    <div className="max-w-7xl mx-auto w-full h-screen flex flex-col">
      <div
        className="md:hidden w-full flex items-center justify-between px-4 py-3 
        border-b border-gray-300 bg-white sticky top-0 z-50"
      >
        <h2 className="text-xl font-bold text-white">
          <Highlighter action="highlight" color="#36572c" padding={15}>
            Socialogy
          </Highlighter>
        </h2>

        <DropdownMenu>
          <DropdownMenuTrigger className="p-2 rounded-md border border-gray-300">
            <Menu size={24} className="text-black" />
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-40">
            <DropdownMenuItem onClick={() => navigate(`/profile/${user.id}`)}>
              View Profile
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-12 flex-1 w-full h-full">
        <div className="col-span-2 px-2 py-4 border-r border-gray-300 hidden md:block">
          <StatusSideBar />
        </div>

        <div
          className="col-span-12 md:col-span-7 border-x border-gray-300 p-4 
          overflow-y-auto scrollbar-hide"
        >
          <Outlet />
        </div>

        <div className="col-span-3 p-4 border-l border-gray-300 hidden md:block">
          <ProfileSidebar />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
