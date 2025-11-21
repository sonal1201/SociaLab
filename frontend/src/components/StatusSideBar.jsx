import React from "react";
import { Highlighter } from "./ui/highlighter";

const StatusSideBar = () => {
  return (
    <div>
      <h2 className="text-xl font-bold text-white">
        <Highlighter action="highlight" color="#36572c" padding={15}>
          Socialogy
        </Highlighter>
      </h2>
    </div>
  );
};

export default StatusSideBar;
