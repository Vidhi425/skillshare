"use client";
// import GoogleMaps from "../../components/GoogleMaps/googlemaps";
// import { GoogleMap } from "@react-google-maps/api";

// import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
const GoogleMaps= dynamic(() => import('../../components/GoogleMaps/googlemaps'), {
  ssr: false,
})

const home = () => {
 

  return (
   <>
   <h1 className='text-center'>OpenStreetMap</h1>
   <GoogleMaps/>
   </>
    
  );
};

export default home;
