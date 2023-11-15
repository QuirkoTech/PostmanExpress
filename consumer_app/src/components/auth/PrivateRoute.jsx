import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Component, ...rest }) => {
    const { isAuthenticated } = useContext(AuthContext);
    return isAuthenticated ? (
        <Route {...rest} element={<Component />} />
    ) : (
        <Navigate to="/login" replace />
    );
};

export default PrivateRoute;
