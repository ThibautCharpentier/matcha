import axios from 'axios';
import { API_ROUTES } from "../../../utils/constants";

export default function ReportListButtons({token, toggleProfile, switchToggleProfile, reportState, reportIndexState, setReportIndexState}) {

	function deleteReport() {
		const obj = {
			target: reportState[reportIndexState].id
		}
		axios.post(`${API_ROUTES.DELETE_REPORT}?adminToken=${token}`, obj, {
			withCredentials: true,
		})
		.then((res) => {
			if (res.status != 200)
				throw new Error('Une erreur est survenue');
			if (toggleProfile)
				switchToggleProfile()
			setReportIndexState(reportIndexState + 1)
		})
		.catch((err) => {
			console.log(err)
		});
	}

	function confirmReport() {
		const obj = {
			target: reportState[reportIndexState].id
		}
		axios.post(`${API_ROUTES.CONFIRM_REPORT}?adminToken=${token}`, obj, {
			withCredentials: true,
		})
		.then((res) => {
			if (res.status != 200)
				throw new Error('Une erreur est survenue');
			if (toggleProfile)
				switchToggleProfile()
			setReportIndexState(reportIndexState + 1)
		})
		.catch((err) => {
			console.log(err)
		});
	}
	
	return (
		<div className="bg-gray-200 w-full rounded-3xl max-h-[60px] aspect-[20/3] sm:h-[60px] justify-center flex items-center">
            <div className="text-gray-500 flex flex-row items-center justify-between">
				<button onClick={confirmReport} className="btn-match shadow-md flex justify-center items-center w-11 h-11 sm:w-12 sm:h-12 p-2 mr-2 sm:mr-3">
				<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.364 18.364C19.9926 16.7353 21 14.4853 21 12C21 7.02944 16.9706 3 12 3C9.51472 3 7.26472 4.00736 5.63604 5.63604M18.364 18.364C16.7353 19.9926 14.4853 21 12 21C7.02944 21 3 16.9706 3 12C3 9.51472 4.00736 7.26472 5.63604 5.63604M18.364 18.364L5.63604 5.63604" stroke="#cc0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
				</button>
                <span className={`${toggleProfile && "text-gray-900"} text-sm sm:text-base px-2 sm:px-3`}>Profil</span>
                <button onClick={switchToggleProfile}
                    className="relative w-16 h-6 sm:w-24 sm:h-8 bg-pink-600 rounded-full"
                >
                <div
                    className={`absolute top-1 left-1 w-6 h-4 sm:w-10 sm:h-6 bg-white rounded-full shadow transition-transform duration-300 ${
                    toggleProfile ? "translate-x-0" : "translate-x-[calc(100%+0.5rem)]"
                    }`}
                ></div>
                </button>
                <span className={`${!toggleProfile && "text-gray-900"} text-sm sm:text-base px-2 sm:px-3`}>Photos</span>
				<button onClick={deleteReport} className="btn-match shadow-md flex justify-center items-center w-11 h-11 sm:w-12 sm:h-12 p-2 ml-2 sm:ml-3">
				<svg fill="#6c757d" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" stroke="#6c757d" strokeWidth="15.36"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M478,256,302,432l-21.21-21.2L420.6,271H34V241H420.6L280.75,101.16,302,80Z"></path></g></svg>
				</button>
            </div>
        </div>
	)
}
