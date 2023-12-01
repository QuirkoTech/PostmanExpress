import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, Info, PackagePlus, PackageX } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";

import { statusMap, simpleStatusColorMap } from "../constants";
import Layout from "../components/layout/Layout";

const ParcelHistoryPage = () => {
    const CONSUMER_URL = import.meta.env.VITE_CONSUMER_BACKEND_URL;
    const navigate = useNavigate();
    const [deliveredParcels, setDeliveredParcels] = useState([]);

    useEffect(() => {
        const fetchUserParcelHistory = async () => {
            try {
                const response = await axios.get(`${CONSUMER_URL}/me/history`, {
                    withCredentials: true,
                });

                const { status, data } = response.data;

                if (status === "success") {
                    const deliveredParcels = data.parcels.filter(
                        (parcel) => parcel.parcel_status === "delivered",
                    );
                    setDeliveredParcels(deliveredParcels);
                }
            } catch (error) {
                console.error("Error fetching parcel history:", error);
            }
        };

        fetchUserParcelHistory();
    }, [CONSUMER_URL]);

    const handleParcelClick = (parcelId) => {
        // Navigate to the parcel details page
        navigate(`/parcels/${parcelId}`);
    };

    const [isSmallScreen, setIsSmallScreen] = useState(false);

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

    return (
        <Layout>
            <div className="container mx-auto p-4">
                <h1 className="mb-12 text-4xl font-normal text-white">
                    Delivered Parcels
                </h1>

                {deliveredParcels.length === 0 ? (
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
                    </div>
                ) : (
                    <div className="mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {deliveredParcels.map((parcel) => (
                            <div
                                key={parcel.parcel_id}
                                className="bg-dark-secondary border-slate-blue rounded-max h-[116px] w-full
                                    cursor-pointer border-2 px-5 py-5 shadow-lg shadow-black/40 transition-all
                                    duration-300 hover:scale-105 sm:w-[440px]"
                                onClick={() =>
                                    handleParcelClick(parcel.parcel_id)
                                }
                            >
                                <div className="flex flex-row justify-between gap-x-10 text-lg">
                                    <div className="flex flex-col items-start">
                                        <span className="mb-5 w-32 overflow-hidden text-ellipsis whitespace-nowrap ">
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
                                                {
                                                    statusMap[
                                                        parcel.parcel_status
                                                    ]
                                                }
                                            </span>
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="mb-5">
                                            Updated: {parcel.last_status_date}
                                        </span>
                                        <span className="flex flex-row items-center transition-all duration-300 hover:text-white">
                                            <span className="mr-1 ">
                                                More Info
                                            </span>
                                            <Info size={12} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default ParcelHistoryPage;
