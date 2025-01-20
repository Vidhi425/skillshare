"use client";
import React from "react";

const vccard = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg">
    <img
      src="https://picsum.photos/400/400"
      className="w-full h-48 rounded-t-lg object-cover"
      alt="Placeholder"
    />
    <div className="flex justify-center items-center gap-20 p-4">
      <img src="/icons/call.svg" alt="Call Icon" className="h-8 w-12" />
      <img src="/icons/chats.svg" alt="Chats Icon" className="h-8 w-12" />
    </div>
  </div>
  
  );
};

export default vccard;
