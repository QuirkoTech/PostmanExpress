const Modal = ({ isOpen, closeModal, message, resetForm, type }) => {
    if (!isOpen) return null;

    const pickupDefaultText =
        "The cabinet containing your parcel has automatically opened. Please collect your parcel and close the door.";

    const deliveryDefaultText =
        "The cabinet door has automatically opened. Please place your parcel inside and close the door.";

    const handleClick = () => {
        closeModal();
        resetForm();
    };

    if (type === "pickup") {
        return (
            <div className="absolute bottom-0 left-0 right-0 top-0 z-10 bg-black/60">
                <div className="absolute top-1/2 flex w-full -translate-y-1/2 justify-center bg-black">
                    <div className="max-container px-20 py-8">
                        <h2 className="text-center text-lg ">
                            {message ? message : pickupDefaultText}
                        </h2>
                        <button
                            onClick={handleClick}
                            className={`rounded-mid  mx-auto mt-8  block  px-4 py-1 text-center text-lg text-white ${
                                message ? "bg-red-600" : "bg-green-600"
                            }`}
                        >
                            {message ? "Close" : "Close door"}
                        </button>
                    </div>
                </div>
            </div>
        );
    } else if (type === "delivery") {
        return (
            <div className="absolute bottom-0 left-0 right-0 top-0 z-10 bg-black/60">
                <div className="absolute top-1/2 flex w-full -translate-y-1/2 justify-center bg-black">
                    <div className="max-container px-20 py-8">
                        <h2 className="text-center text-lg ">
                            {message ? message : deliveryDefaultText}
                        </h2>
                        <button
                            onClick={handleClick}
                            className={`rounded-mid  mx-auto mt-8  block  px-4 py-1 text-center text-lg text-white ${
                                message ? "bg-red-600" : "bg-green-600"
                            }`}
                        >
                            {message ? "Close" : "Close door"}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
};

export default Modal;
