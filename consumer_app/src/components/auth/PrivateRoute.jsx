import { useContext } from "react";
import AuthContext from "./AuthContext";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
