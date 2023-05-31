import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindowF,
} from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import logo from "../images/golden-logo-transparent.png";
import PinCard from "./PinCard";

//map.fitbounds

import "../App.css";

function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyD0SiphFHbZb8paV9YA3AM_X65d8eAyf-A",
  });

  const [pins, setPins] = useState([]);

  const fetchPins = async () => {
    const pinsUrl = `http://localhost:8000/api/pins`;
    const response = await fetch(pinsUrl);
    if (response.ok) {
      const pinsData = await response.json();
      setPins(pinsData);
    }
  };

  const center = useMemo(() => ({ lat: 39.5, lng: -98.35 }), []);
  console.log(pins);
  useEffect(() => {
    fetchPins();
  }, []);

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
            {pins.map((pin) => {
              return <PinCard pin={pin} />;
            })}
            <Marker position={center} />
          </GoogleMap>
        </div>
      </div>
    </div>
  );
}
export default Map;
