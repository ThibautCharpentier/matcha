export default function ConversationTags({ tagConv, setTagConv }) {
	return (
		<>
			<div className="mt-2 text-gray-500 flex flex-row">
				<button onClick={() => {setTagConv("récents")}}  className={`w-1/2 ${tagConv != "récents" && `hover:text-gray-900`} pb-2`}>
					{(tagConv == "récents" ?
						<span className="text-gray-900">Récents</span>
						:
						<span>Récents</span>)}
				</button>
				<div className="border-solid border-[1px] border-pink-600 pb-2"></div>
				<button onClick={() => {setTagConv("contacts")}}  className={`w-1/2 ${tagConv != "contacts" && `hover:text-gray-900`} pb-2`}>
					{(tagConv == "contacts" ?
						<span className="text-gray-900">Contacts</span>
						:
						<span>Contacts</span>)}
				</button>
			</div>
			<div className="w-11/12 mx-auto border-t-2 border-solid border-pink-600"></div>
		</>
	)
}
