import React, { useEffect, useRef, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { APP_ROUTES, API_ROUTES } from '../utils/constants';
import axios from 'axios';
import { useSocketData } from "../utils/sockets/useSocketData";

const AuthRoute = ({ element: Element, ...rest }) => {
    const { isAuthenticated, logout } = useAuth();
	const location = useLocation();
	const hasFetched = useRef(location.pathname);
	const [data, setData] = useState({
		username: "",
		firstname: "",
		lastname: "",
		email: "",
		preferences: "",
		bio: "",
		picture_profile: null,
		pictures: [],
		gps: false,
		latitude: null,
		longitude: null,
		interest: []
	})

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

	useSocketData(isAuthenticated, setData);

    return isAuthenticated ? <Element data={data} {...rest} /> : <Navigate to={APP_ROUTES.WELCOME} />;
};

export default AuthRoute;
