import { useState, useEffect } from 'react';
import AllMessages from './AllMessages';
import profile from '../../../assets/images/img_profile.png';
import { API_URL } from '../../../utils/constants';
import InputNewMessage from './InputNewMessage';
import BackEndMessages from './BackEndMessages';

export default function ConversationMessage({roomSelected}) {
	const [windowSize, setWindowSize] = useState(window.innerWidth);
	const pathPicture = API_URL + "/" + roomSelected?.contact_picture_profile;

	useEffect(() => {
		function handleResize() {
			setWindowSize(window.innerWidth);
		}
	
		window.addEventListener('resize', handleResize);
	
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<>
			{windowSize > 640 && <div className="border-gray-300 border-l-[1px] flex flex-col justify-center h-screen sm:w-7/12 lg:w-3/4 text-center">
				{roomSelected === null ? (
					<div>Sélectionnez un contact pour afficher la conversation</div>
				): (
					<div className='h-screen flex flex-col justify-end'>
						<div className='flex flex-row border-gray-300 border-b-[1px]'>
							<img src={roomSelected.contact_picture_profile ? pathPicture : profile} className="w-12 h-auto m-2 mx-3 rounded-full" style={{userSelect: 'none'}}/>
							<p className='self-center '>{roomSelected.contact_firstname} {roomSelected.contact_lastname}</p>
						</div>	
						<div className='flex-1 overflow-y-auto px-4 scroll-container relative'>
							<AllMessages 
								roomId={roomSelected.room_id}
								roomSelected={roomSelected}
							/>
						</div>
						<InputNewMessage roomSelected={roomSelected}/>
					</div>
				)}
			</div>}
		</>
	)
}
