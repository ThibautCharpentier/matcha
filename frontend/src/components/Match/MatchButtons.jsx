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
				<button onClick={ignoreMatch} className="btn-match flex justify-center items-center w-11 h-11 sm:w-12 sm:h-12 p-2 mr-2 sm:mr-3">
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
				<button onClick={likeMatch} className="btn-match flex justify-center items-center w-11 h-11 sm:w-12 sm:h-12 p-2 ml-2 sm:ml-3">
				<svg height="30px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#d81159" strokeWidth="0.00016"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.032"></g><g id="SVGRepo_iconCarrier"> <path d="M1.24264 8.24264L8 15L14.7574 8.24264C15.553 7.44699 16 6.36786 16 5.24264V5.05234C16 2.8143 14.1857 1 11.9477 1C10.7166 1 9.55233 1.55959 8.78331 2.52086L8 3.5L7.21669 2.52086C6.44767 1.55959 5.28338 1 4.05234 1C1.8143 1 0 2.8143 0 5.05234V5.24264C0 6.36786 0.44699 7.44699 1.24264 8.24264Z" fill="#d81159"></path> </g></svg>
				</button>
            </div>
        </div>
	)
}
