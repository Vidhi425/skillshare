"use client";
import React, { useState, useEffect } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import Image from "next/image";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";

export default function Login() {
  //   const router = useRouter();
  //   const [formData, setFormData] = useState({ email: "", password: "" });
  //   const [isFormValid, setIsFormValid] = useState(false);

  //   useEffect(() => {
  //     validateForm();
  //   }, [formData]);

  //   const validateForm = () => {
  //     const isEmailValid = /\S+@\S+\.\S+/.test(formData.email);
  //     const isPasswordValid =
  //       formData.password.length >= 6 && formData.password.length <= 20;

  //     setIsFormValid(isEmailValid && isPasswordValid);
  //   };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();

  //     validateForm();

  //     if (!isFormValid) {
  //       if (!formData.email) {
  //         toast.error("Email is required");
  //         return;
  //       } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
  //         toast.error("Invalid email");
  //         return;
  //       }
  //       if (!formData.password) {
  //         toast.error("Password is required");
  //         return;
  //       } else if (formData.password.length < 6) {
  //         toast.error("Password must be at least 6 characters");
  //         return;
  //       } else if (formData.password.length > 20) {
  //         toast.error("Password cannot be more than 20 characters");
  //         return;
  //       }
  //       return;
  //     }

  //   };


  //   const handleBackButtonClick = () => {
  //     router.back();
  //   };
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
          <h2 className="text-2xl md:text-5xl font-bold mb-6  text-blue-800">Login</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
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
