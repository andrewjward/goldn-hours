import { useEffect, useMemo, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "./App.css";
import Nav from "./components/Nav";
import SignupForm from "./components/SignupForm";
import PinCard from "./components/PinCard";

function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  const center = useMemo(() => ({ lat: 39.5, lng: -98.35 }), []);

  return (
    <div className="">
      <Nav />
      <div
        className="rounded-2xl flex items-center justify-center"
        style={{ width: "100vw", height: "100vh" }}
      >
        {/* <div className="rounded-2xl h-4/5 w-4/5 flex items-center justify-center">
          <GoogleMap
            zoom={5.3}
            center={center}
            mapContainerClassName="map-container"
          >
            <Marker position={center} />
          </GoogleMap>
        </div> */}
        <PinCard />
      </div>
    </div>
  );
}
export default App;
