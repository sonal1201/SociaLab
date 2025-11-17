import ProfileHome from "@/components/profileUi/profileHome";
import Image from "next/image";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto w-full h-screen">
      <div className="grid grid-cols-4 w-full h-full">
        <div className="col-span-1">
          <ProfileHome />
        </div>

        <div className="col-span-2 border-l border-r border-slate-600 ">
          hello
        </div>

        <div className="col-span-1">hello</div>
      </div>
    </div>
  );
}
