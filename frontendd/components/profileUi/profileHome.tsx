import { TowerControlIcon } from "lucide-react";
import Image from "next/image";

interface ProfileSidebarItem {
  avatar: string;
  username: string;
  bio: string;
  follower: string;
  following: string;
}

const profileSidebarItems: ProfileSidebarItem[] = [
  {
    avatar: "/vercel.svg",
    username: "Sonal1201",
    bio: "Building cool things",
    follower: "100",
    following: "250",
  },
];

export default function ProfileHome() {
  return (
    <>
      <div className="p-3 flex items-center cursor-pointer gap-1 group">
        <div className="text-white h-fit hidden lg:block p-1 group-hover:bg-gray-200 group-hover:text-black transition-all duration-300 ease-in-out rounded-full">
          <TowerControlIcon />
        </div>

        <h2 className="text-white font-bold text-md lg:text-xl">Socialogy</h2>
      </div>

      <div className="mt-5 p-3">
        {profileSidebarItems.map((item) => (
          <div key={item.username}>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex justify-center items-center lg:items-center w-full lg:w-30">
                <div className="rounded-full bg-gray-500 p-5">
                  <Image
                    width={40}
                    height={40}
                    src={item.avatar}
                    alt="avatar"
                  />
                </div>
              </div>

              <div className="text-center lg:text-left w-full">
                <div className="text-white">{item.username}</div>

                <div className="flex justify-evenly lg:justify-start w-full gap-10 mt-4 text-white">
                  <div className="text-center">
                    <h2 className="text-sm text-gray-500">Follower</h2>
                    <h2 className="font-bold">{item.follower}</h2>
                  </div>

                  <div className="text-center">
                    <h2 className="text-sm text-gray-500">Following</h2>
                    <h2 className="font-bold">{item.following}</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-sm mt-4 text-gray-600">
              <h2>Bio:</h2>
              <h2 className="text-white">{item.bio}</h2>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}