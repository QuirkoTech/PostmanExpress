import Overlay from "./Overlay";
import { useState } from "react";
import { Check } from "lucide-react";

const DeleteModal = ({ isOpen, closeModal, onDelete }) => {
    const [isChecked, setIsChecked] = useState(false);

    return (
        // Overlay
        <Overlay onClose={closeModal} isOpen={isOpen}>
            {/* Modal */}
            <div
                onClick={(e) => e.stopPropagation()}
                className=" bg-dark-secondary border-slate-blue rounded-max sm-max:text-base sm-max:p-4 sm-max:w-11/12 mx-auto h-fit w-9/12 border-2 p-7 text-lg"
            >
                <h2 className=" sm-max:text-2xl sm-max:mb-3 mb-5 text-center text-3xl font-bold">
                    Account deletion
                </h2>
                <ul className="sm-max:mb-6 mb-10 flex list-disc flex-col gap-4 pl-6">
                    <li className="">
                        Once your account is deleted, you will no longer be able
                        to access the detailed data of your parcels. This
                        includes historical tracking information, delivery
                        statuses, and any other related data.
                    </li>
                    <li>
                        Account deletion is irreversible. Once your account is
                        deleted, it cannot be recovered.
                    </li>
                    <li>
                        Ensure that you have saved or noted any essential parcel
                        information you may need in the future before proceeding
                        with the account deletion.
                    </li>
                </ul>
                <label
                    htmlFor="check-box"
                    className="sm-max:pl-8 relative cursor-pointer pl-11"
                >
                    <input
                        type="checkbox"
                        id="check-box"
                        className={` sm-max:h-4 sm-max:w-4 absolute left-1 top-[2px] h-5 w-5 appearance-none rounded-[5px] transition-all duration-300 ease-in-out ${
                            isChecked ? "bg-green-main" : "bg-slate-gray"
                        }`}
                        onClick={() => setIsChecked((prevState) => !prevState)}
                    />
                    <Check
                        className={`sm-max:h-4 sm-max:w-4 absolute left-1 top-[3px] z-10 h-5 w-5 text-white transition-all duration-300 ease-in-out ${
                            isChecked ? "text-opacity-100" : "text-opacity-0"
                        }`}
                        strokeWidth={3}
                    />
                    I understand the consequences
                </label>
                <div className="mx-10 mt-10 sm-max:mt-6 flex justify-around">
                    <button
                        onClick={closeModal}
                        className={`rounded-low hover:bg-danger-secondary active:bg-green-active bg-danger-main self-end px-7 py-1 text-white transition duration-300 sm-max:px-5`}
                    >
                        Cancel
                    </button>
                    <button
                        className={`rounded-low hover:bg-green-active active:bg-green-active bg-green-main self-end px-7 py-1 text-white transition duration-300 sm-max:px-5 ${
                            isChecked ? "" : "cursor-not-allowed opacity-50"
                        }`}
                        onClick={onDelete}
                        disabled={!isChecked}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </Overlay>
    );
};

export default DeleteModal;
