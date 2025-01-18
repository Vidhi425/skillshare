"use client";
import React, { useState } from "react";
import Leftnav from "../../components/Leftnav/leftnav"
import Mycourses from "../../components/MyCourses/mycourses";
import ProfileNav from "@/components/ProfileNav/profilenav";

const home =()=>{

    return(
        <>
        <div className="flex h-screen overflow-hidden">
          {/* Left Navigation */}
          <div className="hidden md:block md:w-1/5 bg-gray-50 h-screen">
            <Leftnav />
          </div>
      
          {/* Main Content (MyCourses) */}
          <div className="flex flex-col w-full md:w-4/5">
            <ProfileNav/>
          <div className=" bg-white overflow-y-auto h-screen px-4">
            <Mycourses />
          </div>
          </div>
         
        </div>
      </>
      
      
    )
}

export default home