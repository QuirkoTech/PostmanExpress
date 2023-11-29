import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Info } from "lucide-react";
import Layout from "../components/layout/Layout";

const availableParcelsDummy = [
    {
        parcel_id: "9b52e4de-47bd-4acb-9ea6-f4f2182ab41a",
        last_status_date: "14.04",
        ship_to: "Helsinki",
    },
    {
        parcel_id: "9b52e4de-47bd-4acb-9ea6-f4f2182ab41b",
        last_status_date: "14.04",
        ship_to: "Tampere",
    },
    {
        parcel_id: "9b52e4de-47bd-4acb-9ea6-f4f2182ab41c",
        last_status_date: "14.04",
        ship_to: "Oulu",
    },
    {
        parcel_id: "9b52e4de-47bd-4acb-9ea6-f4f2182ab41d",
        last_status_date: "14.04",
        ship_to: "Espoo",
    },
    {
        parcel_id: "9b52e4de-47bd-4acb-9ea6-f4f2182ab41e",
        last_status_date: "14.04",
        ship_to: "Turku",
    },
    {
        parcel_id: "9b52e4de-47bd-4acb-9ea6-f4f2182ab41f",
        last_status_date: "14.04",
        ship_to: "Rovaniemi",
    },
];

const NewParcelPage = () => {
    const DRIVER_URL = import.meta.env.VITE_DRIVER_BACKEND_URL;

    const [availableParcels, setAvailableParcels] = useState([]);

    useEffect(() => {
        const fetchUserParcels = async () => {
            try {
                const response = await axios.get(`${DRIVER_URL}/parcels`, {
                    withCredentials: true,
                });
                const { status, data } = response.data;

                if (status === "success") {
                    setAvailableParcels(data.parcels);
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
    return (
        <Layout>
            <h1 className="mb-9 text-4xl font-normal text-white">
                Available Parcels
            </h1>

            <div className="mx-10 grid grid-cols-2 justify-items-center gap-x-20 gap-y-10">
                {availableParcels.map((parcel) => (
                    <div
                        key={parcel.parcel_id}
                        className="bg-dark-secondary border-slate-blue rounded-max h-[116px] w-[440px] 
                        cursor-pointer border-2 px-5 py-5 shadow-lg shadow-black/40
                        transition-all duration-300 hover:scale-105"
                        onClick={() => handleParcelClick(parcel.parcel_id)}
                    >
                        <div className="flex flex-row justify-between gap-x-10 text-lg">
                            <div className="flex flex-col items-start">
                                <span className="mb-5 w-28 overflow-hidden text-ellipsis whitespace-nowrap">
                                    ID: {parcel.parcel_id}
                                </span>
                                <span>To: {parcel.ship_to}</span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="mb-5">
                                    Last Update: {parcel.last_status_date}
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
        </Layout>
    );
};

export default NewParcelPage;
