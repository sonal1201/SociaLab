import React from "react";

const LikeButton = () => {
  return (
    <div>
      <button className="flex items-center gap-1 hover:text-red-500 transition">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.622 
               1.147-4.312 2.813C11.31 4.897 9.623 3.75 7.688 
               3.75 5.099 3.75 3 5.765 3 8.25c0 7.22 9 12 9 
               12s9-4.78 9-12z"
          />
        </svg>
        <span className="text-sm">23</span>
      </button>
    </div>
  );
};

export default LikeButton;
