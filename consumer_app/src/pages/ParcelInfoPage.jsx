import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { ChevronDown, ChevronUp, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { statusColorMap, statusMap } from "../constants/index";
import { NotFoundPage } from "../pages";
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

    console.log(statusColor);
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
    } = parcelInfo;
    console.log(parcelInfo);
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
            <h1 className="mb-9 text-4xl font-normal text-white">
                Parcel Info
            </h1>

            {/* <div
                className="bg-dark-secondary border-slate-blue md-max:mx-2 sm-max:mx-0 md-max:p-7 sm-max:p-4 
                      sm-max:text-base relative mx-10 rounded-2xl border-2 border-solid p-8 text-lg "
            >
                <div className="lg-max:h-auto flex h-[13rem] flex-col gap-3 lg:flex-wrap">
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
                        <p className="text-white"> {parcel_name}</p>
                    </div>
                    <div className="flex">
                        <p className=" md-max:w-24 w-32 ">Receiver:</p>
                        <p className="text-white"> {receiver_name}</p>
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
                        <div className="flex flex-row">
                            <div
                                className={`mr-2 mt-3 h-2 w-2 rounded-full bg-${statusColor}`}
                            ></div>
                            <p className="text-white">
                                {statusMap[parcel_status]}
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
                        {isTableVisible && (
                            <div className="mt-4 flex flex-col gap-4"> */}
            {/* {parcelInfo.status_timestamps &&
                                    parcelInfo.status_timestamps.map(
                                        (status, index) => (
                                            <div
                                                key={index}
                                                className="relative ml-4 flex flex-col"
                                            >
                                                {index === 0 && (
                                                    <div className="absolute bottom-[24px] left-1 -ml-[1px] h-[52px] w-[2px] border-l-2 border-[#494844]"></div>
                                                )} */}

            {/* <div className="relative flex">
                                                    <div
                                                        className={`mr-2 mt-3 h-2 w-2 rounded-full bg-${statusColorMap[defaultStatus]}`}
                                                    ></div>
                                                    <div className="ml-4 flex flex-col">
                                                        <h1>
                                                            {
                                                                statusMap[
                                                                    defaultStatus
                                                                ]
                                                            }
                                                        </h1>
                                                        <p className="text-xs opacity-75">
                                                            at {status.time} on{" "}
                                                            {status.date}
                                                        </p>
                                                    </div>
                                                </div> */}

            {/* Additional status if the parcel status changes */}
            {/* {index <
                                                    parcelInfo.status_timestamps
                                                        .length -
                                                        0 &&
                                                    parcelInfo.parcel_status !==
                                                        defaultStatus && (
                                                        <div className="relative mt-2 flex">
                                                            <div
                                                                className={`mr-2 mt-3 h-2 w-2 rounded-full bg-${statusColor}`}
                                                            ></div>
                                                            <div className="ml-4 flex flex-col">
                                                                <h1>
                                                                    {capitalizeFirstLetter(
                                                                        parcelInfo.parcel_status,
                                                                    )}
                                                                </h1>
                                                                <p className="text-xs opacity-75">
                                                                    at{" "}
                                                                    {
                                                                        status.time
                                                                    }{" "}
                                                                    on{" "}
                                                                    {
                                                                        status.date
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )} */}
            {/* </div>
                                        ),
                                    )} */}
            {/* </div>
                        )}
                    </div>
                </div>
            </div> */}
        </Layout>
    );
};

export default ParcelInfoPage;
