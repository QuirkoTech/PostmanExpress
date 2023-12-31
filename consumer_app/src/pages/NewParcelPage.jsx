import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "../components/layout/Layout";
import { Button } from "../components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { ChevronsUpDown } from "lucide-react";

const ParcelAddNew = [
    {
        fieldName: "parcel_name",
        title: "Content",
        placeholder: "Package Name",
        measure: "Optional",
        type: "text",
    },
    {
        fieldName: "recipient_email",
        title: "Recipient",
        placeholder: "Recipient's Email",
        measure: "",
        type: "text",
    },
    {
        fieldName: "ship_to",
        title: "Deliver to",
        placeholder: "Sender's Address",
        measure: "",
        type: "select",
        options: ["Oulu", "Helsinki", "Turku", "Tampere", "Espoo"],
    },
    {
        fieldName: "ship_from",
        title: "From",
        placeholder: "Recipient's Address",
        measure: "",
        type: "select",
        options: ["Oulu", "Helsinki", "Turku", "Tampere", "Espoo"],
    },
    {
        fieldName: "weight",
        title: "Weight",
        placeholder: "Input a number",
        measure: "Kg",
        type: "text",
    },
    {
        fieldName: "height",
        title: "Height",
        placeholder: "Input a number",
        measure: "m",
        type: "text",
    },
    {
        fieldName: "width",
        title: "Width",
        placeholder: "Input a number",
        measure: "m",
        type: "text",
    },
    {
        fieldName: "length",
        title: "Length",
        placeholder: "Input a number",
        measure: "m",
        type: "text",
    },
];

const schema = yup.object().shape({
    parcel_name: yup.string(),
    recipient_email: yup
        .string()
        .email("Invalid email format")
        .required("Recipient's Email is required"),
    ship_to: yup.string().required("Sender's Address is required"),
    ship_from: yup.string().required("Recipient's Address is required"),
    weight: yup
        .number()
        .typeError("Value must be a number")
        .required("Weight is required"),
    height: yup
        .number()
        .typeError("Value must be a number")
        .required("Height is required"),
    width: yup
        .number()
        .typeError("Value must be a number")
        .required("Width is required"),
    length: yup
        .number()
        .typeError("Value must be a number")
        .required("Length is required"),
});

const NewParcelPage = () => {
    const CONSUMER_URL = import.meta.env.VITE_CONSUMER_BACKEND_URL;

    const selectOptionsMap = ParcelAddNew.reduce((map, field) => {
        if (field.type === "select" && field.options) {
            map[field.fieldName] = field.options;
        }
        return map;
    }, {});

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema), mode: "onTouched" });

    useEffect(() => {
        setValue("To", "Select Destination");
        setValue("From", "Select Destination");
    }, [setValue]);

    const handleFormSubmit = async (data) => {
        const convertToLowerCase = (data) => {
            return {
                ...data,
                ship_to: data.ship_to.toLowerCase(),
                ship_from: data.ship_from.toLowerCase(),
            };
        };

        data = convertToLowerCase(data);

        try {
            const response = await axios.post(
                `${CONSUMER_URL}/parcels/new`,
                data,
                {
                    withCredentials: true,
                },
            );

            console.log(response.data.data.delivery_pin);
            toast.success(
                "Parcel created. Check your email for further instructions.",
            );
            reset();
        } catch (error) {
            console.error("Error creating parcel:", error.response.data);
            toast.error(
                error.response.data.message,
                // "An error occurred while creating the parcel.",
            );
            console.log(error.response.data.message);
        }
    };

    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isSmallScreen2, setIsSmallScreen2] = useState(false);
    const [isSmallScreen3, setIsSmallScreen3] = useState(false);
    useEffect(() => {
        function handleResize() {
            setIsSmallScreen(window.innerWidth <= 780);
        }

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        function handleResize() {
            setIsSmallScreen2(window.innerWidth <= 480);
        }

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        function handleResize() {
            setIsSmallScreen3(window.innerWidth <= 400);
        }

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    //Some issues when RD at < 520px, so I didn't make it, just ignored it :))
    return (
        <Layout>
            <h1 className=" sm-max:text-2xl sm-max:ml-4 xxs-max:ml-0 mb-9 text-4xl font-normal text-white">
                New Parcel
            </h1>

            <form
                className="sm-max:mx-auto xxs-max:ml-4 mx-10 flex w-3/4 flex-col"
                onSubmit={handleSubmit(handleFormSubmit)}
            >
                {ParcelAddNew.map((field, index) => (
                    <label
                        key={index}
                        htmlFor={`input-${index}`}
                        className=" lw-max:text-sm mb-6  grid grid-cols-5 items-center gap-x-4 text-lg"
                    >
                        {field.title === "Deliver to" && isSmallScreen
                            ? "To"
                            : field.title}
                        :
                        {field.type === "select" ? (
                            <div className=" mb-max:ml-8 lw-max:w-full relative  col-span-3  ml-4 ">
                                <select
                                    className={`bg-dark-secondary lw-max:ml-4 border-slate-blue mb-max:text-base lw-max:text-sm mb-max:leading-7 w-full cursor-pointer select-none appearance-none rounded-lg border-2 border-solid 
                                        px-4 py-1 focus:outline-none focus:ring-1 ${
                                            errors[field.fieldName]
                                                ? " border-red-500"
                                                : ""
                                        } 
                                        `}
                                    {...register(field.fieldName, {
                                        value: "",
                                        placeholder: "Select Destination",
                                    })}
                                >
                                    <option value="" disabled selected hidden>
                                        Select Destination
                                    </option>
                                    {(
                                        selectOptionsMap[field.fieldName] || []
                                    ).map((option, optionIndex) => (
                                        <option
                                            key={optionIndex}
                                            value={option}
                                            className=""
                                        >
                                            {option}
                                        </option>
                                    ))}
                                </select>

                                {isSmallScreen2 ? (
                                    ""
                                ) : (
                                    <ChevronsUpDown
                                        size={24}
                                        className="stroke-slate-blue absolute right-2 top-2"
                                    />
                                )}
                            </div>
                        ) : (
                            <input
                                className={` mb-max:ml-8 lw-max:ml-12 lw-max:text-sm mb-max:text-base mb-max:leading-7 lw-max:w-full bg-dark-secondary sm-max:ml-4 border-slate-blue col-span-3 ml-4 appearance-none rounded-lg border-2 border-solid px-4 py-1 focus:outline-none focus:ring-1 ${
                                    errors[field.fieldName]
                                        ? " border-red-500"
                                        : ""
                                }`}
                                type={field.type}
                                placeholder={field.placeholder}
                                id={`input-${index}`}
                                {...register(field.fieldName)}
                            />
                        )}
                        {isSmallScreen3 ? (
                            ""
                        ) : (
                            <span className="text-xs">{field.measure}</span>
                        )}
                        {errors[field.fieldName] && (
                            <p className="text-danger-main mb-max:ml-8 lw-max:ml-12 lw-max:text-xxs xxs-max:ml-12 col-span-2 col-start-2 ml-5 mt-1 whitespace-nowrap text-xs">
                                {errors[field.fieldName]?.message}
                            </p>
                        )}
                    </label>
                ))}

                <Button
                    type="submit"
                    className="mb-max:mx-auto mr-[150px] mt-4"
                >
                    Apply
                </Button>
            </form>
        </Layout>
    );
};

export default NewParcelPage;
