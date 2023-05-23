
const PinCard = () => {
    {/* This will be used in the .map function for the map ui */}
    return (
        <div className="h-96 w-80 bg-slate-200 rounded-lg shadow-xl">
            <div className="mx-4 mt-4">
                {/* Replace with image */}
                <img className="h-48 rounded shadow-lg" src={pin.image_url} name="image" />

                <div className="mt-2 h-8 relative">
                    <h1 className="w-40 h-6 absolute top-1 font-bold">{pin.location_name}</h1>
                    <img className="bg-slate-800 h-8 w-8 absolute left-44 rounded-full object-cover" src="https://th.bing.com/th/id/OIP.XjDToVaHspE0v6Oke3nCDgHaKb?pid=ImgDet&rs=1" />
                    <p className="h-6 absolute pl-2 left-52 top-1">{pin.username}</p>
                </div>

                <p className="mt-2 h-5 text-sm text-center truncate">☀️ {pin.sunny} 🍃 {pin.windy} 🧔 {pin.crowded}</p>
                <p className="mt-2 h-5 text-sm">Link to Profile</p>
                <p className="mt-1 h-5 text-sm">Historical weather data</p>

                <button className="truncate mt-2 border-b-2 border-b-amber-600 bg-amber-400 rounded-lg h-8 w-32 text-center active:bg-amber-500 hover:bg-amber-300 shadow-md active:shadow-none active:border-b-0">View more ></button>

                <button className="truncate mt-2 border-b-2 hover:border-b-2 ml-6 border-b-amber-600 bg-amber-400 rounded-lg h-8 w-32 text-center active:bg-amber-500 hover:bg-amber-300 shadow-md active:shadow-none active:border-b-0">View more ></button>
            </div>
        </div>
    )
}


export default PinCard;
