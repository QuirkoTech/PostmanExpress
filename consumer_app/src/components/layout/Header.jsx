import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../modal/Modal";
import { AuthContext } from "../auth";

const menuLinks = [
    {
        url: "/",
        title: "Accepted Parcels",
    },
    {
        url: "/pending",
        title: "Available Parcel",
    },
];

const Header = () => {
    const { driverName } = useContext(AuthContext);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef();

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleModalClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            closeModal();
        }
    };

    return (
        <div
            className={`bg-dark-secondary relative z-50 flex  h-[72px] w-full items-center px-10 py-5 shadow-lg`}
        >
            <Link to="/" className="text-2xl text-white">
                PostmanExpress
            </Link>
            <div className="ml-auto">
                <button
                    className="z-1 relative ml-auto border-none bg-transparent text-2xl transition-all duration-300 hover:text-white "
                    onClick={openModal}
                >
                    Menu
                </button>

                <Modal
                    isOpen={isModalOpen}
                    closeModal={closeModal}
                    name={driverName}
                    menuLinks={menuLinks}
                    handleModalClick={handleModalClick}
                    modalRef={modalRef}
                />
            </div>
        </div>
    );
};

export default Header;
