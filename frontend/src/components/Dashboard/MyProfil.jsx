import { useState, useRef, useEffect } from "react";
import PicturesSlider from "../Profile/PicturesSlider";
import MatchProfil from "../Profile/UserProfile";
import ProfileDash from "./ProfileDash";
import ModifyProfile from "./ModifyProfile";
import axios from 'axios';
import { API_ROUTES } from "../../utils/constants";


export default function MyProfil() {
	const hasFetched = useRef(false);
	const [toggleProfile, setToggleProfile] = useState(false);
	const [toggleEditProfil, setToggleEditProfil] = useState(false)
	const [matchIndexState, setMatchIndexState] = useState(0);
	const [matchState, setMatchState] = useState([]);

	const switchToggleProfile = () => {
		setToggleProfile((prevState) => !prevState);
	}

	if (matchState[0])
		console.log(matchState[0])


	useEffect(() => {
		if (hasFetched.current != true)
		{
			axios.get(`${API_ROUTES.GET_PROFILE_USER}`, {
				withCredentials: true,
			})
			.then((res) => {
				if (res.status != 200)
					throw new Error('Une erreur est survenue');
				setMatchState(() => {
					let newState = [];
					newState[0] = res.data.message; // Ajout à l'index 0
					return newState;
				});
			})
			.catch((err) => {
				console.log(err)
			});
			hasFetched.current = true;
		}
	}, []);

	return (
		
		<div className="relative max-w-[400px] max-h-[550px]">
			<div className="flex flex-col justify-center text-white text-sm">
				<div className="flex justify-end">
					<button className="hover:cursor-pointer hover:text-pink-600 flex flex-row" onClick={() => setToggleEditProfil(true)}>
						<svg className=" " width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeXidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M14.7566 2.62145C16.5852 0.792851 19.55 0.792851 21.3786 2.62145C23.2072 4.45005 23.2072 7.41479 21.3786 9.24339L11.8933 18.7287C11.3514 19.2706 11.0323 19.5897 10.6774 19.8665C10.2592 20.1927 9.80655 20.4725 9.32766 20.7007C8.92136 20.8943 8.49334 21.037 7.76623 21.2793L4.43511 22.3897L3.63303 22.6571C2.98247 22.8739 2.26522 22.7046 1.78032 22.2197C1.29542 21.7348 1.1261 21.0175 1.34296 20.367L2.72068 16.2338C2.96303 15.5067 3.10568 15.0787 3.29932 14.6724C3.52755 14.1935 3.80727 13.7409 4.13354 13.3226C4.41035 12.9677 4.72939 12.6487 5.27137 12.1067L14.7566 2.62145ZM4.40051 20.8201L7.24203 19.8729C8.03314 19.6092 8.36927 19.4958 8.68233 19.3466C9.06287 19.1653 9.42252 18.943 9.75492 18.6837C10.0284 18.4704 10.2801 18.2205 10.8698 17.6308L18.4393 10.0614C17.6506 9.78321 16.6346 9.26763 15.6835 8.31651C14.7324 7.36538 14.2168 6.34939 13.9387 5.56075L6.36917 13.1302C5.77951 13.7199 5.52959 13.9716 5.3163 14.2451C5.05704 14.5775 4.83476 14.9371 4.65341 15.3177C4.50421 15.6307 4.3908 15.9669 4.12709 16.758L3.17992 19.5995L4.40051 20.8201ZM15.1554 4.34404C15.1896 4.519 15.2474 4.75684 15.3438 5.03487C15.561 5.66083 15.9712 6.48288 16.7442 7.25585C17.5171 8.02881 18.3392 8.43903 18.9651 8.6562C19.2432 8.75266 19.481 8.81046 19.656 8.84466L20.3179 8.18272C21.5607 6.93991 21.5607 4.92492 20.3179 3.68211C19.0751 2.4393 17.0601 2.4393 15.8173 3.68211L15.1554 4.34404Z" fill="currentColor"></path> </g></svg>
						<p>Editer le profil</p>
					</button>
				</div>
			</div>		
			{matchState && matchState[matchIndexState] && (
			<div>
			{toggleEditProfil ? (
				<ModifyProfile matchState={matchState} matchIndexState={matchIndexState} />
			) : toggleProfile ? (
				<MatchProfil userData={matchState} userIndex={matchIndexState} />
			) : (
				<PicturesSlider userData={matchState} userIndex={matchIndexState} />
			)}
			</div>
			)}
				<button onClick={() => setToggleProfile((prevState) => !prevState)}>Profile</button>
			</div>
	)
}
