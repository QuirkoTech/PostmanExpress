import { useState } from "react";
import Layout from "../components/layout/Layout";
import { ChevronDown, ChevronUp } from "lucide-react";

const ParcelInfoPage = () => {
    const [isTableVisible, setTableVisible] = useState(true);

    const toggleTableVisibility = () => {
        setTableVisible(!isTableVisible);
    };

    return (
        <Layout>
            <div>
                <h1 className="mb-9 pl-9 text-4xl font-normal text-white">
                    Parcel Info
                </h1>

                <div className="bg-dark-secondary border-slate-blue margin-x min-w-[800px] rounded-2xl border border-solid text-lg shadow-xl">
                    <div className="grid grid-cols-2">
                        <div className="m-8">
                            <div className="flex flex-row gap-8">
                                <div className="flex flex-col gap-4">
                                    <div>ID:</div>
                                    <div>Content:</div>
                                    <div>Status:</div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div>12345679</div>
                                    <div>Keyboard</div>
                                    <div className="flex flex-row items-center">
                                        <div className="mr-2 h-2 w-2 rounded-full bg-red-500"></div>
                                        In Route
                                    </div>
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
                                        <div className="relative ml-8 flex">
                                            <div className="mr-2 mt-3 h-2 w-2 rounded-full bg-red-500"></div>
                                            <div className="ml-4 flex flex-col">
                                                <h1>In Route</h1>
                                                <p className="text-xs opacity-75">
                                                    at 14:37 on 14.04.2023
                                                </p>
                                            </div>
                                        </div>
                                        <div className="relative ml-8 flex">
                                            <div className="mr-2 mt-3 h-2 w-2 rounded-full bg-red-500"></div>
                                            <div className="ml-4 flex flex-col">
                                                <h1>Prepared for Delivery</h1>
                                                <p className="text-xs opacity-75">
                                                    at 14:37 on 14.04.2023
                                                </p>
                                            </div>
                                            <div className=" absolute bottom-[32px] left-1 -ml-[1px] h-[52px] w-[2px] border-l-2 border-[#494844]"></div>
                                        </div>
                                        <div className="relative ml-8 flex">
                                            <div className="mr-2 mt-3 h-2 w-2 rounded-full bg-red-500"></div>
                                            <div className="ml-4 flex flex-col">
                                                <h1>In Route</h1>
                                                <p className="text-xs opacity-75">
                                                    at 14:37 on 14.04.2023
                                                </p>
                                            </div>
                                            <div className=" absolute bottom-[32px] left-1 -ml-[1px] h-[52px] w-1 border-l-2 border-[#494844]"></div>
                                        </div>
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
                                    <div>Depth:</div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div>12345679</div>
                                    <div>Keyboard</div>
                                    <div>Keyboard</div>
                                    <div>Keyboard</div>
                                    <div>Keyboard</div>
                                    <div>Keyboard</div>
                                    <div>Keyboard</div>
                                    <div>Keyboard</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ParcelInfoPage;
