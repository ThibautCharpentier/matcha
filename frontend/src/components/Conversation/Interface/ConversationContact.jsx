import profile from '../../../assets/images/img_profile.png';
import { API_URL } from '../../../utils/constants';

export default function ConversationContact({contact, roomSelected, changeRoom }) {
	const pathPicture = API_URL + "/" + contact.picture_profil || null;

	return (
		<div className='flex-grow overflow-y-auto' onClick={changeRoom}>
			<div style={{cursor: 'pointer'}} className={`flex flex-row w-full ${contact.room_id === roomSelected?.room_id ? 'bg-gray-100' : 'hover:bg-gray-100'}`}>
				<img src={contact.picture_profil ? pathPicture : profile} className="w-[17%] h-auto m-2 mx-3 rounded-full" style={{userSelect: 'none'}}/>
				<div className="flex flex-col items-start justify-center">
					<div className="text-lg">
						<p>{contact.firstname} {contact.lastname}</p>
					</div>
				</div>
			</div>
		</div>
	)
}
