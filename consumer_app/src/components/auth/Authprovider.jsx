import { useState, useEffect } from "react";
// import AuthContext from "./AuthContext";
import axios from "axios";
import { AuthContext } from "./";

const Authprovider = ({ children }) => {
    const CONSUMER_URL = import.meta.env.VITE_CONSUMER_BACKEND_URL;
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState("");
    const [notifications, setNotifications] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUser = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${CONSUMER_URL}/me`, {
                withCredentials: true,
            });

            const { status, data } = response.data;

            if (status === "success") {
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
        setIsLoading(false);
    };
    useEffect(() => {
        fetchUser();
    }, []);

    const value = {
        isAuthenticated,
        userName,
        notifications,
        isLoading,
        fetchUser,
    };
    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export default Authprovider;
