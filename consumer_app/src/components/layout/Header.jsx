import Modal from "../modal/Modal";
import { useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Notifications } from "../";
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

// const notifdata = [
//     {
//         "title": "Status update",
//         "parcel_id": "495c17e3-e6e0-403c-93a1-5b79c09d4d13",
//         "parcel_status": "delivered",
//         "parcel_name": "Nike shoes"
//     },
//     {
//         "title": "Status update",
//         "parcel_id": "10552409-02fe-4749-ba02-dff2b6837766",
//         "parcel_status": "delivered",
//         "parcel_name": "Adidas jacket"
//     },
//     {
//         "title": "Status update",
//         "parcel_id": "415bd7a6-d2df-4a12-8e86-ae1887715ac2",
//         "parcel_status": "delivered",
//         "parcel_name": "Book collection"
//     },
//     {
//         "title": "Status update",
//         "parcel_id": "c007d841-df33-421e-abd5-b0a1e341b9ae",
//         "parcel_status": "delivered",
//         "parcel_name": "Shiny cup"
//     },
//     {
//         "title": "Status update",
//         "parcel_id": "22c445ca-af04-478e-82d6-4ab6fe84fc5b",
//         "parcel_status": "delivered",
//         "parcel_name": "Tech gadgets"
//     }
// ]

// {title: 'Status update', parcel_id: '22c445ca-af04-478e-82d6-4ab6fe84fc5b', parcel_status: 'delivered', parcel_name: 'Tech gadgets'}

const Header = () => {
    const { userName, notifications } = useContext(AuthContext);
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
        <header className="bg-dark-secondary relative z-50 flex  h-[72px] w-full items-center px-10 py-5 shadow-lg">
            <Link to="/" className="text-2xl text-white">
                PostmanExpress
            </Link>

            <button
                className="z-1 relative ml-auto border-none bg-transparent text-2xl transition-all duration-300 hover:text-white "
                onClick={openModal}
            >
                Menu
            </button>

            <Modal
                isOpen={isModalOpen}
                closeModal={closeModal}
                name={userName}
                menuLinks={menuLinks}
                handleModalClick={handleModalClick}
                modalRef={modalRef}
            />

            <Notifications notifications={notifications} />
        </header>
    );
};

export default Header;
