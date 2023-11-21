import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-primary flex h-[100vh] flex-col items-center justify-center text-white">
            <div className="mx-auto my-0 max-w-screen-lg text-center">
                <img
                    src="/404.png"
                    alt="notfound"
                    className="mb-10 ml-auto mr-auto mt-0 max-w-[250px]"
                />
                <h1 className="mb-5 text-6xl font-bold">
                    {" "}
                    Oops, looks like you're lost.
                </h1>
                <p className="mb-10  ml-auto mr-auto mt-0 max-w-4xl">
                    Maybe this page used to exist or you just spelled something
                    wrong. So can you double check the URL?
                </p>
                <button
                    onClick={() => navigate(-1)}
                    className="bg-dark-secondary hover:text-dark-secondary inline-block rounded-lg px-8 py-4  font-medium hover:bg-white"
                >
                    Go back
                </button>
            </div>
        </div>
    );
};

export default NotFoundPage;
