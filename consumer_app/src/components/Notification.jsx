import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Notification = () => {
    return (
        <div className="absolute  flex flex-col gap-4 text-sm left-10 top-5">
            <div className="bg-dark-secondary rounded-max border-slate-blue relative grid w-[260px] border-2 px-6 py-4 shadow-lg shadow-black/25">
                <h2 className="mb-3 text-white">Parcel status update</h2>
                <div className="flex gap-6">
                    <p>Nike Shoesdew...</p>
                    <div className="flex flex-row items-center gap-2">
                        <div className="bg-status-green h-2 w-2 rounded-full "></div>
                        <p>Delivered</p>
                    </div>
                </div>

                <button
                    // onClick={closeModal}
                    className="bg-transparenttext-white absolute right-6 top-4 cursor-pointer border-none transition-all hover:border-none hover:text-red-500 active:scale-90"
                >
                    <FontAwesomeIcon className="h-5" icon={faXmark} />
                </button>
            </div>


        </div>
    );
};

export default Notification;
