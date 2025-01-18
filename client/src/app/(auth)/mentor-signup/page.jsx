"use client";
import React from "react";
import Image from "next/image";

const MentorProfileForm = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Section - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <h2 className="text-xl md:text-4xl font-bold mb-6 text-blue-800">
            Build Mentor Profile
          </h2>
          <form className="space-y-4">
            {/* Upload File Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Upload Profile Picture
              </label>
              <div className="flex items-center">
                {/* Hidden File Input */}
                <input type="file" id="file-upload" className="hidden" />
                {/* Custom Button */}
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer border-2 border-blue-500  text-black font-medium py-2 px-4 rounded-full inline-block"
                >
                  Choose File
                </label>
                {/* Display Selected File Name */}
                <span
                  id="file-name"
                  className="ml-4 text-gray-600 text-sm"
                ></span>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Upload Certificate
              </label>
              <div className="flex items-center">
                {/* Hidden File Input */}
                <input type="file" id="file-upload" className="hidden" />
                {/* Custom Button */}
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer border-2 border-blue-500  text-black font-medium py-2 px-4 rounded-full inline-block"
                >
                  Choose File
                </label>
                {/* Display Selected File Name */}
                <span
                  id="file-name"
                  className="ml-4 text-gray-600 text-sm"
                ></span>
              </div>
            </div>

            {/* Write About Yourself Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Write About Yourself
              </label>
              <textarea
                rows={5}
                placeholder="Tell us about yourself..."
                className="w-full border border-gray-300 rounded-xl p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-medium py-2 rounded-md hover:bg-blue-600 transition"
            >
              Save Profile
            </button>
          </form>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="hidden md:block w-full md:w-1/2">
        <Image
          src="/images/signup.png"
          alt="Signup Image"
          width={700}
          height={1000}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default MentorProfileForm;
