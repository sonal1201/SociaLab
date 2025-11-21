import React from "react";
import { Highlighter } from "./ui/highlighter";
import { getUserData } from "@/context/userContext";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const StatusSideBar = () => {
  const { user } = getUserData();

  const stories = [
    { id: 1, username: "john alex", img: "/default-avatar.png" },
    { id: 2, username: "alex alex", img: "/default-avatar.png" },
    { id: 3, username: "riya alex", img: "/default-avatar.png" },
    { id: 4, username: "sneha alex", img: "/default-avatar.png" },
    { id: 1, username: "john alex", img: "/default-avatar.png" },
    { id: 2, username: "alex alex", img: "/default-avatar.png" },
    { id: 3, username: "riya alex", img: "/default-avatar.png" },
    { id: 4, username: "sneha alex", img: "/default-avatar.png" },
    { id: 1, username: "john alex", img: "/default-avatar.png" },
    { id: 2, username: "alex alex", img: "/default-avatar.png" },
    { id: 3, username: "riya alex", img: "/default-avatar.png" },
    { id: 4, username: "sneha alex", img: "/default-avatar.png" },
  ];

  return (
    <div className="text-black">
      <h2 className="text-xl text-white font-bold mb-6">
        <Highlighter action="highlight" color="#36572c" padding={12}>
          Socialogy
        </Highlighter>
      </h2>
      <div className="mb-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full">
            <div className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-xl cursor-pointer">
              <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-green-900">
                <img
                  src={user?.profile?.profileImageUrl || "/default-avatar.png"}
                  alt="my-story"
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-gray-600 text-left font-bold">My Story</p>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-40">
            <DropdownMenuItem>View Status</DropdownMenuItem>

            <DropdownMenuItem>Add Status</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="w-full border-t border-gray-300 my-2" />

      <div className="space-y-2 overflow-y-auto max-h-[80vh] scrollbar-hide  pr-1">
        {stories.map((story) => (
          <div
            key={story.id}
            className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition rounded-2xl p-1 hover:bg-gray-100"
          >
            <div className="w-11 h-11 rounded-full overflow-hidden border-1 border-gray-300 ">
              <img
                src={story.img}
                alt={story.username}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-gray-600 font-medium">@{story.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusSideBar;
