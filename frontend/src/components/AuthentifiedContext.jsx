import { createContext, useContext, useState, useRef, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Navbar from "./Navbar/Navbar"
import axios from 'axios';
import { API_ROUTES } from '../utils/constants';
import { useSocketData } from "../utils/sockets/useSocketData";
import { useSocketNotifs } from "../utils/sockets/useSocketNotifs";

const AuthentifiedContext = createContext();

export default function AuthentifiedProvider({ children }) {
	const { isAuthenticated, logout } = useAuth();
	const location = useLocation();
	const hasFetched = useRef(location.pathname);
	const [hasNewNotif, setHasNewNotif] = useState(false)
	const [notifs, setNotifs] = useState([])
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
	useSocketNotifs(isAuthenticated, setNotifs, setHasNewNotif);

	return (
		<div className="flex">
			<Navbar 
				hasNewNotif={hasNewNotif}
			/>
			<AuthentifiedContext.Provider value={{data, notifs, hasNewNotif, setHasNewNotif}}>
				{children}
			</AuthentifiedContext.Provider>
		</div>
	)
}

export const useAuthentified = () => {
    return useContext(AuthentifiedContext);
};
