import Modal from "../modal/Modal";
import { useRef, useState, useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../auth";

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

// {title: 'Status update', parcel_id: '22c445ca-af04-478e-82d6-4ab6fe84fc5b', parcel_status: 'delivered', parcel_name: 'Tech gadgets'}

const Header = () => {
    const { userName, notifications } = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef();

    console.log(notifications);

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
        <header className={`bg-dark-secondary z-50 shadow-lg`}>
            <div className=" flex h-[72px] w-full items-center px-0 py-5 transition-transform duration-1000">
                <NavLink to="/">
                    <h1 className="ml-10 text-2xl text-white">
                        PostmanExpress
                    </h1>
                </NavLink>
                <div className="ml-auto">
                    <button
                        className="z-1 relative mr-10 border-none bg-transparent text-2xl text-white"
                        onClick={openModal}
                    >
                        Menu
                    </button>
                    {isModalOpen && (
                        <div
                            className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/60"
                            onClick={handleModalClick}
                        >
                            <div
                                className="bg-dark-secondary ml-auto h-full w-1/6 rounded-r-lg rounded-br-none rounded-tr-none border-l-2 border-solid border-l-white/5 p-6 shadow-lg"
                                ref={modalRef}
                            >
                                <Modal
                                    className=""
                                    isOpen={isModalOpen}
                                    closeModal={closeModal}
                                    name={userName}
                                    menuLinks={menuLinks}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="absolute flex flex-col gap-2 text-base ">
                <div className="bg-dark-secondary rounded-max border-slate-blue grid w-[260px] grid-cols-2 grid-rows-2 border-2 px-6 py-4">
                    <h2 className="col-span-2 text-white mb-3">Parcel status update</h2>
                    <p>Nike Shoes</p>
                    <div className="flex "><div className="w-2 h-2 rounded-full bg-blue-600"></div> <p>On the way</p></div>
                </div>



                
            </div>
        </header>
    );
};

export default Header;
