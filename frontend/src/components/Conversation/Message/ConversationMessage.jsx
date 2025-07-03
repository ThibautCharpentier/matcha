import { useState, useEffect, useRef } from 'react';
import AllMessages from './AllMessages';
import profile from '../../../assets/images/img_profile.png';
import { API_URL } from '../../../utils/constants';
import InputNewMessage from './InputNewMessage';
import BtnUnlikeBlockReport from '../../ActionWithUser/BtnUnlikeBlockReport';
import NameBlock from '../../Profile/NameBlock';

export default function ConversationMessage({roomSelected, setRoomSelected, getProfileUser}) {
	const pathPicture = API_URL + "/" + roomSelected?.contact_picture_profile;
	const nameRef = useRef(null);
		const [isOverflowing, setIsOverflowing] = useState(false);
		const [showTooltip, setShowTooltip] = useState(false);
		const [windowWidth, setWindowWidth] = useState(window.innerWidth);

		const truncLastMessage = (message) => {
		let truncMessage = message.slice(0, 20);
		if (message.length > 20)
			truncMessage = truncMessage + "...";
		console.log(message);
		console.log(truncMessage)
		return truncMessage;
	}
	
		const getTruncatedName = (firstname, lastname, width) => {
		let maxChars = 15; // default

		if (width < 640) maxChars = 10;       // xs
		else if (width < 768) maxChars = 15;  // sm
		else if (width < 1024) maxChars = 20; // md
		else if (width < 1280) maxChars = 25; // lg
		else maxChars = 30;                   // xl

		const fullName = `${firstname} ${lastname[0]}.`;
		return fullName.length > maxChars
			? fullName.slice(0, maxChars) + "..."
			: fullName;
	};
		
		useEffect(() => {
			const el = nameRef.current;
			if (el && el.scrollWidth > el.clientWidth) {
				setIsOverflowing(true);
			} else {
				setIsOverflowing(false);
			}
		}, [roomSelected?.contact_firstname, roomSelected?.contact_lastname]);
		
			useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<>
			<div className={`w-full border-gray-300 md:border-l-[1px] h-[100dvh] md:flex md:flex-col justify-center  text-center ${roomSelected === null ? 'hidden' : 'flex flex-col' }`}>
				{roomSelected === null ? (
					<div>Sélectionnez un contact pour afficher la conversation</div>
				): (
						<div className='w-full h-full flex flex-col'>
							<div className='w-full flex flex-row items-center border-gray-300 border-b-[1px]'>
								<svg 
									onClick={() => {setRoomSelected(null)}}
									className='ml-2 md:hidden cursor-pointer'
									width="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M10.5303 5.46967C10.8232 5.76256 10.8232 6.23744 10.5303 6.53033L5.81066 11.25H20C20.4142 11.25 20.75 11.5858 20.75 12C20.75 12.4142 20.4142 12.75 20 12.75H5.81066L10.5303 17.4697C10.8232 17.7626 10.8232 18.2374 10.5303 18.5303C10.2374 18.8232 9.76256 18.8232 9.46967 18.5303L3.46967 12.5303C3.17678 12.2374 3.17678 11.7626 3.46967 11.4697L9.46967 5.46967C9.76256 5.17678 10.2374 5.17678 10.5303 5.46967Z" fill="#000000"></path> </g>
								</svg>
								<div onClick={() => getProfileUser(roomSelected.contact_id)} style={{cursor: 'pointer'}} className='flex hover:bg-gray-100'>
									<img src={roomSelected.contact_picture_profile ? pathPicture : profile} className="w-24 m-2 mx-3 rounded-full" style={{userSelect: 'none'}}/>
									<p className="self-center text-left">
										{getTruncatedName(roomSelected.contact_firstname, roomSelected.contact_lastname, windowWidth)}
									</p>
								</div>
								<div className='flex items-center mr-2 ml-auto'>
									<BtnUnlikeBlockReport 
										isLikeState="like"
										idContact={roomSelected.contact_id}
										functionDeleteContact={() => {
											setRoomSelected(null)
										}}
										color="#000000"
									/>
								</div>
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
			</div>
		</>
	)
}
