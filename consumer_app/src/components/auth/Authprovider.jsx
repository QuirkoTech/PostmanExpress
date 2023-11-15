import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import axios from "axios";

const Authprovider = ({ children }) => {
    const CONSUMER_URL = import.meta.env.VITE_CONSUMER_BACKEND_URL;
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState("");
    const [notifications, setNotifications] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${CONSUMER_URL}/me`, {
                    withCredentials: true,
                });

                const { message, data } = response.data;

                if (message === "success") {
                    setIsAuthenticated(true);
                    setUserName(data.username);
                    setNotifications(data.notifications);
                }
            } catch (error) {
                const message = error.response.data.status;
                if (message) {
                    console.log(message);
                }
                setIsAuthenticated(false);
                console.log(error);
            }
        };
        fetchUser();
    }, []);

    const value = {
        isAuthenticated,
        userName,
        notifications,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export default Authprovider;
