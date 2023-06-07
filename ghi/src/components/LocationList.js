import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import notFound from "../images/not_found.png";
import { NavLink } from "react-router-dom";

const LocationList = ({ searchTerm }) => {
  const [pins, setPins] = useState([]);
  const params = useParams();
  const searchRange = 100;

  const fetchPins = async () => {
    const pinsUrl = `http://localhost:8000/api/pins?lat=${params.latitude}&long=${params.longitude}&radius=${searchRange}`;
    const response = await fetch(pinsUrl);
    if (response.ok) {
      const pinsData = await response.json();
      console.log(pinsData);
      setPins(pinsData);
    }
  };

  useEffect(() => {
    fetchPins();
  }, [params]);


  return (
    <div>
      <h1>{searchTerm}</h1>
      {pins.length > 0 ? (
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
                  alt="pin"
                ></img>
                <p>{pin.location_name}</p>
                <NavLink to={`/profile/${pin.username}`}>
                  {pin.username}
                </NavLink>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="w-100 h-screen flex flex-col justify-center items-center">
          <img
            className="w-1/2 rounded-3xl m-3"
            src={notFound}
            alt="Not Found"
          />
          <h1>NO POSTS</h1>
        </div>
      )}
    </div>
  );
};

export default LocationList;
