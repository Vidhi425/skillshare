"use client";
import React, { useState } from "react";
import Ratings from "../Ratings/ratings";
import MentorMeta from "../MentorMeta/mentormeta";
import RequestForm from "../Requestform/requestform";

const mentorprofile = ({ username, userImage, userId }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleSendRequest = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleFormSubmit = (formData) => {
    console.log("Form Data Submitted:", formData);
  };
  return (
    <>
      <div className="text-black  rounded-3xl  overflow-hidden flex justify-between items-center px-10 mx-1  shadow-md">
        <div className="flex flex-col space-y-2">
          <MentorMeta username={username} />
          <Ratings />
          <button
            onClick={handleSendRequest}
            className=" p-2 text-sm bg-blue-400 text-white rounded-xl  hover:bg-blue-300"
          >
            Send Request
          </button>
        </div>

        <div className="flex items-center gap-2 m-3">
          <img
            src={userImage}
            alt="vidhi"
            className="h-[150px] w-[150px] rounded-full object-cover"
          />
        </div>
      </div>

      {isPopupOpen && (
        <RequestForm
          mentorId={mentorId}
          onClose={handleClosePopup}
          onSubmit={handleFormSubmit}
        />
      )}
    </>
  );
};

export default mentorprofile;
