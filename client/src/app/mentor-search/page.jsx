"use client";
import React from "react";
import Leftnav from "../../components/Leftnav/leftnav";
import ProfileNav from "@/components/ProfileNav/profilenav";
import MentorProfile from "../../components/MentorProfile/mentorprofile";

const MentorSearch = () => {
  const users = [
    { userImage: "https://picsum.photos/400/400", username: "John Doe" },
    { userImage: "https://picsum.photos/400/400", username: "Alice Smith" },
    { userImage: "https://picsum.photos/400/400", username: "David Lee" },
    { userImage: "https://picsum.photos/400/400", username: "Emma Brown" },
    { userImage: "https://picsum.photos/400/400", username: "Michael Scott" },
    { userImage: "https://picsum.photos/400/400", username: "Sophia Green" },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Navigation */}
      <div className="hidden md:block md:w-1/5 h-screen">
        <Leftnav />
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-full md:w-4/5 px-16 space-y-4">
        <div  className="flex-col  my-8">
          <div className="text-black font-semibold text-3xl">Find a Mentor</div>
          <div className="text-gray-400 font-thin text-md my-2">
            Find Your Mentor Here
          </div>
          <input type="text" className="my-4 p-2  bg-gray-200 w-full rounded-md" placeholder="Search by name" />
        </div>
        <div className="bg-white overflow-y-auto no-scrollbar my-8 flex-col space-y-6 ">
          {users.map((user) => (
            <div key={user.username}>
              <MentorProfile username={user.username} userImage={user.userImage} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentorSearch;
