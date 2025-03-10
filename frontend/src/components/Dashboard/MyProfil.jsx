import { useState, useRef, useEffect } from "react";
import MatchButtons from "../Match/MatchButtons";
import MatchSlider from "../Match/MatchSlider";
import ProfileDash from "./ProfileDash";
import ModifyProfile from "./ModifyProfile";
import axios from 'axios';
import { API_ROUTES } from "../../utils/constants";


export default function MyProfil() {
    const hasFetched = useRef(false);
    const [toggleProfile, setToggleProfile] = useState(false);
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
            {(matchState && matchState[matchIndexState] && <div>
				{(toggleProfile ? <ModifyProfile
					matchState={matchState}
					matchIndexState={matchIndexState}
				/> : <MatchSlider
					matchState={matchState}
					matchIndexState={matchIndexState}
				/>)}
				<MatchButtons
					toggleProfile={toggleProfile}
					switchToggleProfile={switchToggleProfile}
					matchState={matchState}
					matchIndexState={matchIndexState}
					setMatchIndexState={setMatchIndexState}
				/>
			</div>)}
        </div>
	)
}
