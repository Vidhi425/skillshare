"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setLocation } from "../../redux/locationSlice";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useSearchParams } from "next/navigation";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const OpenStreetMap = () => {
  const [position, setPosition] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [locationName, setLocationName] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const selectedRequestId = searchParams.get("requestId"); 
  // const [position, setPosition] = useState(null);

  // function LocationMarker() {
  //   const map = useMapEvents({
  //     click(e) {
  //       setPosition(e.latlng.lat, e.latlng.lng);
  //       fetchLocationName(e.latlng.lat, e.latlng.lng); 
  //     },
  //   });
  
  //   return position ? <DraggableMarker position={position} setPosition={setPosition} fetchLocationName={fetchLocationName} /> : null;
  // }
  
  const handleConfirm = () => {
    if (position) {
      const storedRequests = JSON.parse(localStorage.getItem("requestLocations") || "{}");
  
      storedRequests[selectedRequestId] = { 
        lat: position.lat, 
        lng: position.lng, 
        address: locationName 
      };
  
      
      localStorage.setItem("requestLocations", JSON.stringify(storedRequests));
  
      dispatch(setLocation({ [selectedRequestId]: storedRequests[selectedRequestId] }));
  
      router.push("/incoming-request"); 
    }
  };
  
  

  // Fetch human-readable address using OpenStreetMap (Nominatim)
  const fetchLocationName = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      const address = data.display_name || "Unknown Location";
      setLocationName(address);
      console.log("Updated Address:", address);
    } catch (error) {
      console.error("Error fetching location name:", error);
    }
  };

  // Get user's real-time location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLocation = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setPosition(userLocation);
        setMapCenter(userLocation);
        fetchLocationName(userLocation.lat, userLocation.lng); // Fetch initial address
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }, []);

  return (
    <div className="container">
      <h1 className="text-center mt-5 text-black">OpenStreetMap Embedded</h1>
      <div className="row">
        <div className="col">
          {position ? (
            <MapContainer
              center={mapCenter}
              zoom={13}
              style={{ height: "400px", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <DraggableMarker position={position} setPosition={setPosition} fetchLocationName={fetchLocationName} />
            </MapContainer>
          ) : (
            <p>Loading your location...</p>
          )}

        
          <div className="text-center mt-3 border border-black text-black flex-col justify-center align-center ">
            <h3>Location Name:</h3>
            <input
              type="text"
              value={locationName}
              className="form-control w-full text-center "
              readOnly
            />
          </div>
          {position && <p>Selected: {position[0]}, {position[1]}</p>}
          <button onClick={handleConfirm} disabled={!position} className="bg-green-600 text-white rounded-3xl p-2 m-2">Confirm Location</button>
        </div>
      </div>
    </div>
  );
};


const DraggableMarker = ({ position, setPosition, fetchLocationName }) => {
  const eventHandlers = {
    dragend: (e) => {
      const newPos = e.target.getLatLng();
      setPosition(newPos);
      fetchLocationName(newPos.lat, newPos.lng); 
      console.log("Marker Moved To:", newPos);
    },
  };

  return <Marker position={position} icon={customIcon} draggable eventHandlers={eventHandlers} />;
};

export default OpenStreetMap;
