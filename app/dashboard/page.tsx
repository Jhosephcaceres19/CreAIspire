import React from "react";
import Navbar from "../Navbar";
import Sidebar from "./Sidebar";
import Text from "./Text";
import Desing from "./Desing";

export default function Dashboard() {
  return (
    <div className="bg-gradient-to-b from-black via-violet-800 to-violet-600 min-h-screen w-full">
      <Navbar />
      <div className="flex justify-center w-full">
        <div className="flex flex-row-reverse gap-1 mt-32 md:mt-40 max-w-screen-lg w-full px-2">
          <Sidebar />
          <div className="flex flex-col gap-2 w-full">
            <div className="bg-white rounded-xl p-4">
              <div className=" flex justify-center ">
              <Text />
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 h-[300px]">
              <div className="flex h-full">
              <Desing/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}