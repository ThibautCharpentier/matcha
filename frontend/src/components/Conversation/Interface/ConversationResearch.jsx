import { useState, useEffect } from "react"
import { useAuthentified } from "../../AuthentifiedContext";
import profile from '../../../assets/images/img_profile.png';
import { API_URL } from '../../../utils/constants';

export default function ConversationTags({ setRoomSelected }) {
	const { contacts } = useAuthentified();
	const [inputSearchContact, setInputSearchContact] = useState('');
	const [filteredContacts, setFilteredContacts] = useState([]);
	const [displayResearch, setDisplayResearch] = useState(false)

	useEffect(() => {
		if (inputSearchContact.length < 3) {
			setFilteredContacts([]);
			return ;
		}
		if (!contacts)
			return
		const filtered = contacts.filter(contact => {
			const search = inputSearchContact.toLowerCase();
			const firstname = contact.firstname.toLowerCase();
			const lastname = contact.lastname.toLowerCase();

			return (
				firstname.startsWith(search) || lastname.startsWith(search)
			);
		});

		setFilteredContacts(filtered);
	}, [inputSearchContact, contacts])

	const handleSelectContact = (contact) => {
		setRoomSelected({
			room_id: contact.room_id,
			contact_picture_profile: contact.picture_profil,
			contact_firstname: contact.firstname,
			contact_lastname: contact.lastname,
			contact_id: contact.user_id
		});
		setInputSearchContact('');
		setFilteredContacts([]);
	}

	const highlight = (text) => {
		const search = inputSearchContact.toLowerCase();
		
		const lower = text.toLowerCase();
		if (lower.startsWith(search)) {
			return (
				<>
					<span className="text-[--color-pink] font-bold">{text.slice(0, search.length)}</span>
					{text.slice(search.length)}
				</>
			);
		}
		return text;
	};

	return (
		<div className="relative w-full">
			<div className="m-5 mb-0">
				<input className="py-3 px-4 rounded-lg mb-0 border-solid border-gray-300 border-[2px] w-full"
				placeholder="Rechercher une conversation"
				type="text"
				name="conversation"
				id="conversation"
				value={inputSearchContact}
				onChange={(e) => {
					setInputSearchContact(e.target.value);
				}}
				onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
						if (filteredContacts.length < 1)
							return ;
                        handleSelectContact(filteredContacts[0]);
                    }
                }}
				onFocus={() => {
					setDisplayResearch(true)
				}}
				onBlur={() => {
					setTimeout(() => {setDisplayResearch(false)}, 100)
				}}
				/>
			</div>
			{filteredContacts.length > 0 && displayResearch && (
				<div className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-md max-h-96 overflow-y-auto w-[calc(100%-2.5rem)] ml-5">
					{filteredContacts.map((contact, index) => (
						<div
							key={index}
							className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-left flex flex-row items-center "
							onClick={() => {
								handleSelectContact(contact);
							}}
						>
							<img src={contact.picture_profil ? API_URL + "/" + contact.picture_profil : profile} className="w-14 h-auto m-2 ml-0 rounded-full" style={{userSelect: 'none'}}/>
							<p className="">{highlight(contact.firstname)} {highlight(contact.lastname)}</p>
						</div>
					))}
				</div>
			)}
		</div>
	)
}
