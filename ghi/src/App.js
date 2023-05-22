import { useEffect, useMemo, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "./App.css";
import Nav from "./components/Nav";
import SignupForm from "./components/SignupForm";
import Profile from "./components/Profile";
import { BrowserRouter, Route } from "react-router-dom";
import { motion } from "framer-motion";
import logo from './images/golden-logo-transparent.png'


function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return (
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
    <BrowserRouter>
      <Nav />
      <div>
        {/* <Route path="/" element={<Main />} />

        <Route path="/signup" element={<SignupForm />} />

        <Route path="Login">
          <Route path="" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Route>

        <Route path="/pins">
          <Route path="/create" element={<CreatePin />} />
          <Route path="/location/:id" element={<Location />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Route> */}

        {/* <Route path="profiles" element={<Profiles />} /> */}
      </div>
      {/* <Map /> */}
      {/* <SignupForm /> */}
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
