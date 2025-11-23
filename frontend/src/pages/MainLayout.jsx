import React from "react";
import StatusSideBar from "@/components/StatusSideBar";
import ProfileSidebar from "@/components/ProfileSidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="max-w-7xl mx-auto w-full h-screen grid grid-cols-12">
      <div className="col-span-2 px-2 py-4 border-r border-gray-300 hidden md:block">
        <StatusSideBar />
      </div>

      <div className="col-span-12 md:col-span-7 border-x border-gray-300 p-4 overflow-y-auto scrollbar-hide">
        <Outlet />
      </div>

      <div className="col-span-3 p-4 border-l border-gray-300 hidden md:block">
        <ProfileSidebar />
      </div>
    </div>
  );
};

export default MainLayout;
