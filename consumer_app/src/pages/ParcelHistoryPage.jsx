import { useNavigate } from "react-router-dom";
import { Info } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { NoParcelData } from "../components";
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
            <div className="container mx-auto">
                <h1 className="sm-max:text-2xl sm-max:mb-6 mb-9 text-4xl font-normal text-white">
                    Parcels History
                </h1>

                {deliveredParcels.length === 0 ? (
                    <NoParcelData
                        isSmallScreen={isSmallScreen}
                        message={"No parcel history found"}
                    />
                ) : (
                    <div className="xl-max:grid-cols-1 sm-max:mx-0 sm-max:gap-y-6 mx-10 grid grid-cols-2 justify-items-center gap-x-20 gap-y-10">
                        {deliveredParcels.map((parcel) => (
                            <div
                                key={parcel.parcel_id}
                                className="bg-dark-secondary border-slate-blue rounded-max xl-max:w-[500px] md-max:w-[410px] 
                            sm-max:w-[275px] sm-max:p-3 w-[440px] 
                            cursor-pointer border-2 p-5 shadow-lg shadow-black/40
                            transition-all duration-300 hover:scale-105"
                                onClick={() =>
                                    handleParcelClick(parcel.parcel_id)
                                }
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
                                                {
                                                    statusMap[
                                                        parcel.parcel_status
                                                    ]
                                                }
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
