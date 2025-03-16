"use client";
import React, { useState } from "react";
import users from "../../../public/data/mentor";

const ProfileNav = () => {
  return (
    <>
      <div className="flex items-center gap-2">
        <img
          src={users[0].userImage}
          alt="courseusername"
          className="h-14 w-14 rounded-full object-cover"
        />
        <div className="flex flex-col ">
          <div className="text-black text-xs sm:text-lg">
            {users[0].username}
          </div>
          <div className="text-slate-500 text-xs sm:text-base ">
            {users[0].profession}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileNav;
