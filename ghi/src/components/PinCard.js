import { InfoWindowF } from "@react-google-maps/api";
import { useState } from "react";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import pic from "../images/gold-icon.png";

const PinCard = ({ pin, setSearchTerm }) => {
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
      setSearchTerm(pin.location_name);
      navigate(`/location/${pin.latitude}/${pin.longitude}`);
    };

  return (
    <div className="flex flex-col justify-center items-center bg-slate-200 rounded-lg">
      <InfoWindowF
        position={{ lat: pin.latitude, lng: pin.longitude }}
        className="flex flex-col items-center justify-center bg-slate-700"
      >
        {clicked ? (
          <motion.div
            animate={{ y: 0 }}
            initial={{ y: 100 }}
            className="rounded-lg bg-slate-700 w-100 h-100"
          >
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-xl m-2">{pin.location_name}</h1>
              <img
                className="w-11/12 h-40 rounded shadow-lg object-cover"
                src={pin.image_url}
                key={pin.id}
                onClick={() => setClicked(false)}
                alt="pin"
              />
              <div className="flex flex-row items-center m-1">
                <img
                  src={pin.profile_pic ?? pic}
                  className="rounded-full w-6 h-6 object-cover"
                />
                <NavLink to={`/profile/${pin.username}`} className="ml-1">
                  {pin.username}
                </NavLink>
              </div>
              <p className="text-sm text-center truncate">
                ☀️ {pin.cloudy} 🍃 {pin.windy} 🧔 {pin.crowded}
              </p>
              <button
                onClick={handleClick}
                className="flex items-center truncate mt-2 border-b-2 border-b-amber-600 bg-amber-400 rounded-lg h-8 w-30 text-center active:bg-amber-500 hover:bg-amber-300 shadow-md active:shadow-none active:border-b-0"
              >
                View more
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.img
            animate={{ y: 0 }}
            initial={{ y: 100 }}
            className="h-10 rounded shadow-lg object-cover"
            src={pin.image_url}
            key={pin.id}
            onClick={() => setClicked(true)}
          />
        )}
      </InfoWindowF>
    </div>
  );
};

export default PinCard;
