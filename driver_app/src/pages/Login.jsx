import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Input } from "../components";
import axios from "axios";

const Login = () => {
    return (
        <section className="padding">
            <div className="max-container">
                <h1 className="mt-14 text-center text-5xl text-white ">
                    PostmanExpress
                </h1>
                <div className="mx-auto w-64">
                    <form
                        action=""
                        className="flex flex-col items-center text-lg"
                        noValidate
                    >
                        <h2 className=" pb-5 pt-20 text-lg text-white ">
                            Driver Log In
                        </h2>
                        <input
                            type="email"
                            className="bg-dark-secondary rounded-low border-slate-blue mb-6 w-full border-2 px-5 py-1 focus:outline-none focus:ring-1"
                            placeholder="Email"
                            name="email"
                        />
                        <input
                            type="text"
                            className="bg-dark-secondary rounded-low border-slate-blue mb-6 w-full border-2 px-5 py-1 focus:outline-none focus:ring-1"
                            placeholder="Password"
                            name="password"
                        />

                        <Button></Button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Login;
