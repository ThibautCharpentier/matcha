import { useState } from "react";
import NotificationFilterBar from "./NotificationFilterBar";
import NotificationDisplay from "./NotificationDisplay";

export default function Notification({ notifs }) {
	const [filterNotif, setFilterNotif] = useState("tout");

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
