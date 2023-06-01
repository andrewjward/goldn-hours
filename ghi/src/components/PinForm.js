import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

const PinForm = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [userName, setUserName] = useState({});
  const [locationLongitude, setLocationLongitude] = useState(0);
  const [locationLatitude, setLocationLatitude] = useState(0);
  // const [formToJSON, setFormToJSON] = useState({});

  const [formData, setFormData] = useState({
    username: "",
    location_name: "",
    longitude: 0,
    latitude: 0,
    cloudy: 0,
    windy: 0,
    crowded: 0,
    date: new Date().toISOString().slice(0, 10),
    image_url: ""
  });

  const handleFormData = (event) => {
    const value = event.target.value;
    const inputName = event.target.name;

    setFormData({
      ...formData,
      [inputName]: value,
      username: userName,
    });
    // console.log(formData);
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


  const handleGeocode = async () => {
    // let lat = 0;
    // let lng = 0;
    geocodeByAddress('Montevideo, Uruguay')
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        setLocationLongitude(lng); setLocationLatitude(lat);
    })
      .catch(error => console.error(error));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleGeocode();
    setTimeout(() => {
      console.log("HANDLE_SUBMIT:", locationLongitude, locationLatitude);
    }, 3000);
    setFormData({
      ...formData,
      longitude: locationLongitude,
      latitude: locationLatitude
    });

    // console.log("FORMDATA:", formData);
    // formToJSON = formData;
    // formToJSON["username"] = userName;
    // console.log("FORM2JSON:", formToJSON);
    const url = "http://localhost:8000/api/pins";
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
          image_url: ""
        })
        navigate(`/profile/${userData.username}`);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handleGetLoggedInUser();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1 className="text-center">Make a new Pin!</h1>
            <form onSubmit={handleSubmit} id="add-customer-form">
              <div className="form-floating mb-3">
                <input
                  onChange={handleFormData}
                  placeholder="Location"
                  required
                  type="text"
                  name="location_name"
                  id="location_name"
                  className="m-2 p-3 text-sm text-orange-900 border border-orange-300 rounded-lg bg-orange-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-orange-700 dark:border-orange-600 dark:placeholder-orange-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                  value={formData.location_name}
                />
                <label htmlFor="name"></label>
              </div>
              {/* <div className="form-floating mb-3">
                <input
                  onChange={handleFormData}
                  placeholder="Longitude"
                  required
                  type="number"
                  name="longitude"
                  id="longitude"
                  className="m-2 p-3 text-sm text-orange-900 border border-orange-300 rounded-lg bg-orange-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-orange-700 dark:border-orange-600 dark:placeholder-orange-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                  value={formData.longitude}
                />
                <label htmlFor="fabric"></label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleFormData}
                  placeholder="Latitude"
                  required
                  type="number"
                  name="latitude"
                  id="latitude"
                  className="m-2 p-3 text-sm text-orange-900 border border-orange-300 rounded-lg bg-orange-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-orange-700 dark:border-orange-600 dark:placeholder-orange-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                  value={formData.latitude}
                />
                <label htmlFor="fabric"></label>
              </div> */}
              <div className="form-floating mb-3">
                <label
                  htmlFor="steps-range"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  How Cloudy is It?
                </label>
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
                  className="m-2 p-3 text-sm text-orange-900 border border-orange-300 rounded-lg bg-orange-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-orange-700 dark:border-orange-600 dark:placeholder-orange-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                  value={formData.cloudy}
                />
                <label htmlFor="fabric"></label>
              </div>
              <div className="form-floating mb-3">
                <label
                  htmlFor="steps-range"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Is it Windy?
                </label>
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
                  className="m-2 p-3 text-sm text-orange-900 border border-orange-300 rounded-lg bg-orange-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-orange-700 dark:border-orange-600 dark:placeholder-orange-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                  value={formData.windy}
                />
                <label htmlFor="fabric"></label>
              </div>
              <div className="form-floating mb-3">
                <label
                  htmlFor="steps-range"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  How Crowded is it?
                </label>
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
                  className="m-2 p-3 text-sm text-orange-900 border border-orange-300 rounded-lg bg-orange-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-orange-700 dark:border-orange-600 dark:placeholder-orange-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                  value={formData.crowded}
                />
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
                  className="m-2 p-3 text-sm text-orange-900 border border-orange-300 rounded-lg bg-orange-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-orange-700 dark:border-orange-600 dark:placeholder-orange-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                  value={formData.image_url}
                />
                <label htmlFor="fabric"></label>
              </div>
              <button className="btn btn-success w-100">Create Pin</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PinForm;
