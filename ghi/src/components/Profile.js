import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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

  //   const handleDelete = async (customerId) => {
  //     const deletedurl = `http://localhost:8090/api/customers/${customerId}`;
  //     const response = await fetch(deletedurl, { method: "DELETE" });
  //     fetchData();
  //   };

  useEffect(() => {
    handleGetLoggedInUser();
    fetchData();
    fetchPins();
  }, []);

  return (
    <main>
      <div className="m-3 container mx-auto px-4 flex flex-col justify-center items-center">
        <div>{profile.name}</div>
        <img
          className="m-3 w-20 h-20 rounded-full object-cover"
          src={profile.profile_pic}
          alt="Rounded avatar"
        />
        {isLoggedIn ? (
          <button
            // onClick={}
            type="submit"
            className="m-2 text-white right-2.5 bg-amber-600 hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-orange-400 font-medium rounded-lg text-sm px-4 py-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
          >
            Edit Profile Picture
          </button>
        ) : null}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {pins.map((pin) => {
            return (
              <div className="h-auto max-w-full rounded-lg" key={pin.id}>
                <img
                  className="relative m-3 rounded-xl w-96 h-56 object-cover"
                  src={pin.image_url}
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
