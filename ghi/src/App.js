import { useEffect, useMemo, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "./App.css";
import Nav from "./components/Nav";
import SignupForm from "./components/SignupForm";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <BrowserRouter>
      <Nav />
      <div>
        <Route path="/" element={<Main />} />

        <Route path="/signup" element={<SignupForm />} />

        <Route path="Login" >
          <Route path="" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Route>

        <Route path="/pins" >
          <Route path="/create" element={<CreatePin />} />
          <Route path="/pins/location/:id" element={<Location />} />
          <Route path="pins/profile/:id" element={<Profile />} />
        </Route>
      </div>
      {/* <Map />
      <SignupForm /> */}
    </BrowserRouter>
  );
}

function Map() {
  const center = useMemo(() => ({ lat: 39.5, lng: -98.35 }), []);

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
export default App;
