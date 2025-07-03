import { useState, useEffect, useRef } from 'react';
import profile from '../../../assets/images/img_profile.png';
import { API_URL } from '../../../utils/constants';
import NameBlock from '../../Profile/NameBlock';

export default function ConversationContact({contact, roomSelected, changeRoom }) {
	const pathPicture = API_URL + "/" + contact.picture_profil || null;
	
	return (
		<div className='flex-grow' onClick={changeRoom}>
			<div style={{cursor: 'pointer'}} className={`flex flex-row p-2 ${contact.room_id === roomSelected?.room_id ? 'bg-gray-100' : 'hover:bg-gray-100'}`}>
				<img src={contact.picture_profil ? pathPicture : profile} className="w-16 h-16 m-2 rounded-full" style={{userSelect: 'none'}}/>
				<div className="flex flex-col flex-grow items-start justify-center w-1/2 text-md">
					<NameBlock 
						firstname={contact.firstname}
						lastname={contact.lastname}
					/>
				</div>
			</div>
		</div>
	)
}