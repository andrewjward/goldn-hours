import React, { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByAddress } from 'react-google-places-autocomplete';

const LocationInput = () => {
    const [value, setValue] = useState(null);


    const handleGeocode = async () => {
    geocodeByAddress('83 Bayard Street, New York, NY 10013')
        .then(results => console.log(results[0].geometry.viewport.Ha.lo, results[0].geometry.viewport.Ua.lo))
        .catch(error => console.error(error));
    };

    handleGeocode();

    return (
        <div>
            null
            {/* <GooglePlacesAutocomplete
            selectProps={{
                value,
                onChange: setValue,
            }}
            apiKey="AIzaSyAHLu1pjtU9SsQQ7HpiJ4WQGJOXtf2NyJs"
            apiOptions={{ language: 'en', region: 'en' }}
            minLengthAutocomplete
            /> */}
        </div>
    );
}

// export default LocationInput;
