import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import logo from "../images/golden-logo-transparent.png";
import PinCard from "./PinCard";
import styles from "./mapStyles";
//map.fitbounds

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
  const mapOptions = {
    styles: styles,
  };

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
    <div style={{ width: "100vw", height: "100vh" }}>
      <div
        className="flex items-center justify-center"
        style={{ width: "100vw", height: "100vh" }}
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
            <Marker position={center} />
          </GoogleMap>
        </div>
      </div>
    </div>
  );
}
export default Map;
