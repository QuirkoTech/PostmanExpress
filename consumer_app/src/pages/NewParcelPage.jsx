import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { Button } from "../components";
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

const convertToSnakeCase = (camelCaseString) => {
    return camelCaseString.replace(
        /([A-Z])/g,
        (match) => `_${match.toLowerCase()}`,
    );
};

const NewParcelPage = () => {
    const CONSUMER_URL = import.meta.env.VITE_CONSUMER_BACKEND_URL;

    const [formData, setFormData] = useState({
        parcel_name: "",
        recipient_email: "",
        ship_to: "",
        ship_from: "",
        weight: "",
        height: "",
        width: "",
        length: "",
    });

    const handleInputChange = (fieldName, value) => {
        // Chuyển đổi tên trường để đảm bảo chúng khớp với định dạng của server (snake_case)
        const serverFieldName = convertToSnakeCase(fieldName);

        setFormData({ ...formData, [serverFieldName]: value.toLowerCase() });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const lowercaseShipFrom = formData.ship_from.toLowerCase();
        const lowercaseShipTo = formData.ship_to.toLowerCase();

        const validShipFrom = ParcelAddNew.find(
            (field) => field.fieldName === "ship_from",
        )
            ?.options.map((option) => option.toLowerCase())
            .includes(lowercaseShipFrom);

        const validShipTo = ParcelAddNew.find(
            (field) => field.fieldName === "ship_to",
        )
            ?.options.map((option) => option.toLowerCase())
            .includes(lowercaseShipTo);

        console.log("Valid Ship From:", validShipFrom);
        console.log("Valid Ship To:", validShipTo);

        if (!validShipFrom || !validShipTo) {
            console.error("Invalid value for ship_from or ship_to");
            console.log("Form Data:", formData);
            return;
        }
        try {
            const response = await axios.post(
                `${CONSUMER_URL}/parcels/new`,
                formData,
                {
                    withCredentials: true,
                },
            );

            // Handle the response as needed
            console.log(response.data);
            toast.success(
                "Parcel created. Check your email for further instructions.",
            );
        } catch (error) {
            // Handle errors
            console.error("Error creating parcel:", error.response.data);
            toast.error(
                error.response.data.message ||
                    "An error occurred while creating the parcel.",
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
                    <form className="flex flex-col" onSubmit={handleFormSubmit}>
                        {ParcelAddNew.map((field, index) => (
                            <label
                                key={index}
                                htmlFor={`input-${index}`}
                                className="mb-6 ml-10 grid grid-cols-3 items-center text-lg"
                            >
                                {field.title}:
                                {field.type === "select" ? (
                                    <select
                                        className="bg-dark-secondary border-slate-blue -ml-20 rounded-lg border-2 border-solid px-4"
                                        id={`input-${index}`}
                                        onChange={(e) =>
                                            handleInputChange(
                                                field.fieldName,
                                                e.target.value,
                                            )
                                        }
                                        defaultValue={
                                            formData.ship_from ||
                                            formData.ship_to
                                        }
                                    >
                                        <option value="" disabled selected>
                                            Select destination
                                        </option>
                                        {field.options.map(
                                            (option, optionIndex) => (
                                                <option
                                                    key={optionIndex}
                                                    value={option}
                                                >
                                                    {option}
                                                </option>
                                            ),
                                        )}
                                    </select>
                                ) : (
                                    <input
                                        className="bg-dark-secondary border-slate-blue -ml-20 rounded-lg border-2 border-solid px-4"
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        id={`input-${index}`}
                                        onChange={(e) =>
                                            handleInputChange(
                                                field.fieldName,
                                                e.target.value,
                                            )
                                        }
                                    />
                                )}
                                <span className="ml-4 text-xs">
                                    {field.measure}
                                </span>
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
