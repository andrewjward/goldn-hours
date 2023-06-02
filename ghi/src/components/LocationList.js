import { useState, useEffect } from 'react'
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { useParams } from 'react-router-dom';


const LocationList = () => {
  const [pins, setPins] = useState([]);
  const params = useParams();



  const fetchPins = async () => {
    const pinsUrl = `http://localhost:8000/api/pins?lat=69&long=69&radius=10000000000`;
    const response = await fetch(pinsUrl);
    if (response.ok) {
      const pinsData = await response.json();
      setPins(pinsData);
    }
  };


  useEffect(() => {
    fetchPins();
  }, [])


  return (
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
  )
}

export default LocationList
