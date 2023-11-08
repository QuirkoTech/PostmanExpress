import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function Modal({ isOpen, closeModal, name, menuLinks, className }) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className={` ${className}`}>
            <div className={`modal-container ${className}`}>
                <ul className="border-b-2 border-solid border-[#494844]">
                    <li className="text-lg font-medium w-full text-white pb-5 mb-4 border-b-2 border-solid border-[#494844]">
                        {name}
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-2 p-2 px-4 bg-transparent transition-all text-white border-none cursor-pointer hover:text-red-500 focus:outline-none hover:border-none"
                        >
                            <FontAwesomeIcon className='w-5 h-5' icon={faXmark} />
                        </button>
                    </li>
                    {menuLinks.map((link, index) => (
                        <li key={index} className="text-white text-lg font-normal my-5">
                            <a className="text-white" href={link.url}>
                                {link.title}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className='flex flex-col justify-between '>
                    <button
                        // onClick={handleSignOut}
                        className="mr-auto p-0 my-5 bg-transparent transition-all text-[#C55B5B] text-lg font-medium border-none cursor-pointer focus:outline-none hover:border-none"
                    >
                        Log Out
        
                    </button>

                

                </div>
            </div>
        </div>
    );
}

export default Modal;
