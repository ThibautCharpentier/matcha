import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useRef } from 'react';
import { useAuth } from "./AuthContext";
import { useAuthentified } from "./AuthentifiedContext";
import { APP_ROUTES, API_ROUTES } from '../utils/constants';
import axios from 'axios';

const AuthRoute = ({ element: Element, ...rest }) => {
    const { isAuthenticated } = useAuth();
	const { data, notifs, hasNewNotif, setHasNewNotif, isCompleteProfile } = useAuthentified()
	const location = useLocation();
	const hasFetched = useRef(false);

	useEffect(() => {
		if (hasNewNotif && location.pathname == APP_ROUTES.NOTIFICATION)
		{
			hasFetched.current = true
            axios.patch(API_ROUTES.NOTIF_VERIFIED, null, {
				withCredentials: true,
			})
			.then((res) => {
				if (res.status != 200)
					throw new Error('Une erreur est survenue');
				setHasNewNotif(false)
			})
			.catch((err) => {
				console.log(err);
			});
		}
    }, [location, hasNewNotif]);


    if (isAuthenticated && isCompleteProfile === false)
        return <Navigate to={APP_ROUTES.COMPLETE_PROFILE} />
    return isAuthenticated ? <Element data={data} notifs={notifs} {...rest} /> : <Navigate to={APP_ROUTES.WELCOME} />;
};
export default AuthRoute;
