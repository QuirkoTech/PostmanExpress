import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "../components/layout/Layout";
import { Button } from "../components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { ChevronDown, ChevronUp } from "lucide-react";

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
        title: "To",
        placeholder: "Sender's Address",
        measure: "",
        type: "select",
        options: ["Warehouse", "Oulu", "Helsinki", "Turku", "Tampere", "Espoo"],
    },
    {
        fieldName: "ship_from",
        title: "From",
        placeholder: "Recipient's Address",
        measure: "",
        type: "select",
        options: ["Warehouse", "Oulu", "Helsinki", "Turku", "Tampere", "Espoo"],
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
    weight: yup.number().required("Weight is required"),
    height: yup.number().required("Height is required"),
    width: yup.number().required("Width is required"),
    length: yup.number().required("Length is required"),
});

const NewParcelPage = () => {
    const CONSUMER_URL = import.meta.env.VITE_CONSUMER_BACKEND_URL;

    const [isIconOpen, setIconOpen] = useState(true);

    const toggleIcon = () => {
        setIconOpen((prev) => !prev);
    };

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
    } = useForm({ resolver: yupResolver(schema) });

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

        console.log("Form Data:", data);

        try {
            const response = await axios.post(
                `${CONSUMER_URL}/parcels/new`,
                data,
                {
                    withCredentials: true,
                },
            );

            console.log(response.data);
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
        }
    };

    return (
        <div className="relative flex min-h-screen flex-col">
            <Layout>
                <div className="ml-20 max-w-[600px]">
                    <div className="my-10">
                        <h1 className="text-4xl font-normal text-white">
                            New Parcel
                        </h1>
                    </div>
                    <form
                        className="flex flex-col"
                        onSubmit={handleSubmit(handleFormSubmit)}
                    >
                        {ParcelAddNew.map((field, index) => (
                            <label
                                key={index}
                                htmlFor={`input-${index}`}
                                className="mb-6 ml-10 grid grid-cols-3 items-center text-lg"
                            >
                                {field.title}:
                                {field.type === "select" ? (
                                    <div className="relative right-20">
                                        <select
                                            className={`bg-dark-secondary border-slate-blue w-[268px] cursor-pointer select-none appearance-none rounded-lg border-2 border-solid pl-4 pr-8 focus:outline-none focus:ring-1 ${
                                                errors[field.fieldName]
                                                    ? "border-red-500"
                                                    : ""
                                            }`}
                                            {...register(field.fieldName, {
                                                value: "",
                                                placeholder:
                                                    "Select Destination",
                                            })}
                                        >
                                            <option value="" disabled selected>
                                                Select Destination
                                            </option>
                                            {(
                                                selectOptionsMap[
                                                    field.fieldName
                                                ] || []
                                            ).map((option, optionIndex) => (
                                                <option
                                                    key={optionIndex}
                                                    value={option}
                                                    className="cursor-pointer border-b-2 border-gray-300"
                                                >
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="text-slate-blue absolute inset-y-0 -right-20 flex cursor-pointer items-center px-2">
                                            {isIconOpen ? (
                                                <ChevronDown
                                                    size={24}
                                                    onClick={toggleIcon}
                                                />
                                            ) : (
                                                <ChevronUp
                                                    size={24}
                                                    onClick={toggleIcon}
                                                />
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <input
                                        className={`bg-dark-secondary border-slate-blue -ml-20 appearance-none rounded-lg border-2 border-solid px-4 focus:outline-none focus:ring-1 ${
                                            errors[field.fieldName]
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        id={`input-${index}`}
                                        {...register(field.fieldName)}
                                    />
                                )}
                                <span className="ml-4 text-xs">
                                    {field.measure}
                                </span>
                                {errors[field.fieldName] && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors[field.fieldName]?.message}
                                    </p>
                                )}
                            </label>
                        ))}

                        <Button type="submit" className="mb-10 mr-[188px] mt-4">
                            Apply
                        </Button>
                    </form>
                </div>
            </Layout>
        </div>
    );
};

export default NewParcelPage;
