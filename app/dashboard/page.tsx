import React from "react";
import Navbar from "../Navbar";
import Sidebar from "./Sidebar";

export default function Dashboard() {
  return (
    <div className="bg-gradient-to-b from-black via-violet-800 to-violet-600 min-h-screen">
      <Navbar />
      <div className="pt-20 flex flex-row-reverse p-10 gap-4">
        <Sidebar />
        <div className="flex  gap-2">
          <div className="w-[700px]  bg-white rounded-xl">texto</div>
          <div className="w-[700px] bg-white rounded-lg">disenio</div>
        </div>
      </div>
    </div>
  );
}
