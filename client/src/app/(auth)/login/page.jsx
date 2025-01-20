"use client";
import React, { useState, useEffect } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.fullName && formData.email && formData.password) {
      dispatch(login({ fullName: formData.fullName, email: formData.email }));
      setFormData({ fullName: "", email: "", password: "" });
    } else {
      alert("Please fill in all fields!");
    }
  };
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
              Login
            </h2>
            <form className="space-y-4">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="text-black w-full p-3 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
              <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="text-black w-full p-3 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
              <div className="relative">
                <input
                name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                onChange={handleChange}
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
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded-3xl hover:bg-blue-600 transition"
              >
                Login
              </button>
            </form>
            <p className="mt-4 text-center text-gray-600">
              Forgot Password?{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Click Here
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
