import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "./App.css";
import Nav from "./components/Nav";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import Profile from "./components/Profile";
import Map from "./components/Map";
import { motion } from "framer-motion";
import logo from "./images/golden-logo-transparent.png";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import PinForm from "./components/PinForm";

function App() {
  const baseUrl = "http://localhost:8000";
  return (
    <div className="container">
      <BrowserRouter>
        <AuthProvider baseUrl={baseUrl}>
          <Nav />
          <Routes>
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/new-pin" element={<PinForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/profile/:username" element={<Profile />} />
            {/* <Route path="/logout" element={<Logout />} /> */}
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
