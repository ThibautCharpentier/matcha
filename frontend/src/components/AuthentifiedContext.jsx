import { createContext, useContext, useState, useRef, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Navbar from "./Navbar/Navbar"
import axios from 'axios';
import { API_ROUTES } from '../utils/constants';
import { useSocketData } from "../utils/sockets/useSocketData";
import { useSocketNotifs } from "../utils/sockets/useSocketNotifs";
import { useSocketContacts } from "../utils/sockets/useSocketContacts";

const AuthentifiedContext = createContext();

export default function AuthentifiedProvider({ children }) {
	const { isAuthenticated, logout } = useAuth();
	const location = useLocation();
	const hasFetched = useRef(location.pathname);
	const [hasNewNotif, setHasNewNotif] = useState(false)
    const [isCompleteProfile, setIsCompleteProfile] = useState(null);
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
	const [contacts, setContacts] = useState([])

    function profileIsCompleteOrNot() {
        axios.get(`${API_ROUTES.IS_COMPLETE_PROFILE}`, {
			withCredentials: true,
		})
        .then((res) => {
            if (res.status != 200)
				throw new Error('Une erreur est survenue');
            if (res.data.message == true)
                setIsCompleteProfile(true);
            else
                setIsCompleteProfile(false);
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const profileComplete = () => {
        setIsCompleteProfile(true);
    }

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
        profileIsCompleteOrNot();
    }, [location]);

	useSocketData(isAuthenticated, setData);
	useSocketNotifs(isAuthenticated, setNotifs, setHasNewNotif);
	useSocketContacts(isAuthenticated, setContacts)

	return (
		<div className={`${isCompleteProfile && 'flex'}`}>
			{isCompleteProfile && <Navbar 
				hasNewNotif={hasNewNotif}
			/>}
			<AuthentifiedContext.Provider value={{data, notifs, contacts, hasNewNotif, setHasNewNotif, isCompleteProfile, profileComplete}}>
				{children}
			</AuthentifiedContext.Provider>
		</div>
	);
};

export const useAuthentified = () => {
    return useContext(AuthentifiedContext);
};
