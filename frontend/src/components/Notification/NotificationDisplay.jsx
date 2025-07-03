import { API_URL} from "../../utils/constants";
import profile from '../../assets/images/img_profile.png';
import axios from 'axios';
import { API_ROUTES } from '../../utils/constants';

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

	const removeNotif = async (id_notif) => {
		axios.post(API_ROUTES.REMOVE_NOTIF, {target: id_notif}, {
			withCredentials: true,
		})
		.then((res) => {
			if (res.status != 200)
				throw new Error('Une erreur est survenue');
		})
		.catch((err) => {
			console.log(err);
		});
	}
	
	return (
		<div className="mt-6">
			{notifs && notifs.map((notif, index) => (
				(filterNotif === "vues" || filterNotif === "tout") && notif.action == "view" && (
					<div key={index} className="relative mt-1 flex flex-row bg-gray-50 w-full sm:w-[495px] rounded-full space-x-3">
						<div className="min-w-[17%] max-w-[20%] m-2 flex items-center justify-center">
							<div className="relative border-2 rounded-full border-gray-500 ">
								{notif.picture_profile ?
									<img style={{userSelect: 'none'}} src={`${API_URL}/${notif.picture_profile}`} className="rounded-full"/>
								:
									<img style={{userSelect: 'none'}} src={profile} className="rounded-full"/>
								}
								<div onClick={() => getProfileUser(notif.id_user)} className="z-10 absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
								</div>
							</div>
						</div>
						{notif.firstname.length + notif.lastname.length > 13 ? (
							<p className="self-center w-[60%]"><b className="break-all">{notif.firstname} {notif.lastname[0]}.</b> a <b>vu</b> votre profil</p>
						): (
							<p className="self-center w-[60%]"><b className="break-all">{notif.firstname} {notif.lastname}</b> a <b>vu</b> votre profil</p>
						)}
						<div className="w-[20%] self-center flex-grow flex justify-end">
							<p className="text-gray-500 text-sm mr-6 ml-4">{findTimeNotif(notif.created)}</p>
						</div>
						<div className="w-full absolute flex items-center justify-end -translate-x-3 inset-0 bg-black bg-opacity-50 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300">
							<svg onClick={() => removeNotif(notif.id)} className="w-12 h-12 sm:w-16 sm:h-16 -translate-x-5 cursor-pointer" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 2.75C11.0215 2.75 10.1871 3.37503 9.87787 4.24993C9.73983 4.64047 9.31134 4.84517 8.9208 4.70713C8.53026 4.56909 8.32557 4.1406 8.46361 3.75007C8.97804 2.29459 10.3661 1.25 12 1.25C13.634 1.25 15.022 2.29459 15.5365 3.75007C15.6745 4.1406 15.4698 4.56909 15.0793 4.70713C14.6887 4.84517 14.2602 4.64047 14.1222 4.24993C13.813 3.37503 12.9785 2.75 12 2.75Z" fill="#ffffff"></path> <path d="M2.75 6C2.75 5.58579 3.08579 5.25 3.5 5.25H20.5001C20.9143 5.25 21.2501 5.58579 21.2501 6C21.2501 6.41421 20.9143 6.75 20.5001 6.75H3.5C3.08579 6.75 2.75 6.41421 2.75 6Z" fill="#ffffff"></path> <path d="M5.91508 8.45011C5.88753 8.03681 5.53015 7.72411 5.11686 7.75166C4.70356 7.77921 4.39085 8.13659 4.41841 8.54989L4.88186 15.5016C4.96735 16.7844 5.03641 17.8205 5.19838 18.6336C5.36678 19.4789 5.6532 20.185 6.2448 20.7384C6.83639 21.2919 7.55994 21.5307 8.41459 21.6425C9.23663 21.75 10.2751 21.75 11.5607 21.75H12.4395C13.7251 21.75 14.7635 21.75 15.5856 21.6425C16.4402 21.5307 17.1638 21.2919 17.7554 20.7384C18.347 20.185 18.6334 19.4789 18.8018 18.6336C18.9637 17.8205 19.0328 16.7844 19.1183 15.5016L19.5818 8.54989C19.6093 8.13659 19.2966 7.77921 18.8833 7.75166C18.47 7.72411 18.1126 8.03681 18.0851 8.45011L17.6251 15.3492C17.5353 16.6971 17.4712 17.6349 17.3307 18.3405C17.1943 19.025 17.004 19.3873 16.7306 19.6431C16.4572 19.8988 16.083 20.0647 15.391 20.1552C14.6776 20.2485 13.7376 20.25 12.3868 20.25H11.6134C10.2626 20.25 9.32255 20.2485 8.60915 20.1552C7.91715 20.0647 7.54299 19.8988 7.26957 19.6431C6.99616 19.3873 6.80583 19.025 6.66948 18.3405C6.52891 17.6349 6.46488 16.6971 6.37503 15.3492L5.91508 8.45011Z" fill="#ffffff"></path> <path d="M9.42546 10.2537C9.83762 10.2125 10.2051 10.5132 10.2464 10.9254L10.7464 15.9254C10.7876 16.3375 10.4869 16.7051 10.0747 16.7463C9.66256 16.7875 9.29502 16.4868 9.25381 16.0746L8.75381 11.0746C8.71259 10.6625 9.0133 10.2949 9.42546 10.2537Z" fill="#ffffff"></path> <path d="M15.2464 11.0746C15.2876 10.6625 14.9869 10.2949 14.5747 10.2537C14.1626 10.2125 13.795 10.5132 13.7538 10.9254L13.2538 15.9254C13.2126 16.3375 13.5133 16.7051 13.9255 16.7463C14.3376 16.7875 14.7051 16.4868 14.7464 16.0746L15.2464 11.0746Z" fill="#ffffff"></path> </g></svg>
						</div>
					</div>
				) ||
				(filterNotif === "likes" || filterNotif === "tout") && (notif.action == "like" || notif.action == "unlike") && (
					<div key={index} className="relative mt-1 flex flex-row bg-gray-50 w-full sm:w-[495px] rounded-full space-x-3">
						<div className="min-w-[17%] max-w-[20%] m-2 flex items-center justify-center">
							<div className="relative border-2 rounded-full border-gray-500 ">
								{notif.picture_profile ?
									<img style={{userSelect: 'none'}} src={`${API_URL}/${notif.picture_profile}`} className="rounded-full"/>
								:
									<img style={{userSelect: 'none'}} src={profile} className="rounded-full"/>
								}
								<div onClick={() => getProfileUser(notif.id_user)} className="z-10 absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
								</div>
							</div>
						</div>
						{notif.firstname.length + notif.lastname.length > 13 ? (
							<p className="self-center w-[60%]"><b className="break-all">{notif.firstname} {notif.lastname[0]}.</b> a <b>{notif.action}</b> votre profil</p>
						): (
							<p className="self-center w-[60%]"><b className="break-all">{notif.firstname} {notif.lastname}</b> a <b>{notif.action}</b> votre profil</p>
						)}
						<div className="w-[20%] self-center flex-grow flex justify-end">
							<p className="text-gray-500 text-sm mr-6 ml-4">{findTimeNotif(notif.created)}</p>
						</div>
						<div className="w-full absolute flex items-center justify-end -translate-x-3 inset-0 bg-black bg-opacity-50 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300">
							<svg onClick={() => removeNotif(notif.id)} className="w-12 h-12 sm:w-16 sm:h-16 -translate-x-5 cursor-pointer" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 2.75C11.0215 2.75 10.1871 3.37503 9.87787 4.24993C9.73983 4.64047 9.31134 4.84517 8.9208 4.70713C8.53026 4.56909 8.32557 4.1406 8.46361 3.75007C8.97804 2.29459 10.3661 1.25 12 1.25C13.634 1.25 15.022 2.29459 15.5365 3.75007C15.6745 4.1406 15.4698 4.56909 15.0793 4.70713C14.6887 4.84517 14.2602 4.64047 14.1222 4.24993C13.813 3.37503 12.9785 2.75 12 2.75Z" fill="#ffffff"></path> <path d="M2.75 6C2.75 5.58579 3.08579 5.25 3.5 5.25H20.5001C20.9143 5.25 21.2501 5.58579 21.2501 6C21.2501 6.41421 20.9143 6.75 20.5001 6.75H3.5C3.08579 6.75 2.75 6.41421 2.75 6Z" fill="#ffffff"></path> <path d="M5.91508 8.45011C5.88753 8.03681 5.53015 7.72411 5.11686 7.75166C4.70356 7.77921 4.39085 8.13659 4.41841 8.54989L4.88186 15.5016C4.96735 16.7844 5.03641 17.8205 5.19838 18.6336C5.36678 19.4789 5.6532 20.185 6.2448 20.7384C6.83639 21.2919 7.55994 21.5307 8.41459 21.6425C9.23663 21.75 10.2751 21.75 11.5607 21.75H12.4395C13.7251 21.75 14.7635 21.75 15.5856 21.6425C16.4402 21.5307 17.1638 21.2919 17.7554 20.7384C18.347 20.185 18.6334 19.4789 18.8018 18.6336C18.9637 17.8205 19.0328 16.7844 19.1183 15.5016L19.5818 8.54989C19.6093 8.13659 19.2966 7.77921 18.8833 7.75166C18.47 7.72411 18.1126 8.03681 18.0851 8.45011L17.6251 15.3492C17.5353 16.6971 17.4712 17.6349 17.3307 18.3405C17.1943 19.025 17.004 19.3873 16.7306 19.6431C16.4572 19.8988 16.083 20.0647 15.391 20.1552C14.6776 20.2485 13.7376 20.25 12.3868 20.25H11.6134C10.2626 20.25 9.32255 20.2485 8.60915 20.1552C7.91715 20.0647 7.54299 19.8988 7.26957 19.6431C6.99616 19.3873 6.80583 19.025 6.66948 18.3405C6.52891 17.6349 6.46488 16.6971 6.37503 15.3492L5.91508 8.45011Z" fill="#ffffff"></path> <path d="M9.42546 10.2537C9.83762 10.2125 10.2051 10.5132 10.2464 10.9254L10.7464 15.9254C10.7876 16.3375 10.4869 16.7051 10.0747 16.7463C9.66256 16.7875 9.29502 16.4868 9.25381 16.0746L8.75381 11.0746C8.71259 10.6625 9.0133 10.2949 9.42546 10.2537Z" fill="#ffffff"></path> <path d="M15.2464 11.0746C15.2876 10.6625 14.9869 10.2949 14.5747 10.2537C14.1626 10.2125 13.795 10.5132 13.7538 10.9254L13.2538 15.9254C13.2126 16.3375 13.5133 16.7051 13.9255 16.7463C14.3376 16.7875 14.7051 16.4868 14.7464 16.0746L15.2464 11.0746Z" fill="#ffffff"></path> </g></svg>
						</div>
					</div>
				) ||
				(filterNotif === "matchs" || filterNotif === "tout") && notif.action == "match" && (
					<div key={index} className="relative mt-1 flex flex-row bg-gray-50 w-full sm:w-[495px] rounded-full space-x-3">
						<div className="min-w-[17%] max-w-[20%] m-2 flex items-center justify-center">
							<div className="relative border-2 rounded-full border-gray-500 ">
								{notif.picture_profile ?
									<img style={{userSelect: 'none'}} src={`${API_URL}/${notif.picture_profile}`} className="rounded-full"/>
								:
									<img style={{userSelect: 'none'}} src={profile} className="rounded-full"/>
								}
								<div onClick={() => getProfileUser(notif.id_user)} className="z-10 absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
								</div>
							</div>
						</div>
						{notif.firstname.length + notif.lastname.length > 13 ? (
							<p className="self-center w-[60%]"><b className="break-all">{notif.firstname} {notif.lastname[0]}.</b><b> match</b> avec vous</p>
						): (
							<p className="self-center w-[60%]"><b className="break-all">{notif.firstname} {notif.lastname}</b> <b> match</b> avec vous</p>
						)}
						<div className="w-[20%] self-center flex-grow flex justify-end">
							<p className="text-gray-500 text-sm mr-6 ml-4">{findTimeNotif(notif.created)}</p>
						</div>
						<div className="w-full absolute flex items-center justify-end -translate-x-3 inset-0 bg-black bg-opacity-50 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300">
							<svg onClick={() => removeNotif(notif.id)} className="w-12 h-12 sm:w-16 sm:h-16 -translate-x-5 cursor-pointer" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 2.75C11.0215 2.75 10.1871 3.37503 9.87787 4.24993C9.73983 4.64047 9.31134 4.84517 8.9208 4.70713C8.53026 4.56909 8.32557 4.1406 8.46361 3.75007C8.97804 2.29459 10.3661 1.25 12 1.25C13.634 1.25 15.022 2.29459 15.5365 3.75007C15.6745 4.1406 15.4698 4.56909 15.0793 4.70713C14.6887 4.84517 14.2602 4.64047 14.1222 4.24993C13.813 3.37503 12.9785 2.75 12 2.75Z" fill="#ffffff"></path> <path d="M2.75 6C2.75 5.58579 3.08579 5.25 3.5 5.25H20.5001C20.9143 5.25 21.2501 5.58579 21.2501 6C21.2501 6.41421 20.9143 6.75 20.5001 6.75H3.5C3.08579 6.75 2.75 6.41421 2.75 6Z" fill="#ffffff"></path> <path d="M5.91508 8.45011C5.88753 8.03681 5.53015 7.72411 5.11686 7.75166C4.70356 7.77921 4.39085 8.13659 4.41841 8.54989L4.88186 15.5016C4.96735 16.7844 5.03641 17.8205 5.19838 18.6336C5.36678 19.4789 5.6532 20.185 6.2448 20.7384C6.83639 21.2919 7.55994 21.5307 8.41459 21.6425C9.23663 21.75 10.2751 21.75 11.5607 21.75H12.4395C13.7251 21.75 14.7635 21.75 15.5856 21.6425C16.4402 21.5307 17.1638 21.2919 17.7554 20.7384C18.347 20.185 18.6334 19.4789 18.8018 18.6336C18.9637 17.8205 19.0328 16.7844 19.1183 15.5016L19.5818 8.54989C19.6093 8.13659 19.2966 7.77921 18.8833 7.75166C18.47 7.72411 18.1126 8.03681 18.0851 8.45011L17.6251 15.3492C17.5353 16.6971 17.4712 17.6349 17.3307 18.3405C17.1943 19.025 17.004 19.3873 16.7306 19.6431C16.4572 19.8988 16.083 20.0647 15.391 20.1552C14.6776 20.2485 13.7376 20.25 12.3868 20.25H11.6134C10.2626 20.25 9.32255 20.2485 8.60915 20.1552C7.91715 20.0647 7.54299 19.8988 7.26957 19.6431C6.99616 19.3873 6.80583 19.025 6.66948 18.3405C6.52891 17.6349 6.46488 16.6971 6.37503 15.3492L5.91508 8.45011Z" fill="#ffffff"></path> <path d="M9.42546 10.2537C9.83762 10.2125 10.2051 10.5132 10.2464 10.9254L10.7464 15.9254C10.7876 16.3375 10.4869 16.7051 10.0747 16.7463C9.66256 16.7875 9.29502 16.4868 9.25381 16.0746L8.75381 11.0746C8.71259 10.6625 9.0133 10.2949 9.42546 10.2537Z" fill="#ffffff"></path> <path d="M15.2464 11.0746C15.2876 10.6625 14.9869 10.2949 14.5747 10.2537C14.1626 10.2125 13.795 10.5132 13.7538 10.9254L13.2538 15.9254C13.2126 16.3375 13.5133 16.7051 13.9255 16.7463C14.3376 16.7875 14.7051 16.4868 14.7464 16.0746L15.2464 11.0746Z" fill="#ffffff"></path> </g></svg>
						</div>
					</div>
				)
			))}
		</div>
	)
}
