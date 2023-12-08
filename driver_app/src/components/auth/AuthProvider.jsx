import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { AuthContext } from "./";
import { useLocation } from "react-router-dom";

const AuthProvider = ({ children }) => {
    const DRIVER_URL = import.meta.env.VITE_DRIVER_BACKEND_URL;
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [driverName, setDriverName] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const fetchDriver = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${DRIVER_URL}/me`, {
                withCredentials: true,
            });

            const { status, data } = response.data;

            if (status === "success") {
                setIsAuthenticated(true);
                setDriverName(data.driver_name);
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
    }, [DRIVER_URL]);

    useEffect(() => {
        fetchDriver();
    }, [fetchDriver, location.pathname]);

    const value = {
        isAuthenticated,
        driverName,
        isLoading,
        fetchDriver,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
