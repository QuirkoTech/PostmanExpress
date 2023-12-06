import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Info } from "lucide-react";
import { capitalizeFirstLetter } from "../utils";
import NoParcelData from "../components/NoParcelData";

// const activeParcelsDummy = [
//     {
//         parcel_id: "12345678",
//         last_status_date: "14.04",
//         ship_to: "Helsinki",
//     },
//     {
//         parcel_id: "12345679",
//         last_status_date: "14.04",
//         ship_to: "Tampere",
//     },
//     {
//         parcel_id: "12345677",
//         last_status_date: "14.04",
//         ship_to: "Oulu",
//     },
//     {
//         parcel_id: "12345676",
//         last_status_date: "14.04",
//         ship_to: "Espoo",
//     },
//     {
//         parcel_id: "12345675",
//         last_status_date: "14.04",
//         ship_to: "Turku",
//     },
//     {
//         parcel_id: "12345678",
//         last_status_date: "14.04",
//         ship_to: "Rovaniemi",
//     },
// ];

const NewParcelPage = () => {
    const DRIVER_URL = import.meta.env.VITE_DRIVER_BACKEND_URL;

    const [activeParcels, setActiveParcels] = useState([]);

    useEffect(() => {
        const fetchUserParcels = async () => {
            try {
                const response = await axios.get(`${DRIVER_URL}/me/parcels`, {
                    withCredentials: true,
                });
                const { status, data } = response.data;

                if (status === "success") {
                    setActiveParcels(data.parcels);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserParcels();
    }, [DRIVER_URL]);

    const navigate = useNavigate();

    const handleParcelClick = (parcelId) => {
        // Navigate to the parcel details page
        navigate(`/parcels/${parcelId}`);
    };

    // Media query
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isSmallScreen2, setIsSmallScreen2] = useState(false);
    useEffect(() => {
        function handleResize() {
            setIsSmallScreen(window.innerWidth <= 640);
        }

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        function handleResize() {
            setIsSmallScreen2(window.innerWidth <= 640);
        }

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div>
            <h1 className="sm-max:text-2xl  sm-max:ml-4 sm-max:mb-6 mb-9 text-4xl font-normal text-white">
                Accepted Parcels
            </h1>
            {activeParcels.length === 0 ? (
                <NoParcelData
                    message={"No active parcels"}
                    currentPage="ActiveParcelPage"
                    isSmallScreen={isSmallScreen2}
                />
            ) : (
                <div className="xl-max:grid-cols-1 sm-max:mx-0 sm-max:gap-y-6 mx-10 grid grid-cols-2 justify-items-center gap-x-20 gap-y-10">
                    {activeParcels.map((parcel) => (
                        <div
                            key={parcel.parcel_id}
                            className="bg-dark-secondary border-slate-blue rounded-max xl-max:w-[500px] md-max:w-[410px] 
                            sm-max:w-[275px] sm-max:p-3 w-[440px] 
                            cursor-pointer border-2 p-5 shadow-lg shadow-black/40
                            transition-all duration-300 hover:scale-105"
                            onClick={() => handleParcelClick(parcel.parcel_id)}
                        >
                            <div className="sm-max:text-base sm-max:gap-x-5 flex flex-row justify-between gap-x-10 text-lg">
                                <div className="flex flex-col items-start">
                                    <span className="xl-max:w-48 md-max:w-28 sm-max:mb-3 mb-5 w-28 overflow-hidden text-ellipsis whitespace-nowrap">
                                        ID: {parcel.parcel_id}
                                    </span>
                                    <span>
                                        To:{" "}
                                        {capitalizeFirstLetter(parcel.ship_to)}
                                    </span>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="sm-max:mb-3 mb-5">
                                        {isSmallScreen
                                            ? `Updated: ${parcel.last_status_date.slice(
                                                  0,
                                                  -3,
                                              )}`
                                            : `Last Update: ${parcel.last_status_date}`}
                                    </span>
                                    <span className="flex flex-row items-center transition-all duration-300 hover:text-white">
                                        <span className="mr-1">More Info</span>
                                        <Info size={12} />
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NewParcelPage;
