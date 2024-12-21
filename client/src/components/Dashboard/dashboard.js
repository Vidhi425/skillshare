"use client";
import React from "react";
import { useState } from "react";


const Dashboard = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const videos = [
      { title: 'Introduction to React', thumbnail: 'https://via.placeholder.com/150' },
      { title: 'Mastering Tailwind CSS', thumbnail: 'https://via.placeholder.com/150' },
      { title: 'Next.js Full Course', thumbnail: 'https://via.placeholder.com/150' },
      { title: 'JavaScript Fundamentals', thumbnail: 'https://via.placeholder.com/150' },
    ];

    
    const filteredVideos = videos.filter(video =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  

    return (
      <div className="flex-1 p-6">
        {/* Top Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <img 
              src="https://via.placeholder.com/50" 
              alt="User Avatar" 
              className="w-12 h-12 rounded-full"
            />
            <h2 className="text-2xl font-semibold">John Doe</h2>
          </div>
        </div>


        {/* Search Bar */}
        <div className="mb-6">
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search videos..."
            className=" text-black w-full p-4 rounded-lg border border-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-200"
          />
        </div>

        {/* Currently Watching Section */}
        <h3 className="text-xl font-semibold mb-4">Currently Watching</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredVideos.map((video, index) => (
            <div key={index} className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <img src={video.thumbnail} alt={video.title} className="w-full h-32 object-cover" />
              <div className="p-4">
                <h4 className="font-semibold text-lg">{video.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

    );
}

export default Dashboard;