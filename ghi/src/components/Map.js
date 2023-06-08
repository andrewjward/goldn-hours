import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import logo from "../images/golden-logo-transparent.png";
import PinCard from "./PinCard";
import styles from "./mapStyles";

import "../App.css";

function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
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

  const center = useMemo(() => ({ lat: 39.0742, lng: 21.8243 }), []);

  useEffect(() => {
    fetchPins();
  }, []);

  if (!isLoaded)
    return (
      <div className="w-screen h-screen flex items-center justify-center">
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
    <div>
      <div
        className="flex items-center justify-center"
        style={{ width: "99vw", height: "100vh" }}
      >
        <div className=" h-4/5 w-4/5 flex items-center justify-center">
          <GoogleMap
            zoom={4}
            options={{ styles: styles }}
            center={center}
            mapContainerClassName="map-container"
          >
            {pins.map((pin) => {
              return <PinCard key={pin.id} pin={pin} />;
            })}
<<<<<<< HEAD
            {/* <Marker position={center} /> */}
=======
>>>>>>> 1b063020d07f50bfab6463e7b28423400d11a0b2
          </GoogleMap>
        </div>
      </div>
    </div>
  );
}
export default Map;
