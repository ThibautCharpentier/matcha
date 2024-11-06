export default function NotificationFilterBar({filterNotif, setFilterNotif}) {
	return (
		<>
			<div className="w-full sm:w-auto mt-6 flex flex-row bg-gray-50 text-gray-500 rounded-lg py-1">
				<button onClick={() => {setFilterNotif("tout")}} className="w-1/4 sm:mx-11">
					{(filterNotif == "tout" ?
						<span className="text-gray-900">Tout</span>
						:
						<span className="hover:text-gray-900">Tout</span>)}
				</button>
				<button onClick={() => {setFilterNotif("matchs")}}  className="w-1/4 sm:mx-11">
					{(filterNotif == "matchs" ?
						<span className="text-gray-900">Matchs</span>
						:
						<span className="hover:text-gray-900">Matchs</span>)}
				</button>
				<button onClick={() => {setFilterNotif("likes")}}  className="w-1/4 sm:mx-11">
					{(filterNotif == "likes" ?
						<span className="text-gray-900">Likes</span>
						:
						<span className="hover:text-gray-900">Likes</span>)}
				</button>
				<button onClick={() => {setFilterNotif("vues")}}  className="w-1/4 sm:mx-11">
					{(filterNotif == "vues" ?
						<span className="text-gray-900">Vues</span>
						:
						<span className="hover:text-gray-900">Vues</span>)}
				</button>
			</div>
		</>
	)
}
