import { useState, useEffect } from "react";
import ConversationInterface from "./Interface/ConversationInterface"
import ConversationMessage from "./Message/ConversationMessage"
import { useAuthentified } from "../AuthentifiedContext"

export default function Conversation() {
	const { contacts, setHasNewMessage } = useAuthentified();
	const [roomSelected, setRoomSelected] = useState(null);

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
				/>
			</div>
		</div>
	)
}
