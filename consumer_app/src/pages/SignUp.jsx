import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ChevronsUpDown } from "lucide-react";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Input } from "../components";
import axios from "axios";

const SignUp = () => {
    // Backend URL
    const CONSUMER_URL = import.meta.env.VITE_CONSUMER_BACKEND_URL;

    // Yup validation schema for form validation
    const schema = yup.object({
        username: yup
            .string()
            .required("This field is required")
            .test(
                "two-names",
                "Two names is required, with two characters or more",
                (value) => {
                    const names = value.split(" ");
                    if (names.length < 2) {
                        return false;
                    }
                    const [firstName, lastName] = names;
                    const namesHas2Chars =
                        firstName.trim().length >= 2 &&
                        lastName.trim().length >= 2;
                    return namesHas2Chars;
                },
            )
            .test(
                "no-special-characters",
                "Names must not contain numbers or special characters",
                (value) => {
                    const hasSpecialCharacters = /[^a-zA-Z\s]/.test(value);
                    return !hasSpecialCharacters;
                },
            ),
        user_email: yup
            .string()
            .email("Email format is not valid")
            .required("This field is required"),
        password: yup
            .string()
            .required("This field is required")
            .min(7, "Password must be at least 7 characters"),
        password_confirm: yup
            .string()
            .oneOf([yup.ref("password"), null], "Passwords must match"),
        location: yup.string().required("This field is required"),
    });

    // React hook form
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitSuccessful, isSubmitting },
        watch,
        setFocus,
        reset,
    } = useForm({
        mode: "onTouched",
        defaultValues: { location: "" },
        resolver: yupResolver(schema),
    });

    // Used to re-route user
    const navigate = useNavigate();
    // If user is successfully registered, redirect to login page
    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
            navigate("/login");
        }
    }, [isSubmitSuccessful, reset, navigate]);

    // Function to handle form submission
    const submitHandler = async (data) => {
        try {
            const response = await axios.post(
                `${CONSUMER_URL}/auth/signup`,
                data,
                { withCredentials: true },
            );
            const message = response.data.status;

            if (message === "success") {
                reset();
            }
        } catch (error) {
            if (error.response) {
                const message = error.response.data.message;

                // Set error message for existing email
                if (message === "User with this email already exists.") {
                    setError("user_email", {
                        type: "manual",
                        message: "Email already exists",
                    });
                } else {
                    setError("username", {
                        type: "manual",
                        message:
                            "Something went wrong with the request, try again later",
                    });
                }
            } else {
                setError("username", {
                    type: "manual",
                    message: "Error connecting to server, try again later",
                });
            }
        }
    };

    // Set focus on username input on page load
    useEffect(() => {
        setFocus("username");
    }, [setFocus]);

    //Keep track of location value
    const locationValue = watch("location");
    return (
        <section className="padding">
            <div className="max-container">
                <h1 className="mt-14 text-center text-5xl text-white ">
                    PostmanExpress
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
                                ...register("username"),
                            }}
                            errorMessage={errors.username?.message}
                        />
                        <Input
                            type="email"
                            placeHolder="Email"
                            register={{
                                ...register("user_email"),
                            }}
                            errorMessage={errors.user_email?.message}
                        />
                        <Input
                            type="password"
                            placeHolder="Password"
                            register={{
                                ...register("password"),
                            }}
                            errorMessage={errors.password?.message}
                        />
                        <Input
                            type="password"
                            placeHolder="Confirm Password"
                            register={{
                                ...register("password_confirm"),
                            }}
                            errorMessage={errors.password_confirm?.message}
                        />
                        <div className="relative w-full">
                            <select
                                {...register("location")}
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
                        <Button type="submit" disabled={isSubmitting} />
                    </form>
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
