import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import LocationList from "./components/LocationList";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import Profile from "./components/Profile";
import Map from "./components/Map";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import PinForm from "./components/PinForm";
import PinCard from "./components/PinCard";
import useToken from "@galvanize-inc/jwtdown-for-react";
import SearchUserList from "./components/SearchUser";
import UpdateProfile from "./components/UpdateProfile";
import Chat from "./components/Chat";

function App() {
  const baseUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}`;
  const { token } = useToken();
  const [userData, setUserData] = useState({});
  const [username, setUsername] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleGetLoggedInUser = async () => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/token`;
    fetch(url, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data.account);
        setUsername(data.account.username);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    handleGetLoggedInUser();
  }, [token]);

  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");

  return (
    <div className="scroll-smooth">
      <BrowserRouter basename={basename}>
        <AuthProvider baseUrl={baseUrl}>
          <Nav
            userData={userData}
            setUserData={setUserData}
            username={username}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <Routes>
            <Route
            path="/location/:latitude/:longitude"
            element={<LocationList
            searchTerm={searchTerm}
            userData={userData}
            setSearchTerm={setSearchTerm}
            />}
            />
            <Route path="/" element={<Map setSearchTerm={setSearchTerm} />} />
            <Route
              path="/signup"
              element={
                <SignupForm userData={userData} setUserData={setUserData} />
              }
            />
            <Route path="/chat" element={<Chat userData={userData} setUserData={setUserData} />} />
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
                <Profile
                  userData={userData}
                  setUserData={setUserData}
                  setUsername={setUsername}
                />
              }
            />
            <Route
              path="/profile/:username/update"
              element={
                <UpdateProfile userData={userData} setUserData={setUserData} />
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
