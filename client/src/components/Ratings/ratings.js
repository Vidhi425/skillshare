"use client";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = () => {
  const [rating, setRating] = useState(0); // Keeps track of selected rating
  const [hover, setHover] = useState(0);  // Keeps track of hovered stars

  return (
    <div className="flex space-x-0 ">
      {Array(5)
        .fill(0) 
        .map((_, index) => {
          const starIndex = index + 1;
          return (
            <FaStar
              key={starIndex}
              className={`h-4 w-6 cursor-pointer transition-colors duration-200 
                ${starIndex <= (hover || rating) ? "fill-yellow-400" : "fill-gray-200"}`}
              onClick={() => setRating(starIndex)} 
              onMouseEnter={() => setHover(starIndex)} 
              onMouseLeave={() => setHover(0)} 
            />
          );
        })}
    </div>
  );
};

export default StarRating;
