import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import pic from "../images/gold-icon.png";

function Profile({ username, setUsername }) {
  const [pins, setPins] = useState([]);
  const [profile, setProfile] = useState([]);
  const params = useParams();
  const [userData, setUserData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(
    params.username === userData.username
  );

  const handleGetLoggedInUser = async () => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/token`;
    fetch(url, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data.account);
        setUsername(data.account.username);
        setIsLoggedIn(params.username === data.account.username);
      })
      .catch((error) => console.error(error));
  };

  const fetchData = async () => {
    const fetchUrl = `http://localhost:8000/api/accounts/69?username=${params.username}`;
    const response = await fetch(fetchUrl);
    if (response.ok) {
      const data = await response.json();
      setProfile(data);
    }
  };

  const fetchPins = async () => {
    const pinsUrl = `http://localhost:8000/api/pins?username=${params.username}`;
    const response = await fetch(pinsUrl);
    if (response.ok) {
      const pinsData = await response.json();
      setPins(pinsData);
    }
  };

  useEffect(() => {
    handleGetLoggedInUser();
    fetchData();
    fetchPins();
    // eslint-disable-next-line
  }, [params]);

  return (
    <main>
      <div className="m-3 mx-auto px-4 flex flex-col justify-center items-center">
        <div>{profile.name}</div>
        <motion.img
          className="m-3 w-20 h-20 rounded-full object-cover"
          src={profile.profile_pic ?? pic}
          alt="Rounded avatar"
          whileHover={{
            scale: 1.2,
            transition: { duration: 0.2 },
          }}
        />
        {isLoggedIn ? (
          <motion.button
            // onClick={}
            type="submit"
            className="m-2 text-white right-2.5 bg-amber-600 hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-orange-400 font-medium rounded-lg text-sm px-4 py-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.9 }}
          >
            Edit Profile
          </motion.button>
        ) : null}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {pins.map((pin) => {
            return (
              <div
                className="flex flex-col items-center h-auto max-w-full rounded-lg"
                key={pin.id}
              >
                <img
                  className="relative m-3 rounded-xl w-96 h-56 object-cover"
                  src={pin.image_url}
                  alt="List of Pins"
                ></img>
                <p>{pin.location_name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
export default Profile;
