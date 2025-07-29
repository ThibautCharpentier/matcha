import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from "./AuthContext";
import Navbar from "./Navbar/Navbar"
import axios from 'axios';
import { API_ROUTES } from '../utils/constants';
import { useSocketToken } from "../utils/sockets/useSocketToken";
import { useSocketData } from "../utils/sockets/useSocketData";
import { useSocketNotifs } from "../utils/sockets/useSocketNotifs";
import { useSocketContacts } from "../utils/sockets/useSocketContacts";
import { useSocketConversations } from "../utils/sockets/useSocketConversations"
import { ToastContainer } from 'react-toastify';

const AuthentifiedContext = createContext();

export default function AuthentifiedProvider({ children }) {
	const { isAuthenticated, logout } = useAuth();
	const [hasNewNotif, setHasNewNotif] = useState(false)
	const [hasNewMessage, setHasNewMessage] = useState(false)
    const [isCompleteProfile, setIsCompleteProfile] = useState(null);
	const [notifs, setNotifs] = useState(null)
	const [data, setData] = useState({
		username: "",
		firstname: "",
		lastname: "",
		age: null,
		email: "",
		preferences: "",
		bio: "",
		picture_profile: null,
		pictures: [],
		famerating: null,
		gps: false,
		latitude: null,
		longitude: null,
		city: "",
		interest: []
	})
	const [contacts, setContacts] = useState(null)
	const [conversations, setConversations] = useState(null);
	const [idUser, setIdUser] = useState(null);

	const contextClass = {
		success: "bg-[--color-dark-green]",
		error: "bg-[--color-pink]",
		default: "bg-[--color-dark-green]",
	};

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
				setIdUser(res.data.id_user);
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
	useSocketConversations(isAuthenticated, setConversations, setHasNewMessage, idUser)

	return (
		<>
			{isCompleteProfile != null &&
				<div className={`${isCompleteProfile && 'flex'}`}>
					{isCompleteProfile ?
						<Navbar 
							hasNewNotif={hasNewNotif}
							hasNewMessage={hasNewMessage}
						/>
					:
						<header></header>
					}
					<AuthentifiedContext.Provider value={{data, notifs, conversations, setConversations, contacts, hasNewNotif, setHasNewNotif, isCompleteProfile, profileComplete, idUser, hasNewMessage, setHasNewMessage}}>
						<main className='w-full'>
							{children}
							<ToastContainer
								toastClassName={(context) =>
									contextClass[context?.type || "default"] +
									" relative flex p-6 max-w-72 min-h-20 rounded-md justify-between items-center overflow-hidden cursor-pointer"
								}
								position="top-right"
								autoClose={5000}
								hideProgressBar={false}
								closeOnClick
								pauseOnHover
								draggable
								theme="colored"
							/>
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
