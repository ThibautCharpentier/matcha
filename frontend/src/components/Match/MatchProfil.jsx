import profile from '../../assets/images/img_profile.png';

export default function MatchProfil() {
	return (
		<div className="w-[95vw] max-w-[400px] aspect-[8/11] sm:w-[400px] sm:h-[550px] mt-6 bg-gray-700 flex flex-col rounded-3xl">
			<div className="bg-gray-700 rounded-3xl">
				<div className="flex flex-row space-x-3">
					<img src={profile} className="w-[37.5%] h-auto m-4 border-2 border-white rounded-full" style={{userSelect: 'none'}}/>
					<div className="flex flex-col items-start justify-center text-white text-sm">
						<div>Prénom NOM</div>
						<div>âge</div>
						<div>Ville</div>
					</div>
				</div>
			</div>
			<div className="bg-white rounded-3xl flex-grow p-4">
				intérêts + bio
			</div>
		</div>
	)
}
