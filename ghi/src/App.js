import { useEffect, useMemo, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "./App.css";

function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  const center = useMemo(() => ({ lat: 44, lng: -80}), []);

  return (
      <GoogleMap
        zoom={10}
        ceneter={center}
        mapContainerClassName="map-container"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Marker position={center} />
      </GoogleMap>
  );
}
export default App;
