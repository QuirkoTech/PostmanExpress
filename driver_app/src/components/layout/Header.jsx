import Modal from '../modal/Modal';
import React, { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

const menuLinks = [
    {
        url: '/my-parcels',
        title: 'My Parcels',
    },
    {
        url: '/new-parcels',
        title: 'New Parcel',
    },
    {
        url: '/parcel-history',
        title: 'Parcel history',
    },
];

const Header = () => {
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
        <div className={`shadow-lg z-50 bg-dark-secondary`}>
            <div className="container flex items-center w-full h-[72px] py-5 px-0 transition-transform duration-1000">
                <NavLink to="/">
                    <h1 className="text-2xl text-white">PostmanExpress</h1>
                </NavLink>
                <div className="ml-auto">
                    <button className="z-1 relative bg-transparent border-none text-white text-2xl" onClick={openModal}>
                        Menu
                    </button>
                    {isModalOpen && (
                        <div
                            className="fixed top-0 left-0 w-full h-full bg-black/60 flex justify-center items-center z-50"
                            onClick={handleModalClick}
                        >
                            <div
                                className="ml-auto w-1/6 h-full bg-dark-secondary border-l-2 border-l-white/5   border-solid p-6 rounded-r-lg shadow-lg"
                                ref={modalRef}
                            >
                                <Modal
                                    className=""
                                    isOpen={isModalOpen}
                                    closeModal={closeModal}
                                    name="Dang Hoang Ha"
                                    menuLinks={menuLinks}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
