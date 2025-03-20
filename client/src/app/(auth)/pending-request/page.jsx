"use client";
import RequestCard from "@/components/RequestCard/requestcard";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const home = () => {
  const [requests, setRequests] = useState([]);

// userId of logged in user
  const userId = useSelector((state)=>state.auth.user.userId);

  useEffect(() => {
    if (!userId) return;
    const fetchData = async ()=>{
      try{
        const response = await axios.get(`http://localhost:8080/user/all-appointments/${userId}`);
        console.log(response)
        setRequests(response.data.appointments)
      }catch(error){
        console.log(error);
      }
    }

    fetchData();
  }, [userId]);

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
        {
         requests.length>0 ? (
          requests.map((request) => (
            <RequestCard request={request} key={request.appointmentId} />
          ))
         ):(
          <p className="text-gray-500">NO Requests</p>
         )
        }
        
      </div>
    </div>
  );
};

export default home;
