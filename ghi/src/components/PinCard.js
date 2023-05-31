import { InfoWindowF } from "@react-google-maps/api";
import { useState } from "react";

import { motion } from "framer-motion";

const PinCard = ({ pin }) => {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="h-96 w-80 bg-slate-200 rounded-lg shadow-xl">
      <InfoWindowF
        position={{ lat: pin.latitude, lng: pin.longitude }}
        className="bg-slate-700"
      >
        {clicked ? (
          <div className="rounded-lg bg-slate-700">
            <div className="mt-2 h-8 relative">
              <h1 className="z-3 w-40 h-6 font-bold">
                {pin.location_name}
              </h1>
              <img
                className="z-0 h-20 rounded shadow-lg object-cover"
                src={pin.image_url}
                key={pin.id}
                onClick={() => setClicked(false)}
              />
              <p className="z-3 h-6 absolute pl-2 left-52 top-1">{pin.username}</p>
            </div>

            <p className="z-3 mt-2 h-5 text-sm text-center truncate">
              ☀️ {pin.cloudy} 🍃 {pin.windy} 🧔 {pin.crowded}
            </p>
            <p className="z-3 mt-2 h-5 text-sm">{pin.username}</p>

            <button className="z-3 truncate mt-2 border-b-2 border-b-amber-600 bg-amber-400 rounded-lg h-8 w-32 text-center active:bg-amber-500 hover:bg-amber-300 shadow-md active:shadow-none active:border-b-0">
              View more
            </button>
          </div>
        ) : (
          <img
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
