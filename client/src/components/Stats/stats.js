"use client";
import React from "react";

const cardData = [
  {
    title: "<>",
    description: "Get your code reveiw",
  },
  { title: "10K", description: "Another piece of content goes here." },
  { title: "1.5M", description: "Yet another card description." },
  { title: "1.5M", description: "Yet another card description." },

];

const Stats = () => {
  return (
<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mx-2 w-full p-4">
  {cardData.map((card, index) => (
    <div
      key={index}
      className="bg-white rounded-lg shadow-lg p-4 h-36 flex flex-col gap-2"
    >
      <h2 className="text-blue-600 text-5xl  md:text-5xl font-bold">
        {card.title}
      </h2>
      <p className="text-gray-600 text-sm font-medium">
        {card.description}
      </p>
    </div>
  ))}
</div>

  );
};

export default Stats;
