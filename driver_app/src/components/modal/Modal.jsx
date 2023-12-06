import { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../auth";

function Modal({
    isOpen,
    closeModal,
    name,
    menuLinks,
    handleModalClick,
    modalRef,
}) {
    const DRIVER_URL = import.meta.env.VITE_DRIVER_BACKEND_URL;

    const { fetchDriver } = useContext(AuthContext);
    const navigate = useNavigate();
    //Signout function
    const handleSignOut = async () => {
        try {
            const response = await axios.post(
                `${DRIVER_URL}/auth/logout`,
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
                fetchDriver();
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "unset";
    }, [isOpen]);

    return (
        <div
            className={`linear fixed left-0 top-0 z-50 h-full w-full transition-all duration-500 ${
                isOpen
                    ? "bg-black/60 backdrop-blur-sm"
                    : " pointer-events-none opacity-0"
            }`}
            onClick={handleModalClick}
        >
            <nav
                className={`bg-dark-secondary xl-max:w-3/12 md-max:w-4/12 sm-max:w-[44%] sm-max:px-3 sm-max:text-base ml-auto flex h-full
                    w-1/6 flex-col border-l-2 border-solid border-l-white/5 p-6 text-lg shadow-lg transition-transform duration-300 ease-linear ${
                        isOpen
                            ? "translate-x-0 transform"
                            : "translate-x-full transform"
                    }`}
                ref={modalRef}
            >
                <ul className="border-b-2 border-solid border-[#494844]">
                    <li className="mb-4 w-full border-b-2 border-solid border-[#494844] pb-5 text-white">
                        <div className="w-[70%] overflow-hidden overflow-ellipsis whitespace-nowrap">
                            {name}
                        </div>
                        <button
                            onClick={closeModal}
                            className="absolute right-2 top-[25px] cursor-pointer border-none bg-transparent px-4 text-white transition-all 
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
                            className="sm-max:my-4 my-5 font-normal"
                        >
                            <NavLink
                                className={({ isActive }) =>
                                    `text-slate-gray transition-all duration-300 hover:text-white ${
                                        isActive ? "font-medium text-white" : ""
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
            </nav>
        </div>
    );
}

export default Modal;
