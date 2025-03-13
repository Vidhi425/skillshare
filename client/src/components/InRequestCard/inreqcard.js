"use client";
import React, { useState, useEffect } from "react";
import MentorMeta from "../MentorMeta/mentormeta";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";

const InReqCard = ({ request }) => {
  const [meetlink, setMeetLink] = useState(false);
  const [buttonText, setButtonText] = useState("Accept");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form submitted with:", data);
  };

  const [formData, setFormData] = useState({ meetLink: "", location: "" });

  useEffect(() => {
    const storedRequests = JSON.parse(
      localStorage.getItem("requestLocations") || "{}"
    );

    if (storedRequests[request.id]) {
      setFormData((prev) => ({
        ...prev,
        location: storedRequests[request.id].address,
      }));
    }
  }, []);

  const handleNavigateToMap = () => {
    localStorage.setItem("formData", JSON.stringify(formData));
    router.push(`/get-location/?requestId=${request.id}`);
  };

  const acceptReq = async () => {
    if (!meetlink) {
      setMeetLink(true);
      setButtonText("Confirming");
    }

    try {
      const response = await axios.post(
        "https://your-backend.com/api/confirm-request",
        {
          requestId: request.id,
          meetLink: formData.meetLink,
          location: formData.location,
        }
      );
    } catch (error) {
      console.error("API Error:", error);
      alert("Failed to confirm request.");
      setButtonText("Accept");
    }
  };

  return (
    <div className="min-h-40 border rounded-xl shadow-lg p-4 sm:p-6 flex flex-col gap-4 sm:gap-6">
      {/* Mentor Profile & Status Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        {/* Mentor Profile */}
        <div className="flex gap-2 items-center">
          <img
            src={request.mentorImage}
            alt={request.mentorName}
            className="h-12 w-12 sm:h-14 sm:w-14 rounded-full object-cover"
          />
          <MentorMeta />
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-col gap-2">
        <div className="text-black text-sm sm:text-md font-semibold">
          {request.title}
        </div>
        <p className="text-xs sm:text-sm text-black">{request.description}</p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-col gap-2 space-y-4"
      >
        {meetlink && (
          <div className="flex flex-col gap-2">
            <input
              {...register("meetLink", { required: "Meet link is required" })}
              placeholder="Provide meet link"
              className="text-black p-2 rounded-lg border border-gray-500"
              onChange={(e) =>
                setFormData({ ...formData, meetLink: e.target.value })
              }
            />
            {errors.meetLink && (
              <p className="text-red-500">{errors.meetLink.message}</p>
            )}
            <input
              {...register("location")}
              type="text"
              value={formData.location || ""}
              readOnly
              placeholder="Selected Location"
              className="text-black p-2 rounded-lg border border-gray-500"
            />
            <button
              type="button"
              className="bg-green-500 text-white py-2 px-4 rounded-3xl sm:w-auto hover:bg-green-400"
              onClick={handleNavigateToMap}
            >
              Select location
            </button>
          </div>
        )}

        {/* Accept/Reject Buttons */}
        <div className="flex flex-row justify-between">
          <button
            type="button"
            className="bg-green-500 text-white py-2 px-4 rounded-3xl sm:w-auto hover:bg-green-400"
            onClick={acceptReq}
          >
            {buttonText}
          </button>
          <button
            type="button"
            className="bg-red-500 text-white py-2 px-4 rounded-3xl sm:w-auto hover:bg-red-400"
          >
            Reject
          </button>
        </div>
      </form>
    </div>
  );
};

export default InReqCard;
