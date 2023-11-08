import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { DevTool } from "@hookform/devtools";
import { ChevronsUpDown } from "lucide-react";
import { useEffect } from "react";
import Input from "../components/Input";

let renderCount = 0;

const SignUp = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitSuccessful },
        isValidating,
        watch,
        setFocus,
        reset,
    } = useForm({ mode: "onTouched", defaultValues: { location: "" } });

    const navigate = useNavigate();
    const password = watch("password");

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
            navigate("/login");
        }
    }, [isSubmitSuccessful, reset, navigate]);

    renderCount++;
    console.log(isSubmitSuccessful);

    const submitHandler = (data) => {
        console.log(data);
    };

    useEffect(() => {
        setFocus("name");
    }, [setFocus]);

    const locationValue = watch("location");
    return (
        <section className="padding">
            <div className="max-container">
                <h1 className="mt-14 text-center text-5xl text-white ">
                    PostmanExpress {renderCount}
                </h1>
                <div className="mx-auto w-64">
                    <form
                        onSubmit={handleSubmit(submitHandler)}
                        action=""
                        className="gap flex flex-col items-center text-lg"
                        noValidate
                    >
                        <h2 className=" pb-5 pt-20 text-lg text-white ">
                            Customer Sign Up
                        </h2>
                        <Input
                            type="text"
                            placeHolder="Full Name"
                            register={{
                                ...register("name", {
                                    required: {
                                        value: true,
                                        message: "This field is required",
                                    },
                                }),
                            }}
                            errorMessage={errors.name?.message}
                        />
                        <Input
                            type="email"
                            placeHolder="Email"
                            register={{
                                ...register("email", {
                                    pattern: {
                                        value: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]{2,}$/,
                                        message: "Invalid email format",
                                    },
                                    required: {
                                        value: true,
                                        message: "This field is required",
                                    },
                                    // custom validation need to replace with our own api
                                    validate: async (value) => {
                                        const reponse = await fetch(
                                            `https://jsonplaceholder.typicode.com/users?email=${value}`,
                                        );
                                        const data = await reponse.json();
                                        return (
                                            data.length == 0 ||
                                            "This email is already registered"
                                        );
                                    },
                                }),
                            }}
                            errorMessage={errors.email?.message}
                        />

                        <Input
                            type="password"
                            placeHolder="Password"
                            register={{
                                ...register("password", {
                                    required: {
                                        value: true,
                                        message: "This field is required",
                                    },
                                    minLength: {
                                        value: 7,
                                        message:
                                            "Password must be at least 7 characters",
                                    },
                                }),
                            }}
                            errorMessage={errors.password?.message}
                        />

                        <Input
                            type="password"
                            placeHolder="Confirm Password"
                            register={{
                                ...register("confirmPassword", {
                                    required: {
                                        value: true,
                                        message: "This field is required",
                                    },
                                }),
                            }}
                            errorMessage={errors.confirmPassword?.message}
                        />

                        <div className="relative w-full">
                            <select
                                {...register("location", {
                                    required: {
                                        value: true,
                                        message: "This field is required",
                                    },
                                })}
                                id=""
                                className={`custom-select ${
                                    locationValue === "" ? "opacity-70" : ""
                                }`}
                                autoComplete="off"
                            >
                                <option value="" hidden disabled>
                                    Choose a location
                                </option>
                                <option value="oulu">Oulu</option>
                                <option value="helsinki">Helsinki</option>
                                <option value="turku">Turku</option>
                                <option value="tampere">Tampere</option>
                                <option value="espoo">Espoo</option>
                            </select>
                            <ChevronsUpDown className="stroke-slate-blue absolute right-2 top-2 " />
                            <p className="text-danger-main mb-9 self-start text-sm">
                                {errors.location?.message}
                            </p>
                        </div>

                        <button
                            type="submit"
                            className="rounded-low bg-green-main self-end px-7 py-1"
                            disabled={isValidating}
                        >
                            Apply
                        </button>
                    </form>
                    <DevTool control={control} />
                    <p className="mt-9 text-lg">
                        Already have an account?{" "}
                        <Link to="/login" className="text-white">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default SignUp;
