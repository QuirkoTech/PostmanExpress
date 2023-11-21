import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ArrowLeftCircle } from "lucide-react";
import { Keypad } from "../components";

const PickupPage = ({ location, type }) => {
    // Backend URL for the locker app
    const LOCKER_URL = import.meta.env.VITE_LCOKER_BACKEND_URL;

    // Yup validation schema for form validation
    const schema = yup.object();

    const {
        register,
        handleSubmit,
        setError,
        reset,
        setValue,
        formState: { errors, isSubmitSuccessful, isSubmitting },
        setFocus,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [pin, setPin] = useState("");

    // This line was needed to update the pin value in the form for some reason it wasnt updating
    useEffect(() => {
        setFocus("pin");
    }, [pin, setFocus]);

    const handleDigitClick = (digit) => {
        setPin((prevPin) => prevPin + digit);
    };

    const handleClearClick = () => {
        setPin("");
    };

    const submitHandler = async (data) => {
        try {
            console.log(data);
            console.log(pinWatch);
        } catch (error) {}
    };

    return (
        <section className="padding">
            <div className="max-container">
                <div className="flex justify-between text-white">
                    <h2 className="text-xl">PostmanExpress</h2>
                    <Link to="/">
                        <ArrowLeftCircle size={28} />
                    </Link>
                </div>
                <h1 className="mt-10 text-center text-3xl text-white">
                    Pickup Parcel
                </h1>
                <form
                    onSubmit={handleSubmit(submitHandler)}
                    className="mt-10 flex flex-col"
                >
                    <input
                        type="text"
                        onSubmit={(e) => {
                            setPin(e.target.value); // Update local state
                            setValue("pin", e.target.value); // Update form value using react-hook-form
                        }}
                        readOnly
                        {...register("pin")}
                        value={pin}
                        className="mb-10 w-1/3 self-center rounded-md border text-center text-xl text-black focus:outline-none"
                    />
                    <input
                        type="text"
                        value={location}
                        readOnly
                        {...register("location")}
                        className="hidden"
                    />
                    <input
                        type="text"
                        value={type}
                        readOnly
                        {...register("type")}
                        className="hidden"
                    />
                    <Keypad
                        onDigitClick={handleDigitClick}
                        onClearClick={handleClearClick}
                        isSubmitting={isSubmitting}
                    />
                </form>
            </div>
        </section>
    );
};

export default PickupPage;
