import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../auth";
import { Link } from "react-router-dom";

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
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="fixed left-0 top-0 z-50 h-full w-full bg-black/60"
            onClick={handleModalClick}
        >
            <nav
                className="bg-dark-secondary xl-max:w-3/12 md-max:w-4/12 sm-max:w-5/12 sm-max:px-3 sm-max:text-base ml-auto flex h-full
                    w-1/6 flex-col border-l-2 border-solid border-l-white/5 p-6 text-lg shadow-lg"
                ref={modalRef}
            >
                <ul className="border-b-2 border-solid border-[#494844]">
                    <li className="mb-4 w-full border-b-2 border-solid border-[#494844] pb-5 font-medium text-white">
                        <div className="w-40 overflow-hidden overflow-ellipsis whitespace-nowrap">
                            {name}
                        </div>
                        <button
                            onClick={closeModal}
                            className="absolute right-2 top-[25px] cursor-pointer border-none bg-transparent px-4 text-white transition-all 
                                duration-300 hover:border-none hover:text-red-500 active:scale-90"
                        >
                            <FontAwesomeIcon
                                className="h-5 sm-max:h-4 w-5 sm-max:w-4"
                                icon={faXmark}
                            />
                        </button>
                    </li>
                    {menuLinks.map((link, index) => (
                        <li
                            key={index}
                            className="sm-max:my-4 my-5 font-normal text-white"
                        >
                            <Link
                                className="text-slate-gray transition-all duration-300 hover:text-white"
                                to={link.url}
                            >
                                {link.title}
                            </Link>
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
