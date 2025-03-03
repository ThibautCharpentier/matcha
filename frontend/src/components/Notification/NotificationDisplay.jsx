import profile from '../../assets/images/img_profile.png';

export default function NotificationDisplay({filterNotif, notifs}) {
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
						<img src={profile} className="w-[17%] h-auto m-2 border-2 border-gray-500 rounded-full" style={{userSelect: 'none'}}/>
						<p className="self-center"><b>{notif.firstname} {notif.lastname}</b> a <b>vu</b> votre profil</p>
						<div className="w-[33%] self-center flex-grow flex justify-end">
							<p className="text-gray-500 text-sm mr-6 ml-4">{findTimeNotif(notif.created)}</p>
						</div>
					</div>
				) ||
				(filterNotif === "likes" || filterNotif === "tout") && notif.action == "like" && (
					<div key={index} className="mt-1 flex flex-row bg-gray-50 w-full sm:w-[495px] rounded-full space-x-3">
						<img src={profile} className="w-[17%] h-auto m-2 border-2 border-gray-500 rounded-full" style={{userSelect: 'none'}}/>
						<p className="self-center"><b>{notif.firstname} {notif.lastname}</b> a <b>like</b> votre profil</p>
						<div className="w-[33%] self-center flex-grow flex justify-end">
							<p className="text-gray-500 text-sm mr-6 ml-4">{findTimeNotif(notif.created)}</p>
						</div>
					</div>
				) ||
				(filterNotif === "matchs" || filterNotif === "tout") && notif.action == "match" && (
					<div key={index} className="mt-1 flex flex-row bg-gray-50 w-full sm:w-[495px] rounded-full space-x-3">
						<img src={profile} className="w-[17%] h-auto m-2 border-2 border-gray-500 rounded-full" style={{userSelect: 'none'}}/>
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
