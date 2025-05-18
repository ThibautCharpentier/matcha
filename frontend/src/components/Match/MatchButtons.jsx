import axios from 'axios';
import { API_ROUTES } from "../../utils/constants";

export default function MatchButtons({toggleProfile, switchToggleProfile, matchState, matchIndexState, setMatchIndexState, isResearch}) {

	function ignoreMatch() {
		if (isResearch)
			setMatchIndexState(matchIndexState + 1)
		else
		{
			const obj = {
				target: matchState[matchIndexState].id
			}
			axios.post(API_ROUTES.DISLIKE, obj, {
				withCredentials: true,
			})
			.then((res) => {
				if (res.status != 200)
					throw new Error('Une erreur est survenue');
				if (toggleProfile)
					switchToggleProfile()
				setMatchIndexState(matchIndexState + 1)
			})
			.catch((err) => {
				console.log(err)
			});
		}
	}

	function likeMatch() {
		const obj = {
			target: matchState[matchIndexState].id
		}
		axios.post(API_ROUTES.LIKE, obj, {
			withCredentials: true,
		})
		.then((res) => {
			if (res.status != 200)
				throw new Error('Une erreur est survenue');
			if (toggleProfile)
				switchToggleProfile()
			setMatchIndexState(matchIndexState + 1)
		})
		.catch((err) => {
			console.log(err)
		});
	}

	function checkProfile() {
		const obj = {
			target: matchState[matchIndexState].id
		}
		axios.post(API_ROUTES.VIEW, obj, {
			withCredentials: true,
		})
		.then((res) => {
			if (res.status != 200)
				throw new Error('Une erreur est survenue');
			switchToggleProfile()
		})
		.catch((err) => {
			console.log(err)
		});
	}
	
	return (
		<div className="bg-gray-200 w-full rounded-3xl max-h-[60px] aspect-[20/3] sm:h-[60px] justify-center flex items-center">
            <div className="text-gray-500 flex flex-row items-center justify-between">
				<button onClick={ignoreMatch} className="btn-match shadow-md flex justify-center items-center w-11 h-11 sm:w-12 sm:h-12 p-2 mr-2 sm:mr-3">
				<svg fill="#6c757d" height="45px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.8,16l5.5-5.5c0.8-0.8,0.8-2,0-2.8l0,0C24,7.3,23.5,7,23,7c-0.5,0-1,0.2-1.4,0.6L16,13.2l-5.5-5.5 c-0.8-0.8-2.1-0.8-2.8,0C7.3,8,7,8.5,7,9.1s0.2,1,0.6,1.4l5.5,5.5l-5.5,5.5C7.3,21.9,7,22.4,7,23c0,0.5,0.2,1,0.6,1.4 C8,24.8,8.5,25,9,25c0.5,0,1-0.2,1.4-0.6l5.5-5.5l5.5,5.5c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8L18.8,16z"></path> </g></svg>
				</button>
                <span className={`${toggleProfile && "text-gray-900"} text-sm sm:text-base px-2 sm:px-3`}>Profil</span>
                <button onClick={() => {
					if (!toggleProfile)
						checkProfile()
					else
						switchToggleProfile()
				}}
                    className="relative w-16 h-6 sm:w-24 sm:h-8 bg-pink-600 rounded-full"
                >
                <div
                    className={`absolute top-1 left-1 w-6 h-4 sm:w-10 sm:h-6 bg-white rounded-full shadow transition-transform duration-300 ${
                    toggleProfile ? "translate-x-0" : "translate-x-[calc(100%+0.5rem)]"
                    }`}
                ></div>
                </button>
                <span className={`${!toggleProfile && "text-gray-900"} text-sm sm:text-base px-2 sm:px-3`}>Photos</span>
				<button onClick={likeMatch} className="btn-match shadow-md flex justify-center items-center w-11 h-11 sm:w-12 sm:h-12 p-2 ml-2 sm:ml-3">
				<svg height="45px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M5.62436 4.4241C3.96537 5.18243 2.75 6.98614 2.75 9.13701C2.75 11.3344 3.64922 13.0281 4.93829 14.4797C6.00072 15.676 7.28684 16.6675 8.54113 17.6345C8.83904 17.8642 9.13515 18.0925 9.42605 18.3218C9.95208 18.7365 10.4213 19.1004 10.8736 19.3647C11.3261 19.6292 11.6904 19.7499 12 19.7499C12.3096 19.7499 12.6739 19.6292 13.1264 19.3647C13.5787 19.1004 14.0479 18.7365 14.574 18.3218C14.8649 18.0925 15.161 17.8642 15.4589 17.6345C16.7132 16.6675 17.9993 15.676 19.0617 14.4797C20.3508 13.0281 21.25 11.3344 21.25 9.13701C21.25 6.98614 20.0346 5.18243 18.3756 4.4241C16.7639 3.68739 14.5983 3.88249 12.5404 6.02065C12.399 6.16754 12.2039 6.25054 12 6.25054C11.7961 6.25054 11.601 6.16754 11.4596 6.02065C9.40166 3.88249 7.23607 3.68739 5.62436 4.4241ZM12 4.45873C9.68795 2.39015 7.09896 2.10078 5.00076 3.05987C2.78471 4.07283 1.25 6.42494 1.25 9.13701C1.25 11.8025 2.3605 13.836 3.81672 15.4757C4.98287 16.7888 6.41022 17.8879 7.67083 18.8585C7.95659 19.0785 8.23378 19.292 8.49742 19.4998C9.00965 19.9036 9.55954 20.3342 10.1168 20.6598C10.6739 20.9853 11.3096 21.2499 12 21.2499C12.6904 21.2499 13.3261 20.9853 13.8832 20.6598C14.4405 20.3342 14.9903 19.9036 15.5026 19.4998C15.7662 19.292 16.0434 19.0785 16.3292 18.8585C17.5898 17.8879 19.0171 16.7888 20.1833 15.4757C21.6395 13.836 22.75 11.8025 22.75 9.13701C22.75 6.42494 21.2153 4.07283 18.9992 3.05987C16.901 2.10078 14.3121 2.39015 12 4.45873Z" fill="#d81159"></path> </g></svg>
				</button>
            </div>
        </div>
	)
}
