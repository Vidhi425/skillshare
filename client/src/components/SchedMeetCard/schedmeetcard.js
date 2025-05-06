"use client";
import React, { useState, useEffect } from "react";
import MentorMeta from "../MentorMeta/mentormeta";


const SchedMeetCard = ({request}) => {
  return (
    <div className="min-h-40 border rounded-xl shadow-lg p-4 sm:p-6 flex flex-col gap-4 sm:gap-6">
      {/* Mentor Profile & Status Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        {/* Mentor Profile */}
        <div className="flex gap-2 items-center">
          <img
            src={request.mentorImage}
            alt={request.mentorName}
            className="h-12 w-12 sm:h-14 sm:w-14 rounded-full object-cover"
          />
          <MentorMeta />
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-col gap-2 ">
        <div className="text-black text-sm sm:text-sm">
         {request.title}
        </div>

        <button
            type="button"
            className="bg-green-500 text-white py-1 px-2 rounded-2xl sm:w-auto hover:bg-green-400"
          >
           Go To Meet
          </button>
      
      </div>
    </div>
  );
};

export default SchedMeetCard;
