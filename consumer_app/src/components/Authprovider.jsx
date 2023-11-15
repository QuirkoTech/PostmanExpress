import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const Authprovider = ({ children }) => {
    const CONSUMER_URL = import.meta.env.VITE_CONSUMER_BACKEND_URL;
    const AuthContext = createContext();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState("");
    const [notifications, setNotification] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${CONSUMER_URL}/me`, {
                    withCredentials: true,
                });

                const message = response.data.status;

                if (message === "success") {
                    setIsAuthenticated(true);
                    setUserName(response.data.data.username);
                    setNotification(response.data.data.notifications);
                }
            } catch (error) {
                const message = error.response.data.status;
                if (message) {
                    setIsAuthenticated(false);
                }
            }
        };
        fetchUser();
    });

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
