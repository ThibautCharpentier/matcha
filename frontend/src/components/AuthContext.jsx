import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { API_ROUTES } from "../utils/constants";
import { useSocketToken } from "../utils/sockets/useSocketToken";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isReady, setIsReady] = useState(false);
	const hasFetched = useRef(false);

    const login = () => {
        setIsAuthenticated(true);
		axios.get(`${API_ROUTES.GET_GPS}`, {
			withCredentials: true,
		})
		.then((res) => {
			if (res.status != 200)
				throw new Error('Une erreur est survenue');
			if (res.data.message.gps == false)
			{
				axios.get('https://ipapi.co/json/')
				.then((res) => {
					if (res.status != 200)
						throw new Error('Une erreur est survenue');
					const obj = {
						lat: parseFloat(res.data.latitude.toFixed(6)),
						lng: parseFloat(res.data.longitude.toFixed(6)),
						city: res.data.city
					}
					axios.patch(API_ROUTES.UPDATE_LOCATION, obj, {
						withCredentials: true,
					})
					.then((res) => {
						if (res.status != 200)
							throw new Error('Une erreur est survenue');
					})
					.catch((err) => {
						console.log(err);
					});
				})
				.catch((err) => {
					console.log(err);
				});
			}
		})
		.catch((err) => {
			console.log(err);
		});
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

	useEffect(() => {
        if (hasFetched.current == false)
		{
			axios.get(`${API_ROUTES.IS_CONNECTED}`, {
				withCredentials: true,
			})
			.then((res) => {
				if (res.status != 200)
					throw new Error('Une erreur est survenue');
				login();
				setIsReady(true);
			})
			.catch((err) => {
				console.log(err);
				axios.get(API_ROUTES.REFRESH, {
					withCredentials: true,
				})
				.then((res) => {
					if (res.status != 200)
						throw new Error('Une erreur est survenue');
					login();
					setIsReady(true);
				})
				.catch((err) => {
					console.log(err);
					logout();
					setIsReady(true);
				});
			});
		}
        hasFetched.current = true;
    }, []);

	useSocketToken(isAuthenticated, logout);

    return (
		<>
			{isReady && (
				<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
					{children}
				</AuthContext.Provider>
			)}
		</>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};