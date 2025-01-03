"use client";
import React from "react";
import { useState } from "react";
import Coursecard from "../CoursesCard/coursescard";
import VcCard from "../VcCard/vccard";
import Stats from "../Stats/stats";

const Dashboard = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-5 gap-0 relative">
  {/* Left Column (60%) */}
  <div className="col-span-1 md:col-span-3 grid grid-rows-2 gap-0 relative">
    {/* Left Row 1 */}
    <div className="bg-blue-300 flex flex-start flex-wrap items-center justify-center text-center rounded-br-full text-blue-700 font-bold text-5xl sm:text-4xl md:text-6xl">
      Let's SkillUp!
    </div>

    {/* Left Row 2 - Stats Component */}
    <div className="flex items-center justify-center mt-2">
      <Stats />
    </div>

    {/* Input Field */}
    <input
      type="text"
      placeholder="Enter text"
      className="absolute mx-4 mb-4 top-4 md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 bg-white border border-gray-300 rounded-3xl px-6 py-2 shadow-md w-11/12 sm:w-3/4 lg:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Right Column (40%) */}
  <div className="hidden  relative col-span-2 md:grid grid-rows-2 gap-0">
    {/* Right Row 1 */}
    <div className="flex items-center justify-center"></div>

    {/* Right Row 2 - VcCard Component */}
    <div className="absolute right-1/2 translate-x-1/2 translate-y-1/2">
      <VcCard />
    </div>

    {/* Bottom Row */}
    <div className="bg-blue-200 flex items-center justify-center rounded-tl-full"></div>
  </div>
</div>

  );
};

export default Dashboard;
