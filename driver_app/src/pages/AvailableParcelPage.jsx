import Layout from "../components/layout/Layout";

import { useNavigate } from "react-router-dom";

import { Info } from "lucide-react";

const ActiveParcel = [
    {
        id: "12345678",
        lastUpdate: "14.04",
        toAddress: "Helsinki",
    },
    {
        id: "12345679",
        lastUpdate: "14.04",
        toAddress: "Tampere",
    },
    {
        id: "12345677",
        lastUpdate: "14.04",
        toAddress: "Oulu",
    },
    {
        id: "12345676",
        lastUpdate: "14.04",
        toAddress: "Espoo",
    },
    {
        id: "12345675",
        lastUpdate: "14.04",
        toAddress: "Turku",
    },
    {
        id: "12345678",
        lastUpdate: "14.04",
        toAddress: "Rovaniemi",
    },
];

const NewParcelPage = () => {
    const navigate = useNavigate();

    const handleParcelClick = (parcelId) => {
        // Navigate to the parcel details page
        navigate(`/parcels/${parcelId}`);
    };
    return (
        <Layout>
            <h1 className="mb-9 pl-9 text-4xl font-normal text-white">
                Available Parcels
            </h1>

            <div className="margin-x grid grid-cols-2 gap-x-20 gap-y-10">
                {ActiveParcel.map((parcel) => (
                    <div
                        key={parcel.id}
                        className="bg-dark-secondary border-slate-blue rounded-max h-[116px] w-[440px] 
                        cursor-pointer border-2 px-5 py-5 shadow-lg shadow-black/40
                        transition-all duration-300 hover:scale-105"
                        onClick={() => handleParcelClick(parcel.id)}
                    >
                        <div className="flex flex-row justify-between gap-x-10 text-lg">
                            <div className="flex flex-col items-start">
                                <span className="mb-5">ID: {parcel.id}</span>
                                <span>To: {parcel.toAddress}</span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="mb-5">
                                    Last Update: {parcel.lastUpdate}
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
