import { useEffect, useMemo, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "./App.css";

function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  const center = useMemo(() => ({ lat: 39, lng: -100 }), []);

  return (
    <div style={{width:"100vw", height:"100vh"}}>
      <GoogleMap
        zoom={5}
        center={center}
        mapContainerClassName="map-container"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
}
export default App;
