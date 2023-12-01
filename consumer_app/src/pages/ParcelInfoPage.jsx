import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { ChevronDown, ChevronUp } from "lucide-react";
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

    const capitalizedShipFrom = capitalizeFirstLetter(parcelInfo.ship_from);
    const capitalizedShipTo = capitalizeFirstLetter(parcelInfo.ship_to);

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
    console.log(parcelInfo);

    const statusColor = statusColorMap[parcelInfo.parcel_status];

    console.log(statusColor);

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

    if (!isValidId) {
        return <NotFoundPage />;
    }
    return (
        <Layout>
            <h1 className="mb-9 text-4xl font-normal text-white">
                Parcel Info
            </h1>

            <div className="bg-dark-secondary border-slate-blue mx-10 min-w-[800px] rounded-2xl border border-solid text-lg shadow-xl">
                <div className="grid grid-cols-2">
                    <div className="m-8">
                        <div className="flex flex-row gap-4">
                            <div className="flex flex-col gap-4">
                                <div>ID:</div>
                                <div>Content:</div>
                                <div>Status:</div>
                                <div>Delivery Pin</div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <span
                                    className="line-clamp-1"
                                    title={`${parcelInfo.parcel_id}`}
                                >
                                    {parcelInfo.parcel_id}
                                </span>

                                <div>{parcelInfo.parcel_name}</div>
                                <div className=" flex flex-row">
                                    <div
                                        className={`mr-2 mt-3 h-2 w-2 rounded-full bg-${statusColor}`}
                                    ></div>
                                    <div>
                                        {statusMap[parcelInfo.parcel_status]}
                                    </div>
                                </div>
                                <div></div>
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
                                <div className="mt-4 flex flex-col gap-4">
                                    {parcelInfo.status_timestamps &&
                                        parcelInfo.status_timestamps.map(
                                            (status, index) => (
                                                <div
                                                    key={index}
                                                    className="relative ml-8 flex flex-col"
                                                >
                                                    {index === 0 && (
                                                        <div className="absolute bottom-[24px] left-1 -ml-[1px] h-[52px] w-[2px] border-l-2 border-[#494844]"></div>
                                                    )}

                                                    <div className="relative flex">
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
                                                                at {status.time}{" "}
                                                                on {status.date}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Additional status if the parcel status changes */}
                                                    {index <
                                                        parcelInfo
                                                            .status_timestamps
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
                                                        )}
                                                </div>
                                            ),
                                        )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="m-8">
                        <div className="flex flex-row gap-8">
                            <div className="flex flex-col gap-4">
                                <div>Recipient:</div>
                                <div>Sender:</div>
                                <div>From:</div>
                                <div>To:</div>
                                <div>Weight:</div>
                                <div>Height:</div>
                                <div>Width:</div>
                                <div>Length:</div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div>{parcelInfo.receiver_name}</div>
                                <div>{parcelInfo.sender_name}</div>
                                <div>{capitalizedShipFrom}</div>
                                <div>{capitalizedShipTo}</div>
                                <div>{parcelInfo.weight} kg</div>
                                <div>{parcelInfo.height} m</div>
                                <div>{parcelInfo.width} m</div>
                                <div>{parcelInfo.length} m</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ParcelInfoPage;
