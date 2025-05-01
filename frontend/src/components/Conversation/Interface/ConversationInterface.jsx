import { useState } from "react";
import ConversationTags from "./ConversationTags"
import ConversationResearch from "./ConversationResearch"
import ConversationRecent from "./ConversationRecent"
import ConversationContact from "./ConversationContact"

export default function ConversationInterface({ contacts, roomSelected, setRoomSelected }) {
	const [tagConv, setTagConv] = useState("récents");

	return (
		<div className="max-h-screen w-full sm:w-5/12 lg:w-1/4 flex flex-col">
			<ConversationResearch/>
			<ConversationTags
				tagConv={tagConv}
				setTagConv={setTagConv}
			/>
			<div className='flex-grow overflow-y-auto'>
				{tagConv == "récents" ?
				<ConversationRecent
					roomSelected={roomSelected}
					setRoomSelected={setRoomSelected}
				/>
				:
				<>
					{contacts.map(contact => (
						<ConversationContact 
							key={contact.room_id} 
							contact={contact} 
							roomSelected={roomSelected}
							changeRoom={() => setRoomSelected({
								room_id: contact.room_id,
								contact_picture_profile:contact.picture_profil,
								contact_firstname: contact.firstname,
								contact_lastname: contact.lastname,
								contact_id: contact.user_id
							})}	
						/>
					))}
				</>
				}
			</div>
		</div>
	)
}
