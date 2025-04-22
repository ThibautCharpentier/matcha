import { useState } from "react";
import ConversationInterface from "./Interface/ConversationInterface"
import ConversationMessage from "./Message/ConversationMessage"
import { useAuthentified } from "../AuthentifiedContext"

export default function Conversation() {
	const { contacts } = useAuthentified();
	const [roomIdSelected, setRoomIdSelected] = useState(-1)
	console.log(contacts)

	return (
		<div className="w-full h-screen bg-gray-50 border-gray-300 border-l-[1px]">
			<div className="flex flex-row">
				<ConversationInterface
					contacts={contacts}
					setRoomIdSelected={setRoomIdSelected}
				/>
				<ConversationMessage 
					roomIdSelected={roomIdSelected}/>
			</div>
		</div>
	)
}
