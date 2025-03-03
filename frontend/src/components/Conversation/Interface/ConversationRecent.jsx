import profile from '../../../assets/images/img_profile.png';

export default function ConversationRecent() {
	return (
		<div className='flex-grow overflow-y-auto'>
			<div style={{cursor: 'pointer'}} className="hover:bg-gray-100 flex flex-row w-full">
				<img src={profile} className="w-[17%] h-auto m-2 mx-3 rounded-full" style={{userSelect: 'none'}}/>
				<div className="flex flex-col items-start justify-center">
					<div className="mb-1">
						<p>Machin Truc</p>
					</div>
					<div className="flex flex-row text-sm text-gray-500">
						<p>Message</p>
						<p className="mx-2"> - </p>
						<p>20h</p>
					</div>
				</div>
			</div>
		</div>
	)
}
