import React from "react";

const CommentButton = () => {
  return (
    <div>
      {" "}
      <button className="flex items-center gap-1 hover:text-blue-500 transition">
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
            d="M7.5 8.25h9m-9 3h6m-6 3h3M21 
               12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4.1-.86L3 
               20.25l1.1-3.7A7.94 7.94 0 013 12c0-4.418 
               4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        <span className="text-sm">4</span>
      </button>
    </div>
  );
};

export default CommentButton;
