"use client";
import React from "react";

const CourseCard = () => {
  const courses = [
    {
      id: 1,
      title: "Web Development Course",
      description: "Learn how to build dynamic websites and applications.",
      image: "https://via.placeholder.com/300x200",
      userImage: "https://via.placeholder.com/40x40",
      username: "John Doe",
    },
    {
      id: 2,
      title: "Data Science Bootcamp",
      description: "Master data analysis and machine learning.",
      image: "https://via.placeholder.com/300x200",
      userImage: "https://via.placeholder.com/40x40",
      username: "Alice Smith",
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      description: "Design intuitive and user-friendly interfaces.",
      image: "https://via.placeholder.com/300x200",
      userImage: "https://via.placeholder.com/40x40",
      username: "David Lee",
    },
    {
      id: 4,
      title: "Mobile App Development",
      description: "Build powerful mobile applications.",
      image: "https://via.placeholder.com/300x200",
      userImage: "https://via.placeholder.com/40x40",
      username: "Emma Brown",
    },
    {
      id: 5,
      title: "Cloud Computing Essentials",
      description: "Understand the fundamentals of cloud services.",
      image: "https://via.placeholder.com/300x200",
      userImage: "https://via.placeholder.com/40x40",
      username: "Michael Scott",
    },
    {
      id: 6,
      title: "Cybersecurity Basics",
      description: "Learn to secure systems and networks.",
      image: "https://via.placeholder.com/300x200",
      userImage: "https://via.placeholder.com/40x40",
      username: "Sophia Green",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {courses.map((course) => (
        <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-48 object-cover"
          />
          <div>
          <h2 className="text-xl text-black font-bold mt-4 mx-3">{course.title}</h2>
          <p className="text-gray-600 font-medium my-2 mx-3">
            {course.description}
          </p>
          </div>
                   
          <div className="flex items-center gap-2 m-3">
            <img
              src={course.userImage}
              alt={course.username}
              className="h-8 w-8 rounded-full object-cover"
            />
            <div className="text-black font-normal">{course.username}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseCard;
