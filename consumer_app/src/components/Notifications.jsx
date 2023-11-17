import { Notification } from "./";
import { useState, useEffect } from "react";

const Notifications = ({ notifications }) => {
    const [index, setIndex] = useState(0);

    // Render notifications one by one with a delay
    useEffect(() => {
        const timer = setInterval(() => {
            // Check if there are more notifications to render
            if (index < notifications.length) {
                setIndex((prevIndex) => prevIndex + 1);
            } else {
                // Clear interval if no more notifications to render
                clearInterval(timer);
            }
        }, 150);

        // Clear interval on component unmount or if notifications change
        return () => clearInterval(timer);
    }, [index, notifications]);

    return (
        <div className="absolute left-10 top-5 flex flex-col gap-4 text-sm">
            {notifications.slice(0, index).map((notification) => (
                <Notification
                    key={notification.parcel_id}
                    title={notification.title}
                    name={notification.parcel_name}
                />
            ))}
        </div>
    );
};

export default Notifications;
