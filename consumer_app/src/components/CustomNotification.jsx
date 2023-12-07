
import { useNavigate } from "react-router-dom";

const CustomNotification = ({ title, id, name }) => {
  const navigate = useNavigate();

  const handleNotificationClick = (parcelId) => {
    // Navigate to the parcel details page
    navigate(`/parcels/${parcelId}`);
};
    return (
        <div className="w-52 cursor-pointer" onClick={() => handleNotificationClick(id)}>
            <h2 className="mb-2">{title}</h2>
            <div className="flex gap-6">
                <p className="text-slate-gray max-w-[6rem] overflow-hidden text-ellipsis whitespace-nowrap">
                    {name}
                </p>
                <div className="ml-4 flex flex-row items-center gap-2">
                    <div className="bg-status-green h-2 w-2 rounded-full "></div>
                    <p className="text-slate-gray">Delivered</p>
                </div>
            </div>
        </div>
    );
};

export default CustomNotification;
