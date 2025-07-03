import { useState, useEffect } from "react";
import ConversationInterface from "./Interface/ConversationInterface"
import ConversationMessage from "./Message/ConversationMessage"
import { useAuthentified } from "../AuthentifiedContext"
import axios from 'axios';
import { API_ROUTES } from "../../utils/constants";
import ModalUserProfile from "../Profile/ModalUserProfile";

export default function Conversation() {
	const { contacts, setHasNewMessage } = useAuthentified();
	const [roomSelected, setRoomSelected] = useState(null);
	const [isModalProfileUserOpen, setIsModalProfileUserOpen] = useState(false);
	const [dataUser, setDataUser] = useState(null)

	useEffect(() => {
		setHasNewMessage(false);
	}, [])

	const getProfileUser = async(id_user) => {
		axios.get(`${API_ROUTES.GET_PROFILE_USER}?id_user=${id_user}`, {
			withCredentials: true,
		})
		.then((res) => {
			if (res.status != 200)
				throw new Error('Une erreur est survenue');
			setDataUser(res.data.message)
			setIsModalProfileUserOpen(true)
		})
		.catch((err) => {
			console.log(err);
		});
	}

	return (
		<div className="w-full h-screen bg-gray-50 border-gray-300 border-l-[1px]">
			<div className="flex flex-row">
				<ConversationInterface
					contacts={contacts}
					roomSelected={roomSelected}
					setRoomSelected={setRoomSelected}
				/>
				<ConversationMessage 
					roomSelected={roomSelected}
					setRoomSelected={setRoomSelected}
					getProfileUser={getProfileUser}
				/>
			</div>
			{isModalProfileUserOpen && <ModalUserProfile
				isModalProfileUserOpen={isModalProfileUserOpen}
				setIsModalProfileUserOpen={setIsModalProfileUserOpen}
				dataUser={dataUser}
				setDataUser={setDataUser}
				functionDeleteContact={() => {
					setRoomSelected(null)
					setIsModalProfileUserOpen(false)
				}}
			/>}
		</div>
	)
}
