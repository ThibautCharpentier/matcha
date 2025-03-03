import profile from '../../../assets/images/img_profile.png';

export default function ConversationContact() {
	return (
		<div className='flex-grow overflow-y-auto'>
			<div style={{cursor: 'pointer'}} className="hover:bg-gray-100 flex flex-row w-full">
				<img src={profile} className="w-[17%] h-auto m-2 mx-3 rounded-full" style={{userSelect: 'none'}}/>
				<div className="flex flex-col items-start justify-center">
					<div className="text-lg">
						<p>Machin Truc</p>
					</div>
				</div>
			</div>
		</div>
	)
}
