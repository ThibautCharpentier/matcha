import { useState, useEffect } from "react";
import NotificationFilterBar from "./NotificationFilterBar";
import NotificationDisplay from "./NotificationDisplay";
import { useAuthentified } from "../AuthentifiedContext"
import axios from 'axios';
import { API_ROUTES } from '../../utils/constants';
import ClipLoader from "react-spinners/ClipLoader";

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
				<div className="flex flex-col items-center w-full p-2 mb-[6em] sm:mb-0">
					<NotificationFilterBar
						filterNotif={filterNotif}
						setFilterNotif={setFilterNotif}
					/>
					{notifs != null ?
						<NotificationDisplay
							filterNotif={filterNotif}
							notifs={notifs}
						/>
					:
						<div className="mt-6">
							<ClipLoader
								color="#fff"
								size={70}
							/>
						</div>
					}
				</div>
			</div>
		</>
	)
}
