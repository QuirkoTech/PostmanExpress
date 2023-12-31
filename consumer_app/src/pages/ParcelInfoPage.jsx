import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { ChevronDown, ChevronUp, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { statusColorMap, statusMap } from "../constants/index";
import { NotFoundPage } from "../pages";
import Timestamps from "../components/Timestamps";

const ParcelInfoPage = () => {
    const { parcel_id } = useParams();

    const [parcelInfo, setParcelInfo] = useState({});
    const [isTableVisible, setTableVisible] = useState(true);
    const [defaultStatus, setDefaultStatus] = useState("awaiting drop-off");
    const [isValidId, setIsValidId] = useState(true);

    const [isStatusChanged, setStatusChanged] = useState(false);

    const toggleTableVisibility = () => {
        setTableVisible(!isTableVisible);
    };

    const capitalizeFirstLetter = (string) => {
        if (!string) return "";
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    useEffect(() => {
        const CONSUMER_URL = import.meta.env.VITE_CONSUMER_BACKEND_URL;
        const fetchParcelInfo = async () => {
            try {
                const response = await axios.get(
                    `${CONSUMER_URL}/parcels/${parcel_id}`,
                    {
                        withCredentials: true,
                    },
                );

                const { status, data } = response.data;

                if (status === "success") {
                    setParcelInfo((prevParcelInfo) => {
                        return { ...prevParcelInfo, ...data.parcel_info };
                    });

                    if (data.parcel_info.parcel_status !== defaultStatus) {
                        setStatusChanged(true);
                    } else {
                        setStatusChanged(false);
                    }
                } else {
                    console.error("Fetch parcel info failed:", data.message);
                    setIsValidId(false);
                }
            } catch (error) {
                console.error("Error fetching parcel info:", error);
                setIsValidId(false);
            }
        };

        fetchParcelInfo();
    }, [parcel_id]);

    const statusColor = statusColorMap[parcelInfo.parcel_status];

    const {
        height,

        length,

        parcel_name,

        parcel_status,

        receiver_name,

        sender_name,

        ship_from,

        ship_to,

        status_timestamps,

        weight,

        width,

        delivery_pin,

        pickup_pin,
    } = parcelInfo;

    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isLongText, setIsLongText] = useState(false);
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

    if (!isValidId) {
        return <NotFoundPage />;
    }

    return (
        <Layout>
            <h1 className="sm-max:ml-4 mb-9 text-4xl font-normal  text-white">
                Parcel Info
            </h1>

            <div
                className="bg-dark-secondary border-slate-blue md-max:mx-2 sm-max:mx-0 md-max:p-7 sm-max:p-4 
                      sm-max:text-base relative mx-10 rounded-2xl border-2 border-solid p-8 text-lg "
            >
                <div className="lg-max:h-auto flex  flex-col gap-3 lg:flex-wrap">
                    <div className="relative flex">
                        <p className="md-max:w-24 w-32">ID:</p>
                        <p
                            className={`md-max:whitespace-nowrap sm-max:w-2/4 relative overflow-hidden text-ellipsis text-white ${
                                isLongText ? "sm-max:whitespace-normal" : ""
                            }`}
                            title={parcel_id}
                        >
                            {parcel_id}
                        </p>
                        {isSmallScreen && (
                            <button
                                className="ml-2 border-none text-white"
                                onClick={() =>
                                    setIsLongText((prevState) => !prevState)
                                }
                            >
                                {isLongText ? (
                                    <Eye className="w-4" />
                                ) : (
                                    <EyeOff className="w-4" />
                                )}
                            </button>
                        )}
                    </div>
                    <div className="flex">
                        <p className=" md-max:w-24 w-32 ">Content:</p>
                        <p
                            className={`md-max:whitespace-nowrap sm-max:w-2/4 relative overflow-hidden text-ellipsis text-white ${
                                isLongText ? "sm-max:whitespace-normal" : ""
                            }`}
                            title={parcel_name}
                        >
                            {parcel_name}
                        </p>
                    </div>
                    <div className="flex">
                        <p className=" md-max:w-24 w-32 ">Receiver:</p>
                        <p
                            className={`md-max:whitespace-nowrap sm-max:w-2/4 relative overflow-hidden text-ellipsis text-white ${
                                isLongText ? "sm-max:whitespace-normal" : ""
                            }`}
                            title={receiver_name}
                        >
                            {receiver_name}
                        </p>
                    </div>
                    <div className="flex">
                        <p className=" md-max:w-24 w-32 ">Sender:</p>
                        <p className="text-white"> {sender_name}</p>
                    </div>
                    <div className="flex">
                        <p className=" md-max:w-24 w-32 ">From:</p>
                        <p className="text-white">
                            {" "}
                            {ship_from && capitalizeFirstLetter(ship_from)}
                        </p>
                    </div>
                    <div className="flex">
                        <p className=" md-max:w-24 w-32 ">To:</p>
                        <p className="text-white">
                            {" "}
                            {ship_to && capitalizeFirstLetter(ship_to)}
                        </p>
                    </div>
                    {delivery_pin ? (
                        <div className="flex">
                            <p className=" md-max:w-24 w-32 ">Delivery pin:</p>
                            <p className="text-white">{delivery_pin}</p>
                        </div>
                    ) : null}
                    {pickup_pin ? (
                        <div className="flex">
                            <p className=" md-max:w-24 w-32 ">Pick up pin:</p>
                            <p className="text-white">{pickup_pin}</p>
                        </div>
                    ) : null}
                    <div className="flex">
                        <p className=" md-max:w-24 w-32 ">Weight:</p>
                        <p className="text-white">{weight} kg</p>
                    </div>{" "}
                    <div className="flex">
                        <p className=" md-max:w-24 w-32 ">Height:</p>
                        <p className="text-white">{height} m</p>
                    </div>{" "}
                    <div className="flex">
                        <p className=" md-max:w-24 w-32 ">Width:</p>
                        <p className="text-white">{width} m</p>
                    </div>{" "}
                    <div className="flex">
                        <p className=" md-max:w-24 w-32 ">Length:</p>
                        <p className="text-white">{length} m</p>
                    </div>
                    <div className="flex">
                        <p className=" md-max:w-24 w-32 ">Status:</p>
                        <div className="flex flex-row item-center">
                            <div
                                className={`sm-max:mt-2 mt-[10px] lw-max:mt-2 mr-2 h-2 w-2 rounded-full bg-${statusColor}`}
                            ></div>
                            <p className="text-white">
                                {capitalizeFirstLetter(parcel_status)}
                            </p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div
                            className="flex cursor-pointer select-none flex-row items-center"
                            onClick={toggleTableVisibility}
                        >
                            Status Roadmap
                            {isTableVisible ? (
                                <ChevronDown
                                    size={18}
                                    className="ml-1 cursor-pointer"
                                    onClick={toggleTableVisibility}
                                />
                            ) : (
                                <ChevronUp
                                    size={18}
                                    className="ml-1 cursor-pointer"
                                    onClick={toggleTableVisibility}
                                />
                            )}
                        </div>
                        {isTableVisible && status_timestamps && (
                            <Timestamps status_timestamps={status_timestamps} />
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ParcelInfoPage;
