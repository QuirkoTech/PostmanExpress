import Layout from "../components/layout/Layout";
import { Button } from "../components";

const ParcelInfoPage = () => {
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
                    <div className="flex">
                        <p className=" w-36 ">Pickup pin:</p>
                        <p className="text-white">None</p>
                    </div>
                    <div className="flex">
                        <p className=" w-36 ">Delivery pin:</p>
                        <p className="text-white">43245</p>
                    </div>
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
            <div className="text-center mt-8">
            <Button className="" text="Accept delivery" />
            </div>
        </Layout>
    );
};

export default ParcelInfoPage;
