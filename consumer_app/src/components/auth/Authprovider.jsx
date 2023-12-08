import { useState, useEffect, useCallback } from "react";
// import AuthContext from "./AuthContext";
import axios from "axios";
import { AuthContext } from "./";
import { useLocation } from "react-router-dom";

const Authprovider = ({ children }) => {
    const CONSUMER_URL = import.meta.env.VITE_CONSUMER_BACKEND_URL;
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState("");
    const [notifications, setNotifications] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    const fetchUser = useCallback(async () => {
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
                // console.log(message);
            }
            setIsAuthenticated(false);
            // console.log(error);
        }
        setIsLoading(false);
    }, [CONSUMER_URL]);

    const setLoading = () => {
        setIsLoading(true);
    };

    useEffect(() => {
        fetchUser();
    }, [location.pathname, fetchUser]);

    const value = {
        isAuthenticated,
        userName,
        notifications,
        isLoading,
        fetchUser,
        setLoading,
    };
    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export default Authprovider;
