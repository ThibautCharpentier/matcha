import React from "react";
import { Route, Navigate} from "react-router-dom";
import { useAuth } from "./AuthContext";
import { APP_ROUTES } from '../utils/constants';

const NoAuthRoute = ({ element, ...rest }) => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Navigate to={APP_ROUTES.DASHBOARD} /> : element;
};

export default NoAuthRoute;
