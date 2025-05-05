import { API_URL} from "../../utils/constants";
import profile from '../../assets/images/img_profile.png';

export default function UserProfile({userData, userIndex}) {
    const picture = userData[userIndex]?.picture_profile || "";

	function findLastConnection() {
		const last_connection = new Date(userData[userIndex].last_connection)
		const now = new Date()
		const diff_in_days = Math.floor((now - last_connection) / (1000 * 60 * 60 * 24))
		const diff_in_hours = Math.floor((now - last_connection) / (1000 * 60 * 60))
		const diff_in_minutes = Math.floor((now - last_connection) / (1000 * 60))
		const diff_in_seconds = Math.floor((now - last_connection) / 1000)


		if (diff_in_days < 1 && diff_in_hours < 1 && diff_in_minutes < 1)
			return (diff_in_seconds + " sec")
		if (diff_in_days < 1 && diff_in_hours < 1)
			return (diff_in_minutes + " min")
		if (diff_in_days < 1)
			return (diff_in_hours + " h")
		return (diff_in_days + " j")
	}

	return (
		<div className="w-full max-w-[400px] max-h-[550px] aspect-[8/11] sm:w-[400px] sm:h-[550px] bg-gray-700 flex flex-col rounded-3xl">
			<div className="bg-gray-700 rounded-3xl">
				<div className="flex flex-row space-x-3">
					{picture != "" ?
						<img
							src={`${API_URL}/${picture}`}
							className="w-[37.5%] h-auto m-4 border-2 border-white rounded-full"
							style={{userSelect: 'none'}}
							alt="Photo de profil"
						/>
					:
						<img
							src={profile}
							className="w-[37.5%] h-auto m-4 border-2 border-white rounded-full"
							style={{userSelect: 'none'}}
							alt="Photo de profil"
						/>
					}
					<div className="flex flex-col items-start justify-center text-white text-sm">
						<div>{userData[userIndex].firstname} {userData[userIndex].lastname}</div>
						<div>{userData[userIndex].age} ans</div>
						<div>{userData[userIndex].city}</div>
						<div className="flex space-x-1 flex-row mt-3">
							<svg className="translate-y-[3px]" height="15px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#d81159" strokeWidth="0.00016"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.032"></g><g id="SVGRepo_iconCarrier"> <path d="M1.24264 8.24264L8 15L14.7574 8.24264C15.553 7.44699 16 6.36786 16 5.24264V5.05234C16 2.8143 14.1857 1 11.9477 1C10.7166 1 9.55233 1.55959 8.78331 2.52086L8 3.5L7.21669 2.52086C6.44767 1.55959 5.28338 1 4.05234 1C1.8143 1 0 2.8143 0 5.05234V5.24264C0 6.36786 0.44699 7.44699 1.24264 8.24264Z" fill="#d81159"></path> </g></svg>
							<p>{Math.round((userData[userIndex].famerating * 100) * 100) / 100} %</p>
						</div>
						<div className="text-xs mt-3">
							{userData[userIndex].status == "online" ?
							<div className="flex space-x-1 flex-row">
								<svg className="translate-y-[3px]" height="10px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="8" cy="8" r="8" fill="#00cc00"></circle> </g></svg>
								<p>en ligne</p>
							</div>
							:
							<div className="flex space-x-1 flex-row">
								<p>dernière connexion il y a {findLastConnection()}</p>
							</div>}
						</div>
					</div>
				</div>
			</div>
			<div className="bg-white rounded-3xl flex-grow p-3 overflow-hidden">
				<div style={{ overflowY: 'auto'}} className="h-full p-1">
					<div className="text-xs flex flex-wrap gap-1">
						{userData[userIndex].tags && userData[userIndex].tags.map((tag, index) => (
							<div key={index} className="bg-gray-700 rounded-3xl p-1 text-white">#{tag}</div>
						))}
					</div>
					<div>
						<h3 className="text-gray-600 mt-5">A propos de moi</h3>
						<div className="mt-2">
							<p className="text-sm ">{userData[userIndex].bio}</p>
						</div>

					</div>
				</div>
			</div>
		</div>
	)
}
