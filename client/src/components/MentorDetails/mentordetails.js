import React from "react";
import MentorMeta from "../MentorMeta/mentormeta";

const MentorDetails = ({username}) => {
  return <>
  <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-transparent bg-opacity-50 backdrop-blur-sm  text-black">
      <div className="bg-slate-100 p-6 rounded-lg w-1/3">
    
        <MentorMeta username={username} />
      
      </div>
    </div>
  </>;
};

export default MentorDetails;
