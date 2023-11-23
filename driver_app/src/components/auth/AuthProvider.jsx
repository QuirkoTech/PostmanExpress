import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./";

const AuthProvider = ({ children }) => {
    const DRIVER_URL = import.meta.env.VITE_DRIVER_BACKEND_URL;
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const fetchDriver = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${DRIVER_URL}/me`, {
                withCredentials: true,
            });

            const { status, data } = response.data;

            if (status === "success") {
                setIsAuthenticated(true);
                setUserName(data.username);
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
        fetchDriver();
    }, []);

    const value = {
        isAuthenticated,
        userName,
        isLoading,
        fetchDriver,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
