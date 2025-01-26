"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

// Define Zod schema
const mentorProfileSchema = z.object({
  about: z
  .string()
  .min(10, "Tell us more about yourself (at least 10 characters).")
  .max(500, "Too long! Keep it under 500 characters."),
profilePicture: z
  .any()
  .refine((file) => file?.[0], "Profile picture is required."),
certificate: z
  .any()
  .refine((file) => file?.[0], "Certificate is required."),
});

const MentorProfileForm = () => {
  const [profilePictureName, setProfilePictureName] = useState("");
  const [certificateName, setCertificateName] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(mentorProfileSchema),
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("about", data.about);
    formData.append("profilePicture", data.profilePicture[0]);
    formData.append("certificate", data.certificate[0]);

    try {
      const response = await axios.post("https://jsonplaceholder.typicode.com/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Form data sent to backend:", {
        about: data.about,
        profilePicture: data.profilePicture[0],
        certificate: data.certificate[0],
      });

      console.log("Fake API Response:", response.data);
      alert("Profile saved successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Section - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <h2 className="text-xl md:text-4xl font-bold mb-6 text-blue-800">
            Build Mentor Profile
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Upload Profile Picture */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Upload Profile Picture
              </label>
              <div className="flex items-center">
                <input
                  type="file"
                  id="profilePicture"
                  {...register("profilePicture")}
                  className="hidden"
                  onChange={(e) =>
                    setProfilePictureName(e.target.files[0]?.name || "")
                  }
                />
                <label
                  htmlFor="profilePicture"
                  className="cursor-pointer border-2 border-blue-500 text-black font-medium py-2 px-4 rounded-full inline-block"
                >
                  Choose File
                </label>
                <span className="ml-4 text-gray-600 text-sm">
                  {profilePictureName || "No file chosen"}
                </span>
              </div>
              {errors.profilePicture && (
                <p className="text-red-500 text-sm">
                  {errors.profilePicture.message}
                </p>
              )}
            </div>

            {/* Upload Certificate */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Upload Certificate
              </label>
              <div className="flex items-center">
                <input
                  type="file"
                  id="certificate"
                  {...register("certificate")}
                  className="hidden"
                  onChange={(e) =>
                    setCertificateName(e.target.files[0]?.name || "")
                  }
                />
                <label
                  htmlFor="certificate"
                  className="cursor-pointer border-2 border-blue-500 text-black font-medium py-2 px-4 rounded-full inline-block"
                >
                  Choose File
                </label>
                <span className="ml-4 text-gray-600 text-sm">
                  {certificateName || "No file chosen"}
                </span>
              </div>
              {errors.certificate && (
                <p className="text-red-500 text-sm">{errors.certificate.message}</p>
              )}
            </div>

            {/* Write About Yourself */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Write About Yourself
              </label>
              <textarea
                rows={5}
                {...register("about")}
                placeholder="Tell us about yourself..."
                className="w-full border border-gray-300 rounded-xl p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              {errors.about && (
                <p className="text-red-500 text-sm">{errors.about.message}</p>
              )}
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
