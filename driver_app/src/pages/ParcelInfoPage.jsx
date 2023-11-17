import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "../components/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const ParcelInfoPage = () => {
    return (
        <div className="relative flex min-h-screen flex-col">
            <Layout>
                <div className="ml-20 w-2/3">
                    <div className="my-10">
                        <h1 className="text-4xl font-normal text-white">
                            Parcel Info
                        </h1>
                    </div>
                    <div className="bg-dark-secondary mb-10 h-[444px] w-full rounded-2xl text-lg">
                        <div className="grid grid-cols-2">
                            <div className="m-8">
                                <div className="flex flex-row gap-8">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-row">
                                            <div>ID:</div> <div>12345679</div>
                                        </div>
                                        <div>From:</div>
                                        <div>To:</div>
                                    </div>
                                    {/* <div className="flex flex-col gap-4">
                                        <div>12345679</div>
                                        <div>Keyboard</div>
                                        <div>Keyboard</div>
                                    </div> */}
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
        </div>
    );
};

export default ParcelInfoPage;
