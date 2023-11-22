import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../auth";
import { useNavigate } from "react-router-dom";

function Modal({ isOpen, closeModal, name, menuLinks, className }) {
    const { fetchUser } = useContext(AuthContext);

    // Backend URL for the consumer app
    const CONSUMER_URL = import.meta.env.VITE_CONSUMER_BACKEND_URL;
    const navigate = useNavigate();
    //Signout function
    const handleSignOut = async () => {
        try {
            const response = await axios.post(
                `${CONSUMER_URL}/auth/logout`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                },
            );

            const message = response.data.status;

            if (message === "success") {
                fetchUser();
                // When it log out successfully, it need to navigate to /login or /signup, if there's no navigate, it'll occur a bug, I don't know why
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <nav className={` ${className}`}>
            <div className={`modal-container ${className}`}>
                <ul className="border-b-2 border-solid border-[#494844]">
                    <li className="mb-4 w-full border-b-2 border-solid border-[#494844] pb-5 text-lg font-medium text-white">
                        <div className="w-40 overflow-hidden overflow-ellipsis whitespace-nowrap">
                            {name}
                        </div>
                        <button
                            onClick={closeModal}
                            className="absolute right-2 top-4 cursor-pointer border-none bg-transparent p-2 px-4 text-white transition-all hover:border-none hover:text-red-500 focus:outline-none"
                        >
                            <FontAwesomeIcon
                                className="h-5 w-5"
                                icon={faXmark}
                            />
                        </button>
                    </li>
                    {menuLinks.map((link, index) => (
                        <li
                            key={index}
                            className="my-5 text-lg font-normal text-white"
                        >
                            <a className="text-white" href={link.url}>
                                {link.title}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className=" flex flex-col ">
                    <button
                        onClick={handleSignOut}
                        className="my-5 mr-auto cursor-pointer border-none bg-transparent p-0 text-lg font-medium text-[#C55B5B] transition-all hover:border-none focus:outline-none"
                    >
                        Log Out
                    </button>
                    <button
                        style={{ bottom: "5vh" }}
                        className="absolute left-6 cursor-pointer bg-transparent p-0 text-lg font-medium text-[#C55B5B] transition-all hover:border-none focus:outline-none"
                    >
                        Delete Account
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Modal;
