import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/layout/Layout";
import { toast } from "react-toastify";
import { Button } from "../components";
import { capitalizeFirstLetter } from "../utils";
import { EyeOff, Eye } from "lucide-react";

const ParcelInfoPage = () => {
    const DRIVER_URL = import.meta.env.VITE_DRIVER_BACKEND_URL;
    const { parcel_id } = useParams();
    const navigate = useNavigate();
    const [parcelInfo, setParcelInfo] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Function to fetch parcel info
    const fetchParcelInfo = useCallback(async () => {
        try {
            const response = await axios.get(
                `${DRIVER_URL}/parcels/${parcel_id}`,
                { withCredentials: true },
            );

            const { status, data } = response.data;

            if (status === "success") {
                setParcelInfo(data.parcel_info);
            }
        } catch (error) {
            console.log(error);
            navigate("/404", { replace: true });
        }
    }, [navigate, parcel_id, DRIVER_URL]);

    // Fetch parcel info on mount
    useEffect(() => {
        fetchParcelInfo();
    }, [fetchParcelInfo]);

    const {
        ship_to,
        current_location,
        length,
        height,
        width,
        weight,
        driver_accepted,
        pickup_pin,
        delivery_pin,
    } = parcelInfo;

    // Function to accept parcel on click
    const acceptParcelHandler = async () => {
        setIsSubmitting(true);
        try {
            const response = await axios.patch(
                `${DRIVER_URL}/parcels/${parcel_id}`,
                {},
                { withCredentials: true },
            );

            const { status } = response.data;

            if (status === "success") {
                toast.success("Parcel accepted successfully", {
                    autoClose: 3000,
                });

                await fetchParcelInfo();
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong with your request");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Media query
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isLongText, setIsLongText] = useState(false);

    useEffect(() => {
        function handleResize() {
            setIsSmallScreen(window.innerWidth <= 622);
        }

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <Layout>
            <h1 className="sm-max:text-2xl sm-max:mb-6 mb-9 text-4xl font-normal text-white">
                Parcel Info
            </h1>

            <div
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
                                className="ml-2 text-white border-none"
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
                        <p className=" md-max:w-24 w-32 ">From:</p>
                        <p className="text-white">
                            {current_location &&
                                capitalizeFirstLetter(current_location)}
                        </p>
                    </div>
                    <div className="flex">
                        <p className=" md-max:w-24 w-32 ">To:</p>
                        <p className="text-white">
                            {" "}
                            {ship_to && capitalizeFirstLetter(ship_to)}
                        </p>
                    </div>
                    {pickup_pin ? (
                        <div className="flex">
                            <p className=" md-max:w-24 w-32 ">Pickup pin:</p>
                            <p className="text-white">{pickup_pin}</p>
                        </div>
                    ) : null}
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
                </div>
            </div>
            {!driver_accepted ? (
                <div className="mt-8 flex justify-center">
                    <Button
                        disabled={isSubmitting}
                        className="flex h-[40px] w-[163px] justify-center"
                        isSubmitting={isSubmitting}
                        text="Accept delivery"
                        onClick={acceptParcelHandler}
                    />
                </div>
            ) : null}
        </Layout>
    );
};

export default ParcelInfoPage;
