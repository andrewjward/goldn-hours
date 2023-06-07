import React, { useEffect } from 'react'
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { useNavigate } from 'react-router-dom';


const SearchBox = ({ searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();


  const getGeo = async (event) => {
    event.preventDefault();
    geocodeByAddress(searchTerm)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        navigate(`/location/${lat}/${lng}`)
      });
  }


  const handleSearchTerm = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  }


  useEffect(() => {
    setSearchTerm("");
  }, [])


  return (
    <form className="flex" onSubmit={getGeo}>
      <input
        type="search"
        onChange={handleSearchTerm}
        id="default-search"
        className="m-2 p-3 pl-10 text-sm text-orange-900 border border-orange-300 rounded-lg bg-orange-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-orange-700 dark:border-orange-600 dark:placeholder-orange-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
        placeholder="Search Locations"
      ></input>
      <button
        type="submit"
        className="m-2 text-white right-2.5 bg-amber-600 hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-orange-400 font-medium rounded-lg text-sm px-4 py-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
      >
        Search
      </button>
    </form>
  )
}

export default SearchBox
