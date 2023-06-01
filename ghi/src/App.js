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
import PinCard from "./components/PinCard";
import LocationInput from "./components/LocationInput";
import useToken from "@galvanize-inc/jwtdown-for-react";

function App() {
  const baseUrl = "http://localhost:8000";
  const { token } = useToken();

  const [userData, setUserData] = useState({});

  const handleGetLoggedInUser = async () => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/token`;
    fetch(url, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data.account);
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    handleGetLoggedInUser();
  }, []);

  return (
    <div className="">
      <BrowserRouter>
        <AuthProvider baseUrl={baseUrl}>
          <Nav userData={userData} setUserData={setUserData} />
          <Routes>
            <Route path="/" element={<Map />} />
            <Route
              path="/signup"
              element={
                <SignupForm userData={userData} setUserData={setUserData} />
              }
            />
            <Route path="/new-pin" element={<PinForm userData={userData} />} />
            <Route path="/pin" element={<PinCard />} />
            <Route
              path="/login"
              element={
                <LoginForm userData={userData} setUserData={setUserData} />
              }
            />
            <Route path="/profile/:username" element={<Profile />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
