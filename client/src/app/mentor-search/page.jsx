"use client";
import React, { useState } from "react";
import Leftnav from "../../components/Leftnav/leftnav";
import MentorProfile from "../../components/MentorProfile/mentorprofile";
import MentorDetails from "../../components/MentorDetails/mentordetails";
import users from "../../../public/data/mentor";

const MentorSearch = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);

  const handleShowProfile = (mentor) => {
    setSelectedMentor(mentor);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedMentor(null);
  };

  return (
    <div className="flex h-screen overflow-hidden ">
      {/* Main Content */}
      <div className="flex flex-col w-full  px-16 ">
        <div className="flex-col mt-6">
          <div className="text-black font-semibold text-3xl">Find a Mentor</div>
          <div className="text-gray-400 font-thin text-md my-2">
            Find Your Mentor Here
          </div>
          <input
            type="text"
            className="my-4 p-2 bg-gray-200 w-full rounded-md"
            placeholder="Search by name"
          />
        </div>
        <div className="bg-white overflow-y-auto no-scrollbar my-6 flex-col space-y-6 ">
          {users.map((user) => (
            <div key={user.username}>
              <MentorProfile
                userId = {user.id}
                username={user.username}
                userImage={user.userImage}
                onClick={() => handleShowProfile(user)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Popup for Mentor Details */}
      {isPopupOpen && selectedMentor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={handleClosePopup}
            >
              ✖
            </button>
            <MentorDetails
              username={selectedMentor.username}
              userImage={selectedMentor.userImage}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorSearch;
