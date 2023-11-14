const Modal = ({ isOpen, closeModal }) => {
    if (!isOpen) return null;
    return (
        <div className="absolute bottom-0 left-0 right-0 top-0 z-10 bg-black/60">
            <div className="absolute top-1/2 flex w-full -translate-y-1/2 justify-center bg-black">
                <div className="px-20 py-8 max-container">
                    <h2 className="text-center text-lg ">
                        The locker containing your parcel has automatically
                        opened. Please collect your parcel and close the door.
                    </h2>
                    <button onClick={closeModal} className="rounded-mid  mx-auto mt-8  block bg-green-600 px-4 py-1 text-center text-lg text-white">
                        Close door
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
