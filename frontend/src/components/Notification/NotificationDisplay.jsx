import { API_URL} from "../../utils/constants";
import profile from '../../assets/images/img_profile.png';

export default function NotificationDisplay({filterNotif, notifs, getProfileUser}) {
	function findTimeNotif(dateNotif) {
		const last_connection = new Date(dateNotif)
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
		<div className="mt-6">
			{notifs && notifs.map((notif, index) => (
				(filterNotif === "vues" || filterNotif === "tout") && notif.action == "view" && (
					<div key={index} className="mt-1 flex flex-row bg-gray-50 w-full sm:w-[495px] rounded-full space-x-3">
						<div className="relative min-w-[17%] max-w-[20%] h-auto m-2 border-2 border-gray-500 rounded-full">
							{notif.picture_profile ?
								<img style={{userSelect: 'none'}} src={`${API_URL}/${notif.picture_profile}`} className="rounded-full"/>
							:
								<img style={{userSelect: 'none'}} src={profile} className="rounded-full"/>
							}
							<div onClick={() => getProfileUser(notif.id_user)} className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
							</div>
						</div>
						<p className="self-center"><b>{notif.firstname} {notif.lastname}</b> a <b>vu</b> votre profil</p>
						<div className="w-[33%] self-center flex-grow flex justify-end">
							<p className="text-gray-500 text-sm mr-6 ml-4">{findTimeNotif(notif.created)}</p>
						</div>
					</div>
				) ||
				(filterNotif === "likes" || filterNotif === "tout") && notif.action == "like" && (
					<div key={index} className="mt-1 flex flex-row bg-gray-50 w-full sm:w-[495px] rounded-full space-x-3">
						<div className="relative min-w-[17%] max-w-[20%] h-auto m-2 border-2 border-gray-500 rounded-full">
							{notif.picture_profile ?
								<img style={{userSelect: 'none'}} src={`${API_URL}/${notif.picture_profile}`} className="rounded-full"/>
							:
								<img style={{userSelect: 'none'}} src={profile} className="rounded-full"/>
							}
							<div onClick={() => getProfileUser(notif.id_user)} className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
							</div>
						</div>
						<p className="self-center"><b>{notif.firstname} {notif.lastname}</b> a <b>like</b> votre profil</p>
						<div className="w-[33%] self-center flex-grow flex justify-end">
							<p className="text-gray-500 text-sm mr-6 ml-4">{findTimeNotif(notif.created)}</p>
						</div>
					</div>
				) ||
				(filterNotif === "matchs" || filterNotif === "tout") && notif.action == "match" && (
					<div key={index} className="mt-1 flex flex-row bg-gray-50 w-full sm:w-[495px] rounded-full space-x-3">
						<div className="relative min-w-[17%] max-w-[20%] h-auto m-2 border-2 border-gray-500 rounded-full">
							{notif.picture_profile ?
								<img style={{userSelect: 'none'}} src={`${API_URL}/${notif.picture_profile}`} className="rounded-full"/>
							:
								<img style={{userSelect: 'none'}} src={profile} className="rounded-full"/>
							}
							<div onClick={() => getProfileUser(notif.id_user)} className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
							</div>
						</div>
						<p className="self-center"><b>{notif.firstname} {notif.lastname}</b> <b>match</b> avec vous</p>
						<div className="w-[33%] self-center flex-grow flex justify-end">
							<p className="text-gray-500 text-sm mr-6 ml-4">{findTimeNotif(notif.created)}</p>
						</div>
					</div>
				)
			))}
		</div>
	)
}
