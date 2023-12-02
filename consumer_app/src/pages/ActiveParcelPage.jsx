import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, Info, PackagePlus, PackageX } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";

import { statusMap, simpleStatusColorMap } from "../constants";

const ActiveParcelPage = () => {
    const CONSUMER_URL = import.meta.env.VITE_CONSUMER_BACKEND_URL;
    const navigate = useNavigate();
    const [activeParcels, setActiveParcels] = useState([]);

    useEffect(() => {
        const fetchUserParcels = async () => {
            try {
                const response = await axios.get(`${CONSUMER_URL}/me/parcels`, {
                    withCredentials: true,
                });
                const { status, data } = response.data;

                if (status === "success") {
                    setActiveParcels(data.user_parcels);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserParcels();
    }, [CONSUMER_URL]);

    const handleParcelClick = (parcelId) => {
        // Navigate to the parcel details page
        navigate(`/parcels/${parcelId}`);
    };

    // Media query
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        function handleResize() {
            setIsSmallScreen(window.innerWidth <= 767);
        }

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div>
            <h1 className="sm-max:text-2xl sm-max:mb-6 mb-9 text-4xl font-normal text-white">
                Active Parcel
            </h1>
            {activeParcels.length === 0 ? (
                <div className="flex flex-col items-center justify-center">
                    {isSmallScreen ? (
                        <PackageX size={100} strokeWidth="1px" />
                    ) : (
                        <PackageX size={200} strokeWidth="0.5px" />
                    )}
                    <h1 className="mt-8 w-3/4 text-center text-2xl font-semibold">
                        No parcels here yet
                    </h1>

                    <Link
                        to="/new"
                        className="mx-1 mt-4 flex flex-row hover:text-green-500"
                    >
                        <p className="mr-2">Create new parcel</p>
                        <PackagePlus
                            className="items-center"
                            size={20}
                            strokeWidth={2}
                        />
                    </Link>
                    <Link
                        to="/history"
                        className="text-green-active mx-1 mt-8 flex flex-row items-center hover:text-green-500"
                    >
                        <p className="mr-1">See past shipments</p>
                        <ChevronRight
                            className="items-center"
                            size={20}
                            strokeWidth={2}
                        />
                    </Link>
                </div>
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
                            <div className="sm-max:text-sm sm-max:gap-x-5 flex flex-row justify-between gap-x-10 text-lg">
                                <div className="flex flex-col items-start">
                                    <span className="xl-max:w-48 md-max:w-28 sm-max:mb-3 mb-5 w-28 overflow-hidden text-ellipsis whitespace-nowrap">
                                        {parcel.parcel_name}
                                    </span>
                                    <span className="flex flex-row items-center">
                                        <div
                                            className={`mr-2 h-2 w-2 rounded-full ${`bg-${
                                                simpleStatusColorMap[
                                                    parcel.parcel_status
                                                ]
                                            }`}`}
                                        ></div>
                                        <span>
                                            {statusMap[parcel.parcel_status]}
                                        </span>
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
                                        <span className="mr-1 ">More Info</span>
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

export default ActiveParcelPage;
