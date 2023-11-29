import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/layout/Layout";
import { Button } from "../components";

const ParcelInfoPage = () => {
    const { parcel_id } = useParams();
    const navigate = useNavigate();
    const [parcelInfo, setParcelInfo] = useState({});

    useEffect(() => {
        const fetchParcelInfo = async () => {
            const DRIVER_URL = import.meta.env.VITE_DRIVER_BACKEND_URL;

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
        };

        fetchParcelInfo();
    }, [parcel_id, navigate]);

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

    return (
        <Layout>
            <h1 className="mb-9 text-4xl font-normal text-white">
                Parcel Info
            </h1>

            <div
                className="bg-dark-secondary border-slate-blue relative mx-10  
                      rounded-2xl border-2 border-solid px-8 py-8 text-lg "
            >
                <div className="flex flex-col  gap-3 lg:h-[13rem] lg:flex-wrap">
                    <div className="flex">
                        <p className="w-36">ID:</p>
                        <p className="text-white">
                            9b52e4de-47bd-4acb-9ea6-f4f2182ab41a
                        </p>
                    </div>
                    <div className="flex">
                        <p className=" w-36 ">From:</p>
                        <p className="text-white">Warehouse</p>
                    </div>
                    <div className="flex">
                        <p className=" w-36 ">To:</p>
                        <p className="text-white">Oulu</p>
                    </div>
                    {pickup_pin ? (
                        <div className="flex">
                            <p className=" w-36 ">Pickup pin:</p>
                            <p className="text-white">None</p>
                        </div>
                    ) : null}
                    {delivery_pin ? (
                        <div className="flex">
                            <p className=" w-36 ">Delivery pin:</p>
                            <p className="text-white">43245</p>
                        </div>
                    ) : null}
                    <div className="flex">
                        <p className=" w-36 ">Weight:</p>
                        <p className="text-white">0.3 kg</p>
                    </div>{" "}
                    <div className="flex">
                        <p className=" w-36 ">Height:</p>
                        <p className="text-white">0.4m</p>
                    </div>{" "}
                    <div className="flex">
                        <p className=" w-36 ">Width:</p>
                        <p className="text-white">0.5m</p>
                    </div>{" "}
                    <div className="flex">
                        <p className=" w-36 ">Depth:</p>
                        <p className="text-white">0.8</p>
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center">
                <Button className="" text="Accept delivery" />
            </div>
        </Layout>
    );
};

export default ParcelInfoPage;
