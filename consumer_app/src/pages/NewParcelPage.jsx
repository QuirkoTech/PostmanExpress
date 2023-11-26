import React from "react";
import { useForm } from "react-hook-form";
import Layout from "../components/layout/Layout";
import { Button } from "../components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

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
        options: [
            "Warehouse",
            "Oulu",
            "Helsinki",
            "Turku",
            "Tampere",
            "Espoo",
            "Deleted",
        ],
    },
    {
        fieldName: "ship_from",
        title: "From",
        placeholder: "Recipient's Address",
        measure: "",
        type: "select",
        options: [
            "Warehouse",
            "Oulu",
            "Helsinki",
            "Turku",
            "Tampere",
            "Espoo",
            "Deleted",
        ],
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
    parcel_name: yup.string().required("Package Name is required"),
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

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const selectOptionsMap = ParcelAddNew.reduce((map, field) => {
        if (field.type === "select" && field.options) {
            map[field.fieldName] = field.options;
        }
        return map;
    }, {});

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
                                    <select
                                        className={`bg-dark-secondary border-slate-blue -ml-20 rounded-lg border-2 border-solid px-4 ${
                                            errors[field.fieldName]
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                        {...register(field.fieldName)}
                                    >
                                        <option value="" disabled>
                                            {`Select ${field.title.toLowerCase()}`}
                                        </option>
                                        {(
                                            selectOptionsMap[field.fieldName] ||
                                            []
                                        ).map((option, optionIndex) => (
                                            <option
                                                key={optionIndex}
                                                value={option}
                                            >
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        className={`bg-dark-secondary border-slate-blue -ml-20 rounded-lg border-2 border-solid px-4 ${
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
