import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Input } from "../components";
import axios from "axios";

const Login = () => {
    // Backend URL for the driver app
    const DRIVER_URL = import.meta.env.VITE_DRIVER_BACKEND_URL;

    // Yup validation schema for form validation
    const schema = yup.object({
        driver_email: yup
            .string()
            .email("Email format is not valid")
            .required("This field is required"),
        password: yup.string().required("This field is required"),
    });

    const {
        register,
        handleSubmit,
        setError,
        reset,
        formState: { errors, isSubmitSuccessful, isSubmitting },
        setFocus,
    } = useForm({
        resolver: yupResolver(schema),
    });

    // Set focus on email input on page load
    useEffect(() => {
        setFocus("driver_email");
    }, [setFocus]);

    // Function to handle form submission
    const submitHandler = async (data) => {
        try {
            const response = await axios.post(
                `${DRIVER_URL}/auth/login`,
                data,
                { withCredentials: true },
            );

            const message = response.data.status;

            if (message === "success") {
                reset();
            }
        } catch (error) {
            if (error.response) {
                // Handling specific API response errors
                const message = error.response.data.message;
                if (message === "No driver found with this email.") {
                    setError("driver_email", {
                        type: "manual",
                        message: "No user found with this email",
                    });
                } else if (message === "Invalid credentials.") {
                    setError("password", {
                        type: "manual",
                        message: "Invalid password",
                    });
                } else {
                    setError("driver_email", {
                        type: "manual",
                        message:
                            "Something went wrong with the request, try again later",
                    });
                }
            } else {
                // Handling network errors or other unhandled errors
                console.error("Network error:", error.message);
                setError("driver_email", {
                    type: "manual",
                    message: "Error connecting to server, try again later",
                });
            }
        }
    };

    // Reroute to home page after successful login
    const navigate = useNavigate();
    useEffect(() => {
        if (isSubmitSuccessful) {
            navigate("/", { replace: true });
            reset();
        }
    }, [isSubmitSuccessful, reset, navigate]);

    return (
        <section className="padding">
            <div className="max-container">
                <h1 className="mt-14 text-center text-5xl text-white ">
                    PostmanExpress
                </h1>
                <div className="mx-auto w-64">
                    <form
                        className="flex flex-col items-center text-lg"
                        onSubmit={handleSubmit(submitHandler)}
                        noValidate
                    >
                        <h2 className=" pb-5 pt-20 text-lg text-white ">
                            Driver Log In
                        </h2>
                        <Input
                            type="email"
                            register={{
                                ...register("driver_email"),
                            }}
                            placeHolder="Email"
                            errorMessage={errors.driver_email?.message}
                        />
                        <Input
                            type="password"
                            placeHolder="Password"
                            register={{ ...register("password") }}
                            errorMessage={errors.password?.message}
                        />

                        <Button type="submit" disabled={isSubmitting} />
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Login;
