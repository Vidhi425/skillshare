"use client";
import React, { useState } from "react";
import Ratings from "../Ratings/ratings";
import MentorMeta from "../MentorMeta/mentormeta";
import RequestForm from "../Requestform/requestform";

const mentorprofile = ({ username, userImage }) => {
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
      <div className="text-black  rounded-lg  overflow-hidden flex justify-between items-center px-8 " >
        <div className="flex flex-col space-y-2">
          <MentorMeta username={username} />
          <Ratings />
          <button
            onClick={handleSendRequest}
            className="py-2 px-4 bg-blue-400 text-white rounded-xl  hover:bg-blue-300"
          >
            Send Request
          </button>
        </div>

        <div className="flex items-center gap-2 m-3">
          <img
            src={userImage}
            alt="vidhi"
            className="h-[150px] w-[250px] rounded-3xl object-cover"
          />
        </div>
      </div>

      {isPopupOpen && (
        <RequestForm
          onClose={handleClosePopup}
          onSubmit={handleFormSubmit}
        />
      )}
    </>
  );
};

export default mentorprofile;
