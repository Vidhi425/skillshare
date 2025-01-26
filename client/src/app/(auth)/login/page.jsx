"use client";
import React, { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "../../../redux/authSlice";
import axios from "axios";

const loginSchema = z.object({
  fullName: z.string().min(2, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export default function Login() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const  onSubmit =async (data) => {
    dispatch(login({ fullName: data.fullName, email: data.email }));
    alert("Login successful!");


    try {
      const fakeApiEndpoint = "https://jsonplaceholder.typicode.com/posts";
  
      const response = await axios.post(fakeApiEndpoint, {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      });
  
      console.log("Form data sent to backend:", {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      });
  
      console.log("API Response:", response.data);
  
      alert("Login successful! Data sent to backend.");
    } catch (error) {
      console.error("Error sending data to the backend:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row h-screen">
        {/* Left Section - Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <h2 className="text-2xl md:text-5xl font-bold mb-6 text-blue-800">
              Login
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              {/* Full Name */}
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  {...register("fullName")}
                  className={`text-black w-full p-3 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.fullName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                  className={`text-black w-full p-3 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password")}
                  className={`text-black w-full p-3 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-6 top-[50%] -translate-y-1/2"
                  onClick={toggleVisibility}
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
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
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
