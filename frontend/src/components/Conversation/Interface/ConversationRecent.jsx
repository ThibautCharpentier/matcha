import { useState, useEffect } from "react";
import profile from '../../../assets/images/img_profile.png';
import { API_URL } from '../../../utils/constants';
import { useAuthentified } from "../../AuthentifiedContext";

export default function ConversationRecent({roomSelected, setRoomSelected}) {
	const { conversations, contacts, idUser, setHasNewMessage } = useAuthentified();
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
		let truncMessage = message.slice(0, 30);
		if (message.length > 30)
			truncMessage = truncMessage + "...";
		return truncMessage;
	}

	useEffect(() => {
		if (conversations.length > 0) {
			let newRecents = conversations.map((conv) => {
				const lastMessage = conv.messages?.at(-1); 
				const contactId = conv.user1 === idUser ? conv.user2 : conv.user1;
				const contact = contacts.find(c => c.user_id === contactId);
			
				if (!lastMessage || !contact) return null;
		
			
				return {
					chatId: conv.chatId,
					contactId: contact.user_id,
					firstname: contact.firstname,
					lastname: contact.lastname,
					picture_profil: contact.picture_profil,
					pathPicture: contact.picture_profil || null,
					lastMessage: truncLastMessage(lastMessage.message),
					lastMessageSender: lastMessage.sender,
					viewMessage: lastMessage.view,
					lastDate: new Date(lastMessage.created),
				};
			}).filter(Boolean); 
			newRecents.sort((a, b) => b.lastDate - a.lastDate);
			setRecentsConversations(newRecents);
		}
		else {
			setRecentsConversations([]);
		}
	}, [conversations])

	return (
		<div className="overflow-y-auto flex-grow">
		{recentsConversations.map(conv => (
			<div
			key={conv.chatId}
			onClick={() => {
				setRoomSelected({
					room_id: conv.chatId,
					contact_picture_profile: conv.picture_profil,
					contact_firstname: conv.firstname,
					contact_lastname: conv.lastname,
					contact_id: conv.contactId
				});

				setRecentsConversations(prev =>
					prev.map(c =>
						c.chatId === conv.chatId && c.lastMessageSender !== idUser
							? { ...c, viewMessage: true }
							: c
					)
				);
			}}
			className={`flex items-center w-full px-2 py-3 cursor-pointer overflow-hidden
				${conv.chatId === roomSelected?.room_id ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
			>
				<img
					src={conv.pathPicture ? API_URL + "/" + conv.pathPicture : profile}
					className="w-14 h-14 rounded-full flex-shrink-0 mr-3"
					style={{ userSelect: 'none' }}
				/>
				<div className="flex flex-col min-w-0 overflow-hidden">
					<p className="text-sm font-medium truncate w-full">{truncLastMessage(conv.firstname + " " + conv.lastname)}</p>
					<div className="flex items-center text-sm text-gray-500 w-full min-w-0 overflow-hidden max-w-full">
						<p className={`truncate break-all flex-1 min-w-0 overflow-hidden text-ellipsis ${conv.chatId != roomSelected?.room_id && !conv.viewMessage && conv.lastMessageSender != idUser && 'font-semibold text-black'}`}>
							{conv.lastMessageSender === idUser &&
							(<span>vous: </span>)}
							{conv.lastMessage}
						</p>
						<span className="shrink-0 whitespace-nowrap ml-2">
						- {formatRelativeDate(conv.lastDate)}
						</span>
					</div>
				</div>
			</div>
		))}
		</div>	
	)
}