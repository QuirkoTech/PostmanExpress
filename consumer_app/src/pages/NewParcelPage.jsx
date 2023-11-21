import Layout from "../components/layout/Layout";
import { Button } from "../components";

const ParcelAddNew = [
    {
        title: "Content",
        placeholder: "Package Name",
        measure: "Optional",
        type: "text",
    },
    {
        title: "Recipient",
        placeholder: "Recipient's Email",
        measure: "",
        type: "text",
    },
    {
        title: "Weight",
        placeholder: "Input a number",
        measure: "Kg",
        type: "text",
    },
    {
        title: "Height",
        placeholder: "Input a number",
        measure: "m",
        type: "text",
    },
    {
        title: "Width",
        placeholder: "Input a number",
        measure: "m",
        type: "text",
    },
    {
        title: "Length",
        placeholder: "Input a number",
        measure: "m",
        type: "text",
    },
];

const NewParcelPage = () => {
    return (
        <div className=" relative flex min-h-screen flex-col">
            <Layout>
                <div className="ml-20 max-w-[600px]">
                    <div className="my-10">
                        <h1 className=" text-4xl font-normal text-white">
                            New Parcel
                        </h1>
                    </div>
                    <form className="flex flex-col">
                        {ParcelAddNew.map((field, index) => (
                            <label
                                key={index}
                                htmlFor={`input-${index}`}
                                className="mb-6 ml-10 grid grid-cols-3 items-center text-lg"
                            >
                                {field.title}:
                                <input
                                    className=" bg-dark-secondary border-slate-blue -ml-20 rounded-lg border-2 border-solid px-4"
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    id={`input-${index}`}
                                />
                                <span className="ml-4 text-xs">
                                    {field.measure}
                                </span>
                            </label>
                        ))}

                        <Button className="mb-10 mr-[188px] mt-4"></Button>
                    </form>
                </div>
            </Layout>
        </div>
    );
};

export default NewParcelPage;
