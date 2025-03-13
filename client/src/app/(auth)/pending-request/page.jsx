"use client";
import RequestCard from "@/components/RequestCard/requestcard";
import React, { useEffect, useState } from "react";

const home = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch("/data/dummyRequest.json")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("Received Data:", data);
        setRequests(data);
      })
      .catch((err) => console.error("Error loading requests:", err));
  }, []);

  return (
    <div className=" flex flex-col w-full  px-16 h-full ">
      <div className="flex-col my-6">
        <div className="text-black font-semibold text-3xl">
          Mentorship Request
        </div>
        <div className="text-gray-400 font-thin text-md my-2">
          Check you requests
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {requests.map((request) => (
          <RequestCard request={request} key={request.id} />
        ))}
      </div>
    </div>
  );
};

export default home;
