import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../auth";
import DeleteModal from "./DeleteModal";
import Overlay from "./Overlay";

function Modal({ isOpen, closeModal, name, menuLinks }) {
    const { fetchUser } = useContext(AuthContext);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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

    const handleDeleteAccount = async () => {
        try {
            const response = await axios.delete(`${CONSUMER_URL}/me`, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            const message = response.data.status;

            if (message === "success") {
                fetchUser();
            }
        } catch (error) {
            toast.error("Something went wrong with the request");
        }
    };

    const openDeleteModal = () => {
        setIsDeleteModalOpen(true);
        closeModal();
    };

    return (
        <>
            <Overlay isOpen={isOpen} onClose={closeModal}>
                <nav
                    className={`bg-dark-secondary xl-max:w-3/12 md-max:w-4/12 sm-max:w-[44%] sm-max:px-3 sm-max:text-base ml-auto flex h-full
                w-1/6 transform flex-col border-l-2 border-solid border-l-white/5 p-6 text-lg shadow-lg transition-transform duration-300 ease-linear ${
                    isOpen
                        ? "translate-x-0 transform"
                        : "translate-x-full transform"
                } `}
                    onClick={(e) => e.stopPropagation()}
                >
                    <ul className="border-b-2 border-solid border-[#494844]">
                        <li className="mb-4 w-full border-b-2 border-solid border-[#494844] pb-5 font-medium text-white">
                            <div className="w-[70%] overflow-hidden overflow-ellipsis whitespace-nowrap">
                                {name}
                            </div>
                            <button
                                onClick={closeModal}
                                className="absolute right-2 top-4 cursor-pointer border-none bg-transparent p-2 px-4 text-white transition-all 
                                duration-300 hover:border-none hover:text-red-500 active:scale-90"
                            >
                                <FontAwesomeIcon
                                    className="sm-max:h-4 sm-max:w-4 h-5 w-5"
                                    icon={faXmark}
                                />
                            </button>
                        </li>
                        {menuLinks.map((link, index) => (
                            <li
                                key={index}
                                className="sm-max:my-4 my-5 font-normal text-white"
                            >
                                <NavLink
                                    className={({ isActive }) =>
                                        `text-slate-gray transition-all duration-300 hover:text-white ${
                                            isActive
                                                ? "font-medium text-white"
                                                : ""
                                        }`
                                    }
                                    to={link.url}
                                >
                                    {link.title}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    <button
                        onClick={handleSignOut}
                        className="text-danger-main hover:text-danger-secondary sm-max:my-4 my-5 mr-auto cursor-pointer border-none bg-transparent font-medium transition-all
                    duration-300 hover:border-none"
                    >
                        Log Out
                    </button>
                    <button
                        onClick={openDeleteModal}
                        className="text-danger-main hover:text-danger-secondary mb-6 mr-auto mt-auto cursor-pointer border-none bg-transparent font-medium
                        transition-all duration-300 hover:border-none whitespace-nowrap"
                    >
                        Delete Account
                    </button>
                </nav>
            </Overlay>
            <DeleteModal
                isOpen={isDeleteModalOpen}
                closeModal={() => setIsDeleteModalOpen(false)}
                onDelete={handleDeleteAccount}
            />
        </>
    );
}

export default Modal;
