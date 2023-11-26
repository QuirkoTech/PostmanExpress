import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

const HomePage = ({ selectedLocation, updateLocation }) => {
    const handleLocationChange = (e) => {
        const location = e.target.value;
        updateLocation(location);
    };

    const locations = ["oulu", "helsinki", "tampere", "turku", "espoo", "warehouse"];

    return (
        <section className="padding">
            <div className="max-container ">
                <div className="flex justify-between">
                <h2 className=" text-xl text-white">PostmanExpress</h2>
                <div className="relative max-w-fit text-xl">
                <select
                    className="custom-select"
                    value={selectedLocation}
                    onChange={handleLocationChange}
                >
                    {locations.map((location) => (
                        <option key={location} value={location}>
                            {location.charAt(0).toUpperCase() +
                                location.slice(1)}
                        </option>
                    ))}
                    
                </select>
                <MapPin className="stroke-red-600 absolute left-1 top-1.5  w-5 h-5"  />
                </div>
                </div>

                <p className="mt-20 text-center text-2xl">
                    Would you like to pickup or deliver a parcel?
                </p>

                <Link
                    to="pickup"
                    className="mx-auto mb-4 mt-12 block w-[240px] rounded-full bg-green-600 px-14 py-3 text-center text-2xl"
                >
                    Pickup
                </Link>

                <Link
                    to="delivery"
                    className="mx-auto mt-6 block w-[240px] rounded-full bg-blue-600 px-14 py-3 text-center text-2xl"
                >
                    Deliver
                </Link>

            </div>
        </section>
    );
};

export default HomePage;
