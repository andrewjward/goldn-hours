import React from "react";
import { useNavigate } from "react-router-dom";

function ImageModal({ pin, setShowModal, setSearchTerm }) {
    const navigate = useNavigate();

    const clickedOffModal = () => {
        setShowModal(false);
    }

    const getMessage = (meter) => {
        if (pin[meter] < 4) {
            return `It's not very ${meter} out!`;
        } else if (pin[meter] < 7) {
            return `It's a bit ${meter} out!`;
        } else {
            return `It's very ${meter} out!`;
        }
    }

    const sunnyMessage = getMessage("cloudy");
    const windyMessage = getMessage("windy");
    const crowdedMessage = getMessage("crowded");

    const handleLocationClick = () => {
        setSearchTerm(pin.location_name);
        navigate(`/location/${pin.latitude}/${pin.longitude}`);
    }

    const handleUsernameClick = () => {
        navigate(`/profile/${pin.username}`);
    }

    return (
        <div
        className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-[5px] z-30 flex justify-center items-center"
        >
            <img alt={pin.location_name} src={pin.image_url} className="rounded-l-2xl h-5/6 w-3/4 object-cover object-center" name="modal-image" />
            <div className="bg-slate-800 h-5/6 to-50% w-96 rounded-r-2xl" name="modal-information">
                <div className="px-14 text-center text-xl" name="titles">
                    <h1 className="text-4xl pt-20 pb-1 font-bold text-amber-400">Image Title</h1>
                    <div className="pb-4">
                        <button
                        className="text-sm text-amber-500"
                        onClick={handleUsernameClick}
                        >
                            {pin.username}
                        </button>
                        <p className="text-sm text-amber-500" >Reliability Score</p>
                    </div>
                    <div className="mx-4 bg-opacity-70 w-100 h-1  mb-2" name="divider" />
                    <div className="pb-2" name="weather-data">
                        <button
                        className="text-2xl font-bold text-amber-400"
                        onClick={handleLocationClick}
                        >
                            {pin.location_name}
                        </button>

                        <h3 className="text-md pb-2 text-amber-500">Weather data</h3>
                        <div className="mx-10 bg-opacity-70 w-100 h-1  mb-3" name="divider" />
                        <p className="pb-2 text-xl text-amber-500">{sunnyMessage}</p>
                        <p className="pb-2">{pin.cloudy}/10 <span className="text-amber-400">Cloudiness!</span></p>
                        <p className="pb-2 text-xl text-amber-500">{windyMessage}</p>
                        <p className="pb-2">{pin.windy}/10 <span className="text-amber-400">Windiness!</span></p>
                        <p className="pb-2 text-xl text-amber-500">{crowdedMessage}</p>
                        <p className="pb-3">{pin.crowded}/10 <span className="text-amber-400">Crowdedness!</span></p>
                    </div>
                    <div className="mx-10 bg-opacity-70 w-100 h-1 mb-4" name="divider" />
                    <div className="text-amber-500" name="modal-footer">
                        <p className="">Pin description?</p>
                        <p>information of where historical data is sourced?</p>
                        <p></p>
                    </div>
                </div>
            </div>
            <div
            className="bg-red-500 h-10 w-10 absolute right-5 top-5"
            onClick={clickedOffModal}
            />
        </div>
    );
}
export default ImageModal
