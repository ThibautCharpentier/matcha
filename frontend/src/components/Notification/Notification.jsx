import { useState, useEffect } from "react";
import NotificationFilterBar from "./NotificationFilterBar";
import NotificationDisplay from "./NotificationDisplay";
import { useAuthentified } from "../AuthentifiedContext"
import axios from 'axios';
import { API_ROUTES } from '../../utils/constants';

export default function Notification() {
	const { notifs, hasNewNotif, setHasNewNotif } = useAuthentified();
	const [filterNotif, setFilterNotif] = useState("tout");

	useEffect(() => {
		if (hasNewNotif) {
			axios.patch(API_ROUTES.NOTIF_VERIFIED, null, {
				withCredentials: true,
			})
			.then((res) => {
				if (res.status != 200)
					throw new Error('Une erreur est survenue');
				setHasNewNotif(false)
			})
			.catch((err) => {
				console.log(err);
			});
		}
	}, [hasNewNotif]);

	return (
		<>
			<div className="w-full">
				<div className="flex flex-col items-center w-full mt-6 p-2 mb-[6em] sm:mb-0">
					<h1 className="text-5xl text-center font-poppins-bold">Notifications</h1>
					<NotificationFilterBar
						filterNotif={filterNotif}
						setFilterNotif={setFilterNotif}
					/>
					<NotificationDisplay
						filterNotif={filterNotif}
						notifs={notifs}
					/>
				</div>
			</div>
		</>
	)
}
