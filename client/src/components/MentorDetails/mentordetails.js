import React from "react";
import MentorMeta from "../MentorMeta/mentormeta";
import ProfileNav from "../ProfileNav/profilenav";
import users from "../../../public/data/mentor";
import Proficiencies from "../Proficiencies/proficiencies";

const MentorDetails = ({ username }) => {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-transparent bg-opacity-50 backdrop-blur-sm  text-black">
        <div className="bg-white p-10 rounded-lg w-1/3">
          <ProfileNav />
          <p className="text-gray-500 text-base my-6">{users[0].bio}</p>

          <div className="my-4">
            <div className="text-black text-xl font-medium ">Proficiencies</div>

            <Proficiencies />
          </div>
        </div>
      </div>
    </>
  );
};

export default MentorDetails;
