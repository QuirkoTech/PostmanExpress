import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ArrowLeftCircle } from "lucide-react";
import { Keypad, Modal } from "../components";

const PickupPage = ({ location, type }) => {
    // Backend URL for the locker app
    const LOCKER_URL = import.meta.env.VITE_LOCKER_BACKEND_URL;

    // Handling the modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Yup validation schema for form validation
    const schema = yup.object({
        pin: yup
            .string()
            .required("Please enter a 4 digit pin before submitting")
            .min(4, "Please enter a 4 digit pin")
            .max(4, "Please enter a 4 digit pin"),
        cabinet_location: yup.string().required("Location is required"),
        type: yup
            .string()
            .required("Type is required")
            .oneOf(
                ["delivery", "pickup"],
                "Type must be 'delivery' or 'pickup'",
            ),
    });

    const {
        register,
        handleSubmit,
        setError,
        reset,
        formState: { errors, isSubmitting },
        setFocus,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [pin, setPin] = useState("");

    // This line was needed to update the pin value in the form for some reason it wasnt updating
    useEffect(() => {
        setFocus("pin");
    }, [pin, setFocus]);

    // Used to control the keypad
    const handleDigitClick = (digit) => {
        setPin((prevPin) => prevPin + digit);
    };
    // Used to clear the Keypad
    const handleClearClick = () => {
        setPin("");
    };

    // Used to reset the form
    const resetForm = () => {
        reset();
        setPin("");
    };

    // This is the function that is called when the form is submitted
    const submitHandler = async (data) => {
        try {
            const response = await axios.post(
                `${LOCKER_URL}/cabinet/pickup`,
                data,
            );
            const status = response.data.status;

            if (status === "success") {
                openModal();
            }
        } catch (error) {
            if (error.response) {
                const message = error.response.data.message;
                if (message.includes("No parcel found")) {
                    setError("pin", {
                        type: "manual",
                        message: message.slice(0, -1),
                    });
                } else if (message.includes("You are in the wrong location.")) {
                    setError("location", {
                        type: "manual",
                        message: message,
                    });

                    openModal();
                }
            } else {
                setError("type", {
                    type: "manual",
                    message: "Error connecting to server, try again later",
                });
            }
        }
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
                        readOnly
                        {...register("pin")}
                        value={pin}
                        className="mb-1 w-1/3 self-center rounded-md border text-center text-xl text-black focus:outline-none"
                    />
                    <span
                        role="alert"
                        className="text-danger-main mb-5 self-center text-sm"
                    >
                        {errors.pin?.message}
                        {errors.type?.message}
                    </span>
                    <input
                        type="text"
                        value={location}
                        readOnly
                        {...register("cabinet_location")}
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
            <Modal
                closeModal={closeModal}
                isOpen={isModalOpen}
                resetForm={resetForm}
                message={errors.location?.message}
                type={type}
            />
        </section>
    );
};

export default PickupPage;
