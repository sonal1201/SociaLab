import React from "react";
import { Highlighter } from "@/components/ui/highlighter";
import { useNavigate } from "react-router-dom";
import home1 from "@/assets/home1.png";
import home2 from "@/assets/home2.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col bg-gradient-to-b from-[#6b8c75] to-[#dff6e9] overflow-hidden">
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 relative">
        <img
          src={home1}
          alt="hero"
          className="absolute top-8 w-64 md:w-80 drop-shadow-2xl opacity-95"
        />

        <h1 className="text-4xl md:text-5xl font-bold text-white font-sans mb-4 mt-56">
          <Highlighter action="highlight" color="#36572c" padding={18}>
            SOCIALOGY
          </Highlighter>
        </h1>

        <p className="text-lg md:text-xl text-gray-100 font-sans  max-w-md ">
          A calm, simple social space where your voice actually feels like
          yours.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 bg-[#36572c] text-white font-sans mt-3  rounded-xl text-md hover:bg-[#294321] transition cursor-pointer"
        >
          Start Socialing
        </button>
      </div>

      <div className="bg-white rounded-t-3xl shadow-xl py-10 flex flex-col items-center relative">
        <img
          src={home2}
          alt="creative"
          className="w-64 md:w-80 mb-6 drop-shadow-xl"
        />

        <h2 className="text-2xl text-center font-semibold text-[#36572c] mb-3">
          Ready to Start Socializing?
        </h2>

        <p className="text-gray-600 text-sm text-center mb-6">
          Join the feed and share your moments with the world.
        </p>

      
      </div>
    </div>
  );
};

export default Home;
