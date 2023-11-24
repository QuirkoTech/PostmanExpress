import { useContext } from "react";
import { AuthContext } from "./";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return;
    }

    return !isAuthenticated ? children : <Navigate to="/" replace />;
};

export default AuthRoute;
