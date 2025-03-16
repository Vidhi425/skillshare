"use client";
import React from "react";
import MentorMeta from "../MentorMeta/mentormeta";

const RequestCard = ({request}) => {
  return (
    <div className="min-h-40 border rounded-xl shadow-lg p-4 sm:p-6 flex flex-col gap-4 sm:gap-6 ">
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

        {/* Pending Status */}
        <div className={`rounded-full px-3 py-1 text-xs sm:text-sm text-center ${
          request.status==="Pending"
          ? "bg-gray-200 text-black"
          : request.status === "Accepted"
          ? "bg-green-200 text-green-800"
          : "bg-red-200 text-red-800"
          }`}>
          {request.status}
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-col gap-2">
        <div className="text-black text-sm sm:text-md font-semibold">
          {request.title}
        </div>
        <p className="text-xs sm:text-sm text-black">
        {request.description}
        </p>
      </div>

      {/* Cancel Button */}
      <button className="bg-red-500 text-white py-2 rounded-3xl w-full sm:w-auto">
        Cancel Request
      </button>
    </div>
  );
};

export default RequestCard;
