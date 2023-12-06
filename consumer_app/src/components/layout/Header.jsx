import Modal from "../modal/Modal";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CustomNotification } from "../";
import { AuthContext } from "../auth";
import { toast } from "react-toastify";

const menuLinks = [
    {
        url: "/",
        title: "My Parcels",
    },
    {
        url: "/new",
        title: "New Parcels",
    },
    {
        url: "/history",
        title: "Parcel History",
    },
];

const Header = () => {
    const { userName, notifications } = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Display notifications
    useEffect(() => {
        notifications.map((notification) => {
            toast(
                <CustomNotification
                    key={notification.parcel_id}
                    id={notification.parcel_id}
                    title={notification.title}
                    name={notification.parcel_name}
                />,
                {
                    autoClose: false,
                    position: "top-left",
                    closeOnClick: false,
                },
            );
        });
    }, [notifications]);

    return (
        <header className="bg-dark-secondary sm-max:px-8 sm-max:py-4 sm-max:text-xl xxs-max:px-4 relative z-50 flex h-[72px] w-full items-center px-10 py-5 text-2xl shadow-lg">
            <Link to="/" className="text-white">
                PostmanExpress
            </Link>

            <button
                className="z-1 relative ml-auto border-none bg-transparent transition-all duration-300 hover:text-white"
                onClick={openModal}
            >
                Menu
            </button>

            <Modal
                isOpen={isModalOpen}
                closeModal={closeModal}
                name={userName}
                menuLinks={menuLinks}
            />
        </header>
    );
};

export default Header;
