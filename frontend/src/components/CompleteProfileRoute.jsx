import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useAuthentified } from "./AuthentifiedContext";
import { APP_ROUTES } from '../utils/constants';

const CompleteProfileRoute = ({ element, ...rest }) => {
    const { isAuthenticated } = useAuth();
    const { isCompleteProfile } = useAuthentified()

    if (!isAuthenticated)
        return <Navigate to={APP_ROUTES.WELCOME} />
    if (isCompleteProfile === null)
        return null
    else if (isCompleteProfile)
        return <Navigate to={APP_ROUTES.DASHBOARD} />
    return element
};


export default CompleteProfileRoute;
