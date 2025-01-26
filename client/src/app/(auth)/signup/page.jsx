"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import Image from "next/image";


const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required."),
  lastName: z.string().min(1, "Last name is required."),
  username: z.string().min(3, "Username must be at least 3 characters long."),
  email: z.string().email("Invalid email address."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(20, "Password cannot exceed 20 characters."),
  role: z.enum(["Student", "Mentor"], "Please select a role."),
});

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/api/signup", data);
      console.log("Server response:", response.data);
      alert("Signup successful!");
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Section - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl md:text-5xl font-bold mb-6 text-blue-800">
            Sign Up
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row gap-2">
              {/* First Name */}
              <input
                type="text"
                placeholder="First Name"
                {...register("firstName")}
                className="text-black w-1/2 p-3 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message}
                </p>
              )}
              {/* Last Name */}
              <input
                type="text"
                placeholder="Last Name"
                {...register("lastName")}
                className="text-black w-1/2 p-3 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">{errors.lastName.message}</p>
              )}
            </div>

            {/* Username */}
            <input
              type="text"
              placeholder="Username"
              {...register("username")}
              className="text-black w-full p-3 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="text-black w-full p-3 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password")}
                className="text-black w-full p-3 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            {/* Role Selection */}
            <label className="block text-base font-medium text-black">
              Select Your Role
            </label>
            <div className="flex gap-4 text-black">
              <label>
                <input
                  type="radio"
                  value="Student"
                  {...register("role")}
                  className="mr-2"
                />
                Student
              </label>
              <label>
                <input
                  type="radio"
                  value="Mentor"
                  {...register("role")}
                  className="mr-2"
                />
                Mentor
              </label>
            </div>
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role.message}</p>
            )}

            {/* Submit Button */}
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
  );
}
