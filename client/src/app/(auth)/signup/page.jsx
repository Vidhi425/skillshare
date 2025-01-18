"use client";
import React, { useState, useEffect } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import Image from "next/image";

export default function signup() {
  const [showPassword, setShowPassword] = useState(false);
  const togglevisiblity = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <div className="flex flex-col md:flex-row h-screen">
        {/* Left Section - Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <h2 className="text-2xl md:text-5xl font-bold mb-6  text-blue-800">
              Sign Up
            </h2>
            <form className="space-y-4">
              <div className="flex flex-row gap-2">
                <input
                  type="text"
                  placeholder="First Name"
                  className=" text-black w-1/2 p-3 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className=" text-black w-1/2 p-3 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <input
                type="text"
                placeholder="Username"
                className=" text-black w-full p-3 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email"
                className=" text-black w-full p-3 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className=" text-black w-full p-3 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-6 top-[50%] -translate-y-1/2"
                  onClick={togglevisiblity}
                >
                  {showPassword ? (
                    <FaRegEye
                      height={20}
                      width={20}
                      style={{ color: "#1A3EAD", width: "20px" }}
                    />
                  ) : (
                    <FaRegEyeSlash
                      height={20}
                      width={20}
                      style={{ color: "#1A3EAD", width: "20px" }}
                    />
                  )}
                </button>
              </div>
              <label className="block text-base font-medium text-black">
                Select Your Role
              </label>
              <div className="flex gap-4">
                <button className="px-4 py-1 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-400 hover:text-white transition">
                  Student
                </button>
                <button className="px-4 py-1 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-400 hover:text-white transition">
                  Mentor
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded-3xl hover:bg-blue-600 transition"
              >
                Signup
              </button>
            </form>
            <p className="mt-4 text-center text-gray-600">
              Don't have an account yet?{" "}
              <a href="/login" className="text-blue-500 hover:underline">
                Login
              </a>
            </p>
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
    </>
  );
}
