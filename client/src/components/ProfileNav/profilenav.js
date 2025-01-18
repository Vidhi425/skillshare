"use client";
import React, { useState } from "react";

const ProfileNav = () => {
  return (
    <>
    
      <div className="flex items-center gap-2 m-3 ">
        <img
          src="https://picsum.photos/40/40"
          alt="courseusername"
          className="h-14 w-14 rounded-full object-cover"
        />
        <div className="flex flex-col ">
          <div className="text-black text-xs sm:text-lg">Vidhi</div>
          <div className="text-slate-500 text-xs sm:text-base ">Web Developer</div>
        </div>
      </div>
    
     
    </>
  );
};

export default ProfileNav;
