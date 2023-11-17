import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Notification = ({ title, link, name }) => {
    const [isModalOpen, setIsModalOpen] = useState(true);

    const closeModal = () => {
        setIsModalOpen(false);
    };
    return isModalOpen ? (
        <div className="bg-dark-secondary rounded-max border-slate-blue relative grid w-[260px] border-2 px-6 py-4 shadow-lg shadow-black/25">
            <h2 className="mb-3 text-white">{title}</h2>
            <div className="flex gap-6">
                <p>{name}</p>
                <div className="flex flex-row items-center gap-2">
                    <div className="bg-status-green h-2 w-2 rounded-full "></div>
                    <p>Delivered</p>
                </div>
            </div>

            <button
                onClick={closeModal}
                className="bg-transparenttext-white absolute right-6 top-4 cursor-pointer border-none transition-all hover:border-none hover:text-red-500 active:scale-90"
            >
                <FontAwesomeIcon className="h-5" icon={faXmark} />
            </button>
        </div>
    ) : null;
};

export default Notification;
