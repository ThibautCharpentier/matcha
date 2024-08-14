import React, { useEffect, useRef } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { APP_ROUTES, API_ROUTES } from '../utils/constants';
import axios from 'axios';

const AuthRoute = ({ element, ...rest }) => {
    const { isAuthenticated, logout } = useAuth();
	const location = useLocation();
	const hasFetched = useRef(location.pathname);

	useEffect(() => {
		if (hasFetched.current != location.pathname)
		{
        	axios.get(`${API_ROUTES.IS_CONNECTED}`, {
				withCredentials: true,
			})
			.then((res) => {
				if (res.status != 200)
					throw new Error('Une erreur est survenue');
			})
			.catch((err) => {
				console.log(err);
				axios.get(API_ROUTES.REFRESH, {
					withCredentials: true,
				})
				.then((res) => {
					if (res.status != 200)
						throw new Error('Une erreur est survenue');
				})
				.catch((err) => {
					console.log(err);
					logout();
				});
			});
			hasFetched.current = location.pathname
		}
    }, [location]);

    return isAuthenticated ? element : <Navigate to={APP_ROUTES.WELCOME} />;
};

export default AuthRoute;
