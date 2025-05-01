import { useState, useEffect } from "react";
import profile from '../../../assets/images/img_profile.png';
import { API_URL } from '../../../utils/constants';
import { useAuthentified } from "../../AuthentifiedContext";

export default function ConversationRecent({roomSelected, setRoomSelected}) {
	const { conversations, contacts, idUser } = useAuthentified();
	const [recentsConversations, setRecentsConversations] = useState([]);

	const formatRelativeDate = (date) => {
		const now = new Date();
		const diffMs = now - date;
		const diffSec = Math.floor(diffMs / 1000);
		const diffMin = Math.floor(diffSec / 60);
		const diffHrs = Math.floor(diffMin / 60);
		const diffDays = Math.floor(diffHrs / 24);
	
		if (diffSec < 60) return "à l'instant";
		if (diffMin < 60) return `${diffMin} min`;
		if (diffHrs < 24) return `${diffHrs}h`;
		if (diffDays === 1) return "hier";
		if (diffDays < 7) return `${diffDays} j`;
		if (diffDays < 14) return "1 sem";
		return `${Math.floor(diffDays / 7)} sema`;
	};

	const truncLastMessage = (message) => {
		let truncMessage = message.slice(0, 10);
		if (message.length > 10)
			truncMessage = truncMessage + "...";
		return truncMessage;
	}

	useEffect(() => {
		console.log("passe ici")
		if (conversations.length > 0 && conversations.length === contacts.length) {

			let newRecents = conversations.map((conv) => {
				const lastMessage = conv.messages.at(-1);
				const contactId = conv.user1 === idUser ? conv.user2 : conv.user1;
				const contact = contacts.find(c => c.user_id === contactId);
		
				if (!lastMessage || !contact) return null;
			
				return {
					chatId: conv.chatId,
					contactId: contact.user_id,
					firstname: contact.firstname,
					lastanme: contact.lastname,
					picture_profil: contact.picture_profil,
					pathPicture: API_URL + "/" + contact.picture_profil || null,
					lastMessage: truncLastMessage(lastMessage.message),
					lastDate: new Date(lastMessage.created),
				};
			}).filter(Boolean); 
			newRecents.sort((a, b) => b.lastDate - a.lastDate);
			setRecentsConversations(newRecents);
		}
	}, [conversations])

	return (
		<div className='flex-grow overflow-y-auto'>
			{ recentsConversations.map(conv => (
				<div 
					style={{cursor: 'pointer'}}
						className={`hover:bg-gray-100 flex flex-row w-full ${conv.chatId === roomSelected?.room_id ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
					onClick={() => setRoomSelected({
								room_id: conv.chatId,
								contact_picture_profile: conv.picture_profil,
								contact_firstname: conv.firstname,
								contact_lastname: conv.lastname,
								contact_id: conv.contactId
							})}
				>
					<img src={conv.pathPicture ? conv.pathPicture : profile} className="w-[17%] h-auto m-2 mx-3 rounded-full" style={{userSelect: 'none'}}/>
					<div className="flex flex-col items-start justify-center">
						<div className="mb-1">
							<p>{conv.firstname} {conv.lastname}</p>
						</div>
						<div className="flex flex-row text-sm text-gray-500 items-center w-full overflow-hidden">
							<p className="truncate break-words overflow-hidden text-ellipsis max-w-[60%] min-w-0">
								{conv.lastMessage}
							</p>
							<p className="mx-2"> - </p>
							<p className="whitespace-nowrap">{formatRelativeDate(conv.lastDate)}</p>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}
