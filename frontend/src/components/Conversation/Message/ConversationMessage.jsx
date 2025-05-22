import { useState, useEffect } from 'react';
import AllMessages from './AllMessages';
import profile from '../../../assets/images/img_profile.png';
import { API_URL } from '../../../utils/constants';
import InputNewMessage from './InputNewMessage';
import BackEndMessages from './BackEndMessages';
import BtnUnlikeBlockReport from '../../ActionWithUser/BtnUnlikeBlockReport';

export default function ConversationMessage({roomSelected, setRoomSelected}) {
	const pathPicture = API_URL + "/" + roomSelected?.contact_picture_profile;
	console.log(roomSelected)
	

	return (
		<>
			<div className={`w-full border-gray-300 sm:border-l-[1px] h-[100dvh] sm:flex sm:flex-col justify-center  sm:w-7/12 lg:w-3/4 text-center ${roomSelected === null ? 'hidden' : 'flex flex-col' }`}>
				{roomSelected === null ? (
					<div>Sélectionnez un contact pour afficher la conversation</div>
				): (
					<div className='h-full flex flex-col'>
						<div className='flex flex-row border-gray-300 border-b-[1px] justify-between'>
							<div className='flex'>
								<svg 
									onClick={() => {setRoomSelected(null)}}
									className='ml-2 sm:hidden cursor-pointer'
									width="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M10.5303 5.46967C10.8232 5.76256 10.8232 6.23744 10.5303 6.53033L5.81066 11.25H20C20.4142 11.25 20.75 11.5858 20.75 12C20.75 12.4142 20.4142 12.75 20 12.75H5.81066L10.5303 17.4697C10.8232 17.7626 10.8232 18.2374 10.5303 18.5303C10.2374 18.8232 9.76256 18.8232 9.46967 18.5303L3.46967 12.5303C3.17678 12.2374 3.17678 11.7626 3.46967 11.4697L9.46967 5.46967C9.76256 5.17678 10.2374 5.17678 10.5303 5.46967Z" fill="#000000"></path> </g>
								</svg>
								<img src={roomSelected.contact_picture_profile ? pathPicture : profile} className="w-12 h-auto m-2 mx-3 rounded-full" style={{userSelect: 'none'}}/>
								<p className='self-center '>{roomSelected.contact_firstname} {roomSelected.contact_lastname}</p>
							</div>
							<div className='flex items-center mr-2 '>
								<BtnUnlikeBlockReport 
									roomSelected={roomSelected}
									setRoomSelected={setRoomSelected}
									idContact={roomSelected.contact_id}
									functionDeleteContact={() => {
										setRoomSelected(null)
									}}
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
