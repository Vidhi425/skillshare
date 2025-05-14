"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startTimer, stopTimer, resetTimer } from "../../redux/timerSlice";
import MentorMeta from "../MentorMeta/mentormeta";

const SchedMeetCard = ({ request }) => {
  const mockMeetingId = "mock-meeting-id-1";
  const dispatch = useDispatch();
  const timer = useSelector(
    (state) => state.meetingTimers.timers[mockMeetingId]
  );

  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState("");

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const secsLeft = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${secsLeft
      .toString()
      .padStart(2, "0")}`;
  };

  const handleGoToMeet = () => {
    setShowPasswordInput(true);
  };

  const handleJoinMeeting = () => {
    if (password.trim() === "") {
      alert("Please enter the password.");
      return;
    }

    dispatch(startTimer(request.id));
    // Replace this with actual join meeting logic
    console.log("Joining meeting with password:", password);
  };

  return (
    <div className="min-h-40 border rounded-xl shadow-lg p-4 sm:p-6 flex flex-col gap-4 sm:gap-6">
      {/* Mentor Profile & Status Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
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
      <div className="flex flex-col gap-2">
        <div className="text-black text-sm sm:text-sm">{request.title}</div>

        <div className="text-sm text-gray-600 font-mono">
          ⏱️ Time: {timer ? formatTime(timer.secondsElapsed) : "00:00"}
        </div>

        {!showPasswordInput ? (
          <button
            type="button"
            onClick={handleGoToMeet}
            className="bg-green-500 text-white py-1 px-2 rounded-2xl sm:w-auto hover:bg-green-400"
          >
            Go To Meet
          </button>
        ) : (
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <input
              type="password"
              placeholder="Enter meeting password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border px-3 py-2 text-sm rounded-lg flex-grow min-w-0 text-black focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="button"
              onClick={handleJoinMeeting}
              className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-500 w-full sm:w-auto"
            >
              Join
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchedMeetCard;
