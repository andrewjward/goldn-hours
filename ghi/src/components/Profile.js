import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'

function Profile() {
  const [pins, setPins] = useState([]);
  const [profile, setProfile] = useState([]);
  const isLoggedIn = true;

  let params = useParams();


  const fetchData = async () => {
    const fetchUrl = `http://localhost:8000/api/accounts/{account_id}?username=${params.username}`;
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
      <div className="container mx-auto px-4">
        <div>{profile.name}</div>
        <img
          className="w-20 h-20 rounded-full"
          src={profile.profile_pic}
          alt="Rounded avatar"
        />
        <div className="">
          {pins.map((pin) => {
            return (
              <div key={pin.id}>
                <img className="w-96 h-96 object-cover" src={pin.image_url}></img>
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
