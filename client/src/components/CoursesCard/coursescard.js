"use client";
import React from "react";
// import { useState } from "react";

const coursecard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      <div className="bg-white rounded-lg shadow-lg">
        <img
          src="https://via.placeholder.com/100x100"
          className="w-full h-48 rounded-t-lg object-cover"
        ></img>
        <h2 className="text-xl font-bold mt-4 mx-3">Web Development Course</h2>
        <p className="text-gray-600 font-medium my-2 mx-3">
          This is a brief description of the card content.
        </p>
        <div className="flex flex-row  gap-2 m-2">
        <img
          src="https://via.placeholder.com/10x10"
          className=" h-7 rounded-3xl object-cover"
        ></img>
          <div className="flex justify-center items-center text-black font-normal">username</div>
        </div>
      </div>
    </div>
  );
};

export default coursecard;
