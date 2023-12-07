import { useContext } from "react";
import { AuthContext } from "./";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);

    return !isAuthenticated ? children : <Navigate to="/" replace />;
};

export default AuthRoute;
