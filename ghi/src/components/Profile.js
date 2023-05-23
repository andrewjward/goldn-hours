import React, { useState, useEffect } from "react";

function Profile() {
  const [pins, setPins] = useState([]);
  const [profile, setProfile] = useState([]);

  const fetchData = async (account_id) => {
    const fetchUrl = `http://localhost:8000/api/accounts/{account_id}?username=Louis`;
    const response = await fetch(fetchUrl);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setProfile(data);
    }
  };

  //   const handleDelete = async (customerId) => {
  //     const deletedurl = `http://localhost:8090/api/customers/${customerId}`;
  //     const response = await fetch(deletedurl, { method: "DELETE" });
  //     fetchData();
  //   };

  useEffect(() => {
    fetchData();
  }, []);

  //   if (!customers.length) {
  //     return <div>No Customers to display</div>;
  //   }

  return (
    <main>
      <div className="container mx-auto px-4">
        <div>{profile.name}</div>
        <img
          className="w-20 h-20 rounded-full;"
          src={profile.profile_pic}
          alt="Rounded avatar"
        />
      </div>
    </main>
  );
}

export default Profile;
