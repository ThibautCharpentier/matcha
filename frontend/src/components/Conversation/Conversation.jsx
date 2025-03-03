import ConversationInterface from "./Interface/ConversationInterface"
import ConversationMessage from "./Message/ConversationMessage"

export default function Conversation({ contacts }) {
	return (
		<div className="w-full h-screen bg-gray-50 border-gray-300 border-l-[1px] mb-[4em] sm:mb-0">
			<div className="flex flex-row">
				<ConversationInterface
					contacts={contacts}
				/>
				<ConversationMessage/>
			</div>
		</div>
	)
}
