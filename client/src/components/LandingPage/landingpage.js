"use client";
import React from "react";
import { useState } from "react";
import AnimatedHeadline from "../AnimatedHeadline/animatedheadline";
import VcCard from "../VcCard/vccard";

const LandingPage = () => {
  return (
    <>
      <div className="bg-[#a4abb4] text-black h-screen w-full px-12 py-20 flex">
        <div className=" w-[60%]">
          <AnimatedHeadline />
        </div>

        <div className="px-16 flex flex-row -mt-16">
          <div className="absolute translate-x-1/2 translate-y-1/2 ">
            <VcCard />
          </div>
          <div className="relative ">
            <VcCard />
          </div>
        </div>

      </div>
    </>
  );
};

export default LandingPage;
