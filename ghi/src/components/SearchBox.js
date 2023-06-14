import React, { useEffect, useState } from "react";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import { useNavigate } from "react-router-dom";
import search from "../images/thin-search.png";

const SearchBox = ({ searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");
  const [searchTermError, setSearchTermError] = useState(false);

  const getGeo = async (event) => {
    event.preventDefault();
    geocodeByAddress(currentSearchTerm)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        setSearchTerm(currentSearchTerm);
        navigate(`/location/${lat}/${lng}`);
      }).catch( err => {
        console.log("The location you input is not correct!");
        setSearchTermError(true);
      });
  };

  const handleSearchTerm = (event) => {
    const value = event.target.value;
    setSearchTermError(false);
    setCurrentSearchTerm(value);
  };

  useEffect(() => {
    setSearchTerm("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form className="flex" onSubmit={getGeo}>
      <input
        type="search"
        onChange={handleSearchTerm}
        id="default-search"
        className="my-2 p-3 text-sm text-orange-900 border border-orange-300 rounded-l-lg bg-orange-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-orange-700 dark:border-orange-600 dark:placeholder-orange-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
        placeholder="Search Locations"
      ></input>
      <button
        type="submit"
        className="mr-2.5 my-2 text-white right-2.5 bg-amber-600 hover:bg-orange-400 font-medium rounded-r-lg text-sm px-3 py-2 dark:bg-orange-600 dark:hover:bg-orange-700"
      >
        <img src={search} alt="search-icon" className="w-6" />
      </button>
      {searchTermError && ( <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded absolute top-14 z-10"
            role="alert"
          >
            <strong className="font-bold">HOLY SMOKES DUDE! Location not found!</strong>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg
                className="fill-current h-6 w-6 text-red-500"
                role="button"
                onClick={() => searchTermError(false)}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </span>
          </div>
        )}
    </form>
  );
};

export default SearchBox;
