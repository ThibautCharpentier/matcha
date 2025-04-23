import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useAuth } from "./AuthContext";
import Navbar from "./Navbar/Navbar"
import axios from 'axios';
import { API_ROUTES } from '../utils/constants';
import { useSocketToken } from "../utils/sockets/useSocketToken";
import { useSocketData } from "../utils/sockets/useSocketData";
import { useSocketNotifs } from "../utils/sockets/useSocketNotifs";
import { useSocketContacts } from "../utils/sockets/useSocketContacts";
import { useSocketConversations } from "../utils/sockets/useSocketConversations"

const AuthentifiedContext = createContext();

export default function AuthentifiedProvider({ children }) {
	const { isAuthenticated, logout } = useAuth();
	const [hasNewNotif, setHasNewNotif] = useState(false)
    const [isCompleteProfile, setIsCompleteProfile] = useState(null);
	const [notifs, setNotifs] = useState(null)
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
	const [conversations, setConversations] = useState([{
		id: "",
		idUser1: "",
		idUser2: "",
		messages: [{
			idSender: "",
			content: "",
			timestamp: ""
		}]
	}]);
	const idUserRef = useRef(null);

    const profileComplete = () => {
        setIsCompleteProfile(true);
    }

	useEffect(() => {
		axios.get(`${API_ROUTES.IS_COMPLETE_PROFILE}`, {
			withCredentials: true,
		})
        .then((res) => {
            if (res.status != 200)
				throw new Error('Une erreur est survenue');
            if (res.data.message == true) {
				console.log(res.data.id_user)
				idUserRef.current = res.data.id_user;
                setIsCompleteProfile(true);
			}
            else
                setIsCompleteProfile(false);
        })
        .catch((err) => {
			console.log(err)
            logout()
        })
	}, [])

	useSocketToken(isAuthenticated, logout);
	useSocketData(isAuthenticated, setData);
	useSocketNotifs(isAuthenticated, setNotifs, setHasNewNotif);
	useSocketContacts(isAuthenticated, setContacts)
	useSocketConversations(isAuthenticated, setConversations)

	return (
		<>
			{/* 'flex flex-row' */}
			{isCompleteProfile != null &&
				<div className={`${isCompleteProfile && 'flex'}`}>
					{isCompleteProfile ?
						<Navbar 
							hasNewNotif={hasNewNotif}
						/>
					:
						<header></header>
					}
					<AuthentifiedContext.Provider value={{data, notifs, conversations, contacts, hasNewNotif, setHasNewNotif, isCompleteProfile, profileComplete, idUserRef}}>
						<main className='w-full'>
							{children}
						</main>
					</AuthentifiedContext.Provider>
				</div>
			}
		</>
	);
};

export const useAuthentified = () => {
    return useContext(AuthentifiedContext);
};
