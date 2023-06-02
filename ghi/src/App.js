import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "./App.css";
import Nav from "./components/Nav";
import LocationList from "./components/LocationList";
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
import SearchUserList from "./components/SearchUser";

function App() {
  const baseUrl = "http://localhost:8000";
  const { token } = useToken();
  const [userData, setUserData] = useState({});
  const [username, setUsername] = useState({});

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
  }, [token]);

  return (
    <div className="">
      <BrowserRouter>
        <AuthProvider baseUrl={baseUrl}>
          <Nav
            userData={userData}
            setUserData={setUserData}
            username={username}
          />
          <Routes>
            <Route
            path="/location/:latitude/:longitude"
            element={<LocationList />}
            />
            <Route path="/" element={<Map />} />
            <Route
              path="/signup"
              element={
                <SignupForm userData={userData} setUserData={setUserData} />
              }
            />
            <Route
              path="/search-users"
              element={<SearchUserList userData={userData} />}
            />
            <Route path="/new-pin" element={<PinForm userData={userData} />} />
            <Route path="/pin" element={<PinCard />} />
            <Route
              path="/login"
              element={
                <LoginForm userData={userData} setUserData={setUserData} />
              }
            />
            <Route
              path="/profile/:username"
              element={
                <Profile username={username} setUsername={setUsername} />
              }
            />
            {/* <Route path="/logout" element={<Logout />} /> */}
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
