import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import logo from "../images/golden-logo-transparent.png";

import "../App.css";

function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  const center = useMemo(() => ({ lat: 39.5, lng: -98.35 }), []);

  if (!isLoaded)
    return (
      <div
        className="flex items-center justify-center"
        style={{ width: "100vw", height: "100vh" }}
      >
        <motion.img
          src={logo}
          alt="Golden Logo"
          style={{ width: "30%" }}
          animate={{ x: 100 }}
          transition={{ delay: 1 }}
        ></motion.img>
      </div>
    );
  return (
    <div className="">
      <div
        className="rounded-2xl flex items-center justify-center"
        style={{ width: "100vw", height: "100vh" }}
      >
        <div className="rounded-2xl h-4/5 w-4/5 flex items-center justify-center">
          <GoogleMap
            zoom={5.3}
            center={center}
            mapContainerClassName="map-container"
          >
            <Marker position={center} />
          </GoogleMap>
        </div>
      </div>
    </div>
  );
}