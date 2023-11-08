import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const SignUp = () => {
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
                    >
                        <h2 className=" pb-5 pt-20 text-lg text-white ">
                            Customer Sign Up
                        </h2>
                        <input
                            type="text"
                            className="bg-dark-secondary rounded-low border-slate-blue mb-6 w-full border-2 px-5 py-1 focus:outline-none focus:ring-1"
                            placeholder="Full Name"
                            name="name"
                        />
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
                        <input
                            type="text"
                            className="bg-dark-secondary rounded-low border-slate-blue mb-6 w-full border-2 px-5 py-1 focus:outline-none focus:ring-1"
                            placeholder="Confirm Password"
                            name="ConfirmPassword"
                        />
                        <select
                            name="location"
                            id=""
                            className="bg-dark-secondary rounded-low border-slate-blue focus:ring-1.5 mb-9 w-full border-2 px-5 py-1 focus:outline-none"
                        >
                            <option value="oulu">Oulu</option>
                            <option value="helsinki">Helsinki</option>
                            <option value="turku">Turku</option>
                            <option value="tampere">Tampere</option>
                            <option value="espoo">Espoo</option>
                        </select>
                        <button className="rounded-low bg-green-main self-end px-7 py-1">
                            Apply
                        </button>
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
