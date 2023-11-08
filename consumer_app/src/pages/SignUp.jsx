import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { DevTool } from "@hookform/devtools";
import { ChevronsUpDown } from "lucide-react";
import { useEffect } from "react";
import Input from "../components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
let renderCount = 0;
import { Button } from "../components/button";

const SignUp = () => {
    // Yup validation schema for form validation
    const schema = yup.object({
        name: yup.string().required("This field is required"),
        email: yup
            .string()
            .email("Email format is not valid")
            .required("This field is required"),
        password: yup
            .string()
            .required("This field is required")
            .min(7, "Password must be at least 7 characters"),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("password"), null], "Passwords must match"),
        location: yup.string().required("This field is required"),
    });

    const {
        register,
        handleSubmit,
        control,
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

    const navigate = useNavigate();

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
            navigate("/login");
        }
    }, [isSubmitSuccessful, reset, navigate]);

    renderCount++;
    console.log(isSubmitting);

    const checkEmailExists = async (email) => {
        try {
            const response = await fetch(
                `https://jsonplaceholder.typicode.com/users?email=${email}`,
            );
            const data = await response.json();
            if (data.length > 0) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
        }
    };

    const submitHandler = async (data) => {
        try {
            const emailExists = await checkEmailExists(data.email);
            if (emailExists) {
                setError("email", {
                    type: "manual",
                    message: "Email already exists",
                });
            } else {
                console.log(data, "Data submitted");
            }
        } catch (error) {
            console.log(error);
        }
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
                                ...register("name"),
                            }}
                            errorMessage={errors.name?.message}
                        />
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
                            register={{
                                ...register("password"),
                            }}
                            errorMessage={errors.password?.message}
                        />
                        <Input
                            type="password"
                            placeHolder="Confirm Password"
                            register={{
                                ...register("confirmPassword"),
                            }}
                            errorMessage={errors.confirmPassword?.message}
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
                        <button
                            type="submit"
                            className="rounded-low bg-green-main self-end px-7 py-1"
                            disabled={isSubmitting}
                        >
                            Apply
                        </button>
                        {/* < Button type="submit" disabled={isValidating} /> */}
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
