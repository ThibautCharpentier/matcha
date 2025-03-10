import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useAuthentified } from "./AuthentifiedContext";
import { APP_ROUTES } from '../utils/constants';

const AuthRoute = ({ element, ...rest }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated)
        return <Navigate to={APP_ROUTES.WELCOME} />

	const { isCompleteProfile } = useAuthentified()

    if (!isCompleteProfile)
        return <Navigate to={APP_ROUTES.COMPLETE_PROFILE} />
    return element;
};

export default AuthRoute;
