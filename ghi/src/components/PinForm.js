import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { motion } from "framer-motion";

const PinForm = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [userName, setUserName] = useState({});
  const { token } = useToken();

  const [formData, setFormData] = useState({
    username: "",
    location_name: "",
    longitude: 0,
    latitude: 0,
    cloudy: 0,
    windy: 0,
    crowded: 0,
    date: new Date().toISOString().slice(0, 10),
    image_url: "",
  });

  const handleFormData = (event) => {
    const value = event.target.value;
    const inputName = event.target.name;

    setFormData({
      ...formData,
      [inputName]: value,
      username: userName,
    });
  };

  const handleGetLoggedInUser = async () => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/token`;
    fetch(url, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data.account);
        setUserName(data.account.username);
      })
      .catch((error) => console.error(error));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const results = await geocodeByAddress(formData.location_name);
      const { lat, lng } = await getLatLng(results[0]);

      setFormData({
        ...formData,
        longitude: lng,
        latitude: lat,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (formData.latitude !== 0 && formData.longitude !== 0) {
      const submitData = async () => {
        const url = "${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/pins";
        const fetchConfig = {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        };

        try {
          const response = await fetch(url, fetchConfig);
          if (response.ok) {
            setFormData({
              username: "",
              location_name: "",
              longitude: 0,
              latitude: 0,
              cloudy: 0,
              windy: 0,
              crowded: 0,
              date: new Date().toISOString().slice(0, 10),
              image_url: "",
            });
            navigate(`/profile/${userData.username}`);
          }
        } catch (error) {
          console.error(error);
        }
      };

      submitData();
    }
  }, [formData, navigate, userData]);
  useEffect(() => {
    handleGetLoggedInUser();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      {token ? (
        <div className="w-80 rounded-lg bg-slate-700 flex flex-col justify-center items-center mt-4 drop-shadow-lg">
          <h1 className="text-center">Make a new Pin!</h1>
          <form
            className="flex flex-col items-center justify-center form-floating mb-3"
            onSubmit={handleSubmit}
            id="add-customer-form"
          >
            <div className="">
              <input
                onChange={handleFormData}
                placeholder="Location"
                required
                type="text"
                name="location_name"
                id="location_name"
                className="m-4 text-sm text-orange-900 border border-orange-300 rounded-lg bg-orange-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-orange-700 dark:border-orange-600 dark:placeholder-orange-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                value={formData.location_name}
              />
              <label htmlFor="name"></label>
            </div>
            <div className="flexform-floating mb-3">
              <label
                htmlFor="steps-range"
                className="text-center block mb-2 text-sm font-medium dark:text-white"
              >
                How's the weather?
              </label>
              <div className="flex justify-center items-center">
                <h5>☀️</h5>
                <input
                  onChange={handleFormData}
                  placeholder="Cloudiness"
                  required
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  name="cloudy"
                  id="cloudy"
                  className="w-48 cursor-pointer m-4 text-sm text-orange-900 border border-orange-300 rounded-lg bg-orange-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-orange-700 dark:border-orange-600 dark:placeholder-orange-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                  value={formData.cloudy}
                />
                <h5>☁</h5>
              </div>
              <label htmlFor="fabric"></label>
            </div>
            <div className="form-floating mb-3">
              <label
                htmlFor="steps-range"
                className="text-center block mb-2 text-sm font-medium dark:text-white"
              >
                Is it Windy?
              </label>
              <div className="flex justify-center items-center">
                <h5>🍃</h5>
                <input
                  onChange={handleFormData}
                  placeholder="Windiness"
                  required
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  name="windy"
                  id="windy"
                  className="cursor-pointer m-4 text-sm text-orange-900 border border-orange-300 rounded-lg bg-orange-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-orange-700 dark:border-orange-600 dark:placeholder-orange-400 dark:text-white w-48 dark:focus:ring-orange-500 dark:focus:border-orange-500"
                  value={formData.windy}
                />
                <h5>💨</h5>
              </div>
              <label htmlFor="fabric"></label>
            </div>
            <div className="form-floating mb-3">
              <label
                htmlFor="steps-range"
                className="block mb-2 text-sm font-medium text-center dark:text-white"
              >
                How Crowded is it?
              </label>
              <div className="flex justify-center items-center">
                <h5>🤸‍♂️</h5>
                <input
                  onChange={handleFormData}
                  placeholder="Crowdedness"
                  required
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  name="crowded"
                  id="crowded"
                  className="w-48 cursor-pointer m-4 text-sm text-orange-900 border border-orange-300 rounded-lg bg-orange-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-orange-700 dark:border-orange-600 dark:placeholder-orange-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                  value={formData.crowded}
                />
                <h5>👨‍👩‍👦‍👦</h5>
              </div>
              <label htmlFor="fabric"></label>
            </div>
            <div className="form-floating mb-3">
              <label htmlFor="fabric"></label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormData}
                placeholder="Image"
                required
                type="url"
                name="image_url"
                id="image_url"
                className="m-4 text-sm text-orange-900 border border-orange-300 rounded-lg bg-orange-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-orange-700 dark:border-orange-600 dark:placeholder-orange-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                value={formData.image_url}
              />
              <label htmlFor="fabric"></label>
            </div>
            <motion.button
              className="m-4 text-white right-2.5 bg-amber-600 hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-orange-400 font-medium rounded-lg text-sm px-4 py-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.9 }}
            >
              Make Pin
            </motion.button>
          </form>
        </div>
      ) : (
        <div>Please login</div>
      )}
    </div>
  );
};
export default PinForm;
