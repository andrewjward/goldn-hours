import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import pic from "../images/gold-icon.png";
import deleteIcon from "../images/delete-icon.svg";
import useToken from "@galvanize-inc/jwtdown-for-react";

function Profile({ username, setUsername }) {
  const [pins, setPins] = useState([]);
  const [profile, setProfile] = useState([]);
  const params = useParams();
  const [userData, setUserData] = useState({});
  const { token } = useToken();
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

  const deletePin = async (event, id) => {
    event.preventDefault();
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/pins/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include our authorization token here
      },
    });
    if (response.ok) {
      setPins(pins.filter((pin) => pin.id !== id));
    }
  };

  const fetchData = async () => {
    const fetchUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/accounts/69?username=${params.username}`;
    const response = await fetch(fetchUrl);
    if (response.ok) {
      const data = await response.json();
      setProfile(data);
    }
  };

  const fetchPins = async () => {
    const pinsUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/pins?username=${params.username}`;
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
                <motion.div className=" relative" whileHover={{}}>
                  <img
                    className="hover:z-0 z-4 rounded-xl w-96 h-56 object-cover"
                    src={pin.image_url}
                    alt="List of Pins"
                  ></img>
                  {isLoggedIn ? (
                    <motion.img
                      src={deleteIcon}
                      initial={{ opacity: 0 }}
                      whileHover={{
                        opacity: 1,
                        transition: { duration: 0.05 },
                      }}
                      alt="delete-icon"
                      className="absolute z-3 top-0 right-0 w-10"
                      onClick={(event) => deletePin(event, pin.id)}
                    />
                  ) : (
                    <></>
                  )}
                </motion.div>
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
