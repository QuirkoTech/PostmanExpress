import { useNavigate } from "react-router-dom";
import { Info } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";

import { statusMap, statusColorMap } from "../constants";

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

    return (
        <div>
            <h1 className="mb-9 pl-9 text-4xl font-normal text-white">
                Active Parcel
            </h1>

            <div className="margin-x grid grid-cols-2 gap-x-20 gap-y-10">
                {activeParcels.map((parcel) => (
                    <div
                        key={parcel.parcel_id}
                        className="bg-dark-secondary border-slate-blue rounded-max h-[116px] w-[440px] 
                            cursor-pointer border-2 px-5 py-5 shadow-lg shadow-black/40
                            transition-all duration-300 hover:scale-105"
                        onClick={() => handleParcelClick(parcel.parcel_id)}
                    >
                        <div className="flex flex-row justify-between gap-x-10 text-lg">
                            <div className="flex flex-col items-start">
                                <span className="mb-5 w-32 overflow-hidden text-ellipsis whitespace-nowrap ">
                                    {parcel.parcel_name}
                                </span>
                                <span className="flex flex-row items-center">
                                    <div
                                        className={`mr-2 h-2 w-2 rounded-full ${`bg-${
                                            statusColorMap[parcel.parcel_status]
                                        }`}`}
                                    ></div>
                                    <span>
                                        {statusMap[parcel.parcel_status]}
                                    </span>
                                </span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="mb-5">
                                    Updated: {parcel.last_status_date}
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
        </div>
    );
};

export default ActiveParcelPage;
