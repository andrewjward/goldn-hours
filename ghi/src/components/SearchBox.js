import React, { useEffect, useState } from "react";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import { useNavigate } from "react-router-dom";
import search from "../images/thin-search.png";

const SearchBox = ({ searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");

  const getGeo = async (event) => {
    event.preventDefault();
    geocodeByAddress(currentSearchTerm)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        setSearchTerm(currentSearchTerm);
        navigate(`/location/${lat}/${lng}`);
      });
  };

  const handleSearchTerm = (event) => {
    const value = event.target.value;
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
        className="md:w-48 w-20 my-2 p-3 text-sm text-orange-900 border border-orange-300 rounded-l-lg bg-orange-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-orange-700 dark:border-orange-600 dark:placeholder-orange-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
        placeholder="Search Locations"
      ></input>
      <button
        type="submit"
        className="mr-2.5 my-2 text-white right-2.5 bg-amber-600 hover:bg-orange-400 font-medium rounded-r-lg text-sm px-3 py-2 dark:bg-orange-600 dark:hover:bg-orange-700"
      >
        <img src={search} alt="search-icon" className="w-6" />
      </button>
    </form>
  );
};

export default SearchBox;
