import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const UpdateProfile = ({ userData, setUserData }) => {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    username: "",
    profile_pic: "",
    password: "",
    is_admin: "",
  });
  const navigate = useNavigate();

  const handleProfileChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.email = profileData.email;
    data.username = profileData.username;
    data.profile_pic = profileData.profile_pic;
    data.password = profileData.password;
    data.name = profileData.name;
    data.is_admin = profileData.is_admin;

    const profileUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/accounts/${profileData.id}`;
    const fetchConfig = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };
    const response = await fetch(profileUrl, fetchConfig);
    if (response.ok) {
      navigate(`/profile/${profileData.username}`);
    }
  };

  useEffect(() => {
    setProfileData(userData);
  }, [userData]);

  return (
    <div className="flex flex-col justify-center items-center">
      {/* <img className="m-4 w-1/4 rounded" src={signup} /> */}
      <h1>Update Your Profile</h1>
      <div className="w-1/3 rounded-lg bg-slate-700 flex flex-col justify-center items-center p-4 mt-4 drop-shadow-lg">
        <form
          className="flex flex-col justify-center items-center"
          onSubmit={handleSubmit}
          id="add-customer-form"
        >
          <div className="">
            <input
              onChange={handleProfileChange}
              placeholder="Email"
              required
              type="text"
              name="email"
              id="email"
              className="m-2 p-3 text-sm text-orange-900 border border-orange-300 rounded-lg bg-orange-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-orange-700 dark:border-orange-600 dark:placeholder-orange-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
              value={profileData.email}
            />
            <label htmlFor="email"></label>
          </div>
          <div className="">
            <input
              onChange={handleProfileChange}
              placeholder="Username"
              required
              type="text"
              name="username"
              id="username"
              className="m-2 p-3 text-sm text-orange-900 border border-orange-300 rounded-lg bg-orange-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-orange-700 dark:border-orange-600 dark:placeholder-orange-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
              value={profileData.username}
            />
            <label htmlFor="username"></label>
          </div>
          <div className="">
            <input
              onChange={handleProfileChange}
              placeholder="Profile Picture"
              required
              type="url"
              name="profile_pic"
              id="profile_pic"
              className="m-2 p-3 text-sm text-orange-900 border border-orange-300 rounded-lg bg-orange-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-orange-700 dark:border-orange-600 dark:placeholder-orange-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
              value={profileData.profile_pic}
            />
            <label htmlFor="password"></label>
          </div>
          <div className="">
            <input
              onChange={handleProfileChange}
              placeholder="Name"
              required
              type="name"
              name="name"
              id="name"
              className="m-2 p-3 text-sm text-orange-900 border border-orange-300 rounded-lg bg-orange-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-orange-700 dark:border-orange-600 dark:placeholder-orange-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
              value={profileData.name}
            />
            <label htmlFor="name"></label>
          </div>
          <motion.button
            className="m-2 text-white right-2.5 bg-amber-600 hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-orange-400 font-medium rounded-lg text-sm px-4 py-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.9 }}
          >
            Update
          </motion.button>
        </form>
      </div>
    </div>
  );
};
export default UpdateProfile;
