import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'

function Profile() {
  const [pins, setPins] = useState([]);
  const [profile, setProfile] = useState([]);
  const isLoggedIn = true;

  let params = useParams();


  const fetchData = async () => {
    const fetchUrl = `http://localhost:8000/api/accounts/646fd5f3b6e948d3f21370b5`;
    const response = await fetch(fetchUrl);
    console.log(`fetched the user`)
    if (response.ok) {
      const data = await response.json();
      // console.log(data);
      setProfile(data);
    }
  };


  const fetchPins = async () => {
    const pinsUrl = `http://localhost:8000/api/pins?username=${params.username}`;
    const response = await fetch(pinsUrl);
    console.log(`fetched the pins`)
    if (response.ok) {
      const pinsData = await response.json();
      console.log(pinsData);
      setPins(pinsData);
    }
  }

  //   const handleDelete = async (customerId) => {
  //     const deletedurl = `http://localhost:8090/api/customers/${customerId}`;
  //     const response = await fetch(deletedurl, { method: "DELETE" });
  //     fetchData();
  //   };

  useEffect(() => {
    fetchData();
    fetchPins();
  }, []);

  console.log(`Ran through the code`)


  return (
    <main>
      <div className="m-3 container mx-auto px-4 flex flex-col justify-center items-center">
        <div>{profile.name}</div>
        <img
          className="m-3 w-20 h-20 rounded-full object-cover"
          src={profile.profile_pic}
          alt="Rounded avatar"
        />
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
