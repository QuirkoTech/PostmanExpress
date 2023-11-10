import { useForm } from "react-hook-form";
import { Button, Input } from "../components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";
import { DevTool } from "@hookform/devtools";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    // Yup validation schema for form validation
    const schema = yup.object({
        email: yup
            .string()
            .email("Email format is not valid")
            .required("This field is required"),
        password: yup.string().required("This field is required"),
    });

    const {
        register,
        handleSubmit,
        control,
        setError,
        formState: { errors, isSubmitSuccessful, isSubmitting },
        setFocus,
    } = useForm({
        resolver: yupResolver(schema),
    });

    // Set focus on email input on page load
    useEffect(() => {
        setFocus("email");
    }, [setFocus]);



    // Filler handler for form submission for test purposes
    const submitHandler = async (data) => {
        try {
            const response = await fetch("https://reqres.in/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                }),
            });

            if (response.ok) {
                // Successful response
                return;
            } else {
                // Handle different HTTP status codes
                if (response.status === 400) {
                    setError("email", {
                        type: "manual",
                        message: "Invalid email or password",
                    });
                    console.log("set custom");
                }
            }
        } catch (error) {
            console.log("Error:", error);

            // Additional error handling if needed
        }
    };

    // // Reroute to home page after successful login
    // const navigate = useNavigate();
    // useEffect(() => {
    //     if (isSubmitSuccessful) {
    //         reset();
    //         navigate("/");
    //     }
    // }, [isSubmitSuccessful, reset, navigate]);

    console.log(isSubmitSuccessful);
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
                        className="flex flex-col items-center text-lg"
                        noValidate
                    >
                        <h2 className=" pb-5 pt-20 text-lg text-white ">
                            Customer Log In
                        </h2>
                        <Input
                            type="email"
                            placeHolder="Email"
                            register={{
                                ...register("email"),
                            }}
                            errorMessage={errors.email?.message}
                        />
                        <Input
                            type="password"
                            placeHolder="Password"
                            register={{ ...register("password") }}
                            errorMessage={errors.password?.message}
                        />

                        <Button />
                    </form>
                    <DevTool control={control} />
                    <p className="mt-9 whitespace-nowrap text-lg">
                        Don't have an account yet?{" "}
                        <Link to="/signup" className="text-white">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Login;
