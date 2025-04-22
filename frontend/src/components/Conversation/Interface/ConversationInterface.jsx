import { useState } from "react";
import ConversationTags from "./ConversationTags"
import ConversationResearch from "./ConversationResearch"
import ConversationRecent from "./ConversationRecent"
import ConversationContact from "./ConversationContact"

export default function ConversationInterface({ contacts, setRoomIdSelected }) {
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
				<ConversationRecent/>
				:
				<>
					{contacts.map(contact => (
						<ConversationContact 
							key={contact.room_id} 
							contact={contact} 
							changeRoom={() => setRoomIdSelected(contact.room_id)}/>
					))}
				</>
				}
			</div>
		</div>
	)
}
