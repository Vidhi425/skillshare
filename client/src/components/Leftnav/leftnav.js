"use client";
import React, { useState } from "react";
import ProfileNav from "../ProfileNav/profilenav";

const leftnav = () => {
  const navData = [
    "Find a Mentor",
    "Pending Requests",
    "Scheduled Meet",
    "All Request",
    "Ai Help",
    "Posts",
    "Trending News",
    "Create Course",
  ];
  return (
    <>
      <nav className="text-black  h-screen flex-col gap-10 px-6">
        <div className="flex justify-center items-center mt-8">
          <ProfileNav />
        </div>
        <div className="flex justify-center" >
        <ul className="mt-4 space-y-2">

{navData.map((items, index) => (
  <li
    key={index}
    className="font-medium text-base mx-4 px-4 hover:bg-blue-200 hover:text-blue-500 py-2 rounded-lg cursor-pointer"
  >
    {items}
  </li>
))}
</ul>
        </div>

       
      </nav>
    </>
  );
};

export default leftnav;
