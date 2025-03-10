import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useAuthentified } from "./AuthentifiedContext";
import { APP_ROUTES } from '../utils/constants';

const CompleteProfileRoute = ({ element, ...rest }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated)
        return <Navigate to={APP_ROUTES.WELCOME} />

    const { isCompleteProfile } = useAuthentified()

    if (isCompleteProfile)
        return <Navigate to={APP_ROUTES.DASHBOARD} />
    return element
};

export default CompleteProfileRoute;
