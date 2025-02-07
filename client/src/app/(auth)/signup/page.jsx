"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import Image from "next/image";
import Proficiencies from "@/components/Proficiencies/proficiencies";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// Define Zod schema for the normal signup form
const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required."),
  lastName: z.string().min(1, "Last name is required."),
  username: z.string().min(3, "Username must be at least 3 characters long."),
  email: z.string().email("Invalid email address."),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/,
      "Invalid password."
    )
    .min(6, "Password must be at least 6 characters.")
    .max(20, "Password cannot exceed 20 characters."),
  role: z.enum(["USER", "MENTOR"], "Please select a role."),
});

const mentorProfileSchema = z.object({
  bio: z
    .string()
    .min(10, "Tell us more about yourself (at least 10 characters).")
    .max(500, "Too long! Keep it under 500 characters."),
  profilePicture: z
    .any()
    .refine((file) => file?.[0], "Profile picture is required."),
  certificate: z.any().refine((file) => file?.[0], "Certificate is required."),
});

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [isMentor, setIsMentor] = useState(false); // State to toggle mentor fields
  const [selectedProficiencies, setSelectedProficiencies] = useState([]);
  const router = useRouter();

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const profilePicture = watch("profilePicture");

  const mentorForm = useForm({
    resolver: zodResolver(mentorProfileSchema),
  });

  const onSubmit = async (data) => {
    try {
      const registerObj = {
        firstName: data.firstName,
        lastName: data.lastName,
        userName: data.username,
        email: data.email,
        password: data.password,
        role: data.role,
        proficiencies: selectedProficiencies.map(
          (proficiency) => proficiency.value
        ),
        bio: mentorForm.getValues("bio"),
      };

      const processFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result.split(",")[1]);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      };

      try {
        if (getValues("profilePicture")[0]) {
          registerObj.profileImageBase64 = await processFileToBase64(
            getValues("profilePicture")[0]
          );
        }

        if (getValues("role") === "MENTOR") {
          if (mentorForm.getValues("certificate")[0]) {
            registerObj.certificateBase64 = await processFileToBase64(
              mentorForm.getValues("certificate")[0]
            );
          }
        }
      } catch (error) {
        console.error("Error processing profile picture:", error);
        return;
      }

      console.log("Register object:", registerObj);

      const response = await axios.post(
        "http://localhost:8080/auth/register",
        registerObj
      );
      console.log("Server response:", response.data);
      if (response.data.success) {
        toast.success("Account created successfully!");
        router.push("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleRoleChange = (e) => {
    setIsMentor(e.target.value === "MENTOR");
  };

  const handleProficiencyChange = (selectedOptions) => {
    const values = selectedOptions.map((option) => option.value);
    setSelectedProficiencies(selectedOptions);
    setValue("proficiencies", values); // Update form state for proficiencies
  };

  return (
    <div className="flex flex-col md:flex-row h-full ">
      {/* Left Section - Form */}
      <div className="w-full  md:w-[70%] flex items-center justify-center p-8">
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
                <p className="text-red-500 text-sm">
                  {errors.lastName.message}
                </p>
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
                  value="USER"
                  {...register("role")}
                  className="mr-2"
                  onChange={handleRoleChange}
                />
                Student
              </label>
              <label>
                <input
                  type="radio"
                  value="MENTOR"
                  {...register("role")}
                  className="mr-2"
                  onChange={handleRoleChange}
                />
                Mentor
              </label>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Upload Profile Picture
              </label>
              <input
                type="file"
                accept="image/*"
                {...register("profilePicture")}
                className="text-black w-full p-3 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.profilePicture && (
                <p className="text-red-500 text-sm">
                  {errors.profilePicture.message}
                </p>
              )}
            </div>

            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role.message}</p>
            )}

            {/* Mentor Profile Fields */}
            {isMentor && (
              <>
                <div className="h-full">
                  <label className="block text-gray-700 font-medium mb-2">
                    Write About Yourself
                  </label>
                  <textarea
                    rows={5}
                    {...mentorForm.register("bio")}
                    placeholder="Tell us about yourself..."
                    className="w-full border border-gray-300 rounded-xl p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                  {mentorForm.formState.errors.bio && (
                    <p className="text-red-500 text-sm">
                      {mentorForm.formState.errors.bio.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Upload Certificate
                  </label>
                  <input
                    type="file"
                    {...mentorForm.register("certificate")}
                    className="text-black w-full p-3 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {mentorForm.formState.errors.certificate && (
                    <p className="text-red-500 text-sm">
                      {mentorForm.formState.errors.certificate.message}
                    </p>
                  )}
                </div>

                {/* Proficiencies Multi-Select */}
                <Proficiencies
                  onChange={handleProficiencyChange}
                  selectedProficiencies={selectedProficiencies}
                />
                {errors.proficiencies && (
                  <p className="text-red-500 text-sm">
                    {errors.proficiencies.message}
                  </p>
                )}
              </>
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
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="hidden md:block w-full md:w-[30%] bg-blue-600 p-6 rounded-3xl md:mx-5 lg:mx-20 my-20 shadow-lg">
        <Image
          src="/images/signup.png"
          alt="Signup Image"
          width={700}
          height={1000}
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
    </div>
  );
}
