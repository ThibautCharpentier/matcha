import { useState } from "react";
import ConversationTags from "./ConversationTags"
import ConversationResearch from "./ConversationResearch"
import ConversationRecent from "./ConversationRecent"
import ConversationContact from "./ConversationContact"

export default function ConversationInterface({ contacts }) {
	const [tagConv, setTagConv] = useState("récents");

	return (
		<div className="max-h-screen w-full sm:w-5/12 lg:w-1/4 flex flex-col">
			<ConversationResearch/>
			<ConversationTags
				tagConv={tagConv}
				setTagConv={setTagConv}
			/>
			{tagConv == "récents" ?
			<ConversationRecent/>
			:
			<ConversationContact/>
			}
		</div>
	)
}
