import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassHalf, faTimes, faXmark } from '@fortawesome/free-solid-svg-icons';

function Modal({ isOpen, closeModal, name, menuLinks, className }) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className={` ${className}`}>
            <div className={`modal-container ${className}`}>
                <ul className="border-b-2 border-solid border-[#ccc]">
                    <li className="text-base font-medium w-full text-white pb-5 mb-4 border-b-2 border-solid border-[#ccc]">
                        {name}
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-2 p-2 px-4 bg-transparent transition-all text-white border-none cursor-pointer hover:text-red-500 focus:outline-none hover:border-none"
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </li>
                    {menuLinks.map((link, index) => (
                        <li key={index} className="text-white font-medium mb-4">
                            <a className="text-white" href={link.url}>
                                {link.title}
                            </a>
                        </li>
                    ))}
                </ul>
                <button
                    // onClick={handleSignOut}
                    className="mr-auto p-0 mt-4 bg-transparent transition-all text-red-600 border-none cursor-pointer focus:outline-none hover:border-none"
                >
                    Log Out
                </button>
            </div>
            <button
                // onClick={handleDeleteAccount}
                className="mr-auto p-0 mt-[420px] bg-transparent transition-all text-red-600 border-none cursor-pointer focus:outline-none hover:border-none"
            >
                Delete Account
            </button>
        </div>
    );
}

export default Modal;
