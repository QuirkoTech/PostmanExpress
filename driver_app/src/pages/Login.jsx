import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

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

                        <button className="rounded-low bg-green-main self-end px-7 py-1">
                            Apply
                        </button>
                    </form>
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
