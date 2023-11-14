import { Keypad } from "../components";
import { ArrowLeftCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const PickupPage = () => {
    const [pin, setPin] = useState("");

    const handleDigitClick = (digit) => {
        setPin((prevPin) => prevPin + digit);
    };

    const handleClearClick = () => {
        setPin("");
    };

    const handleSubmitClick = () => {
        // Implement your logic to handle the submitted input
        console.log("Submitted input:", pin);
    };

    return (
        <section className="padding">
            <div className="max-container ">
                <div className="flex justify-between text-white">
                    <h2 className=" text-xl">PostmanExpress</h2>

                    <Link to="/">
                        <ArrowLeftCircle size={28} />{" "}
                    </Link>
                </div>
                <h1 className="mt-10 text-center text-3xl text-white">
                    Pickup Parcel
                </h1>
                <div className="mt-10 flex flex-col">
                    <input
                        type="text"
                        value={pin}
                        readOnly
                        className="m mb-10 w-1/3 self-center rounded-md border text-center text-xl text-black focus:outline-none"
                    />
                    <Keypad
                        onDigitClick={handleDigitClick}
                        onClearClick={handleClearClick}
                        onSubmitClick={handleSubmitClick}
                    />
                </div>
            </div>
        </section>
    );
};

export default PickupPage;
