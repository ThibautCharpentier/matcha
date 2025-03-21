import { useState, useRef, useEffect } from "react";
import MatchButtons from "./MatchButtons";
import MatchParameters from "./MatchParameters";
import PicturesSlider from "../Profile/PicturesSlider";
import MatchProfil from "../Profile/UserProfile";
import MatchOverlays from "./MatchOverlays";
import MatchSidebar from "./Sidebar/MatchSidebar";
import axios from 'axios';
import { API_ROUTES } from "../../utils/constants";

export default function Match() {
	const [isSidebarSortAndFilterOpen, setSidebarSortAndFilterOpen] = useState(false);
	const [isSidebarResearchOpen, setSidebarResearchOpen] = useState(false);
	const [toggleProfile, setToggleProfile] = useState(false);
	const [matchState, setMatchState] = useState(null);
	const [matchIndexState, setMatchIndexState] = useState(0);
	const [isResearch, setIsResearch] = useState(false);
	const hasFetched = useRef(false);

	const openSidebarSortAndFilter = () => {
		setSidebarSortAndFilterOpen(true);
	};
	
	const closeSidebarSortAndFilter = () => {
		setSidebarSortAndFilterOpen(false);
	};

	const openSidebarResearch = () => {
		setSidebarResearchOpen(true);
	};
	
	const closeSidebarResearch = () => {
		setSidebarResearchOpen(false);
	};

	const switchToggleProfile = () => {
		setToggleProfile((prevState) => !prevState);
	}

	useEffect(() => {
		if (hasFetched.current != true)
		{
            axios.get(`${API_ROUTES.GET_MATCHS}`, {
				withCredentials: true,
			})
			.then((res) => {
				if (res.status != 200)
					throw new Error('Une erreur est survenue');
				setMatchState(res.data.message);
				setMatchIndexState(0);
			})
			.catch((err) => {
				console.log(err)
			});
			hasFetched.current = true;
		}
    }, []);

	return (
		<>
			<div className="w-full py-4 sm-py-8">
				<div className="flex flex-col items-center w-full mt-6 p-2 mb-0">
					<MatchParameters 
						openSidebarSortAndFilter={openSidebarSortAndFilter}
						openSidebarResearch={openSidebarResearch}
					/>
					{(matchState && !matchState[matchIndexState] && !isResearch && <p className="mt-8 text-xl text-center font-poppins-bold">Pas de suggestion pour le moment, revenez plus tard !</p>)}
					{(matchState && !matchState[matchIndexState] && isResearch && <p className="mt-8 text-xl text-center font-poppins-bold">Aucun profil correspondant à votre recherche !</p>)}
					{(matchState && matchState[matchIndexState] && <div className="relative max-w-[400px] max-h-[550px]">
						{(toggleProfile ? <MatchProfil
							userData={matchState}
							userIndex={matchIndexState}
						/> : <PicturesSlider
							userData={matchState}
							userIndex={matchIndexState}
						/>)}
						<MatchButtons
							toggleProfile={toggleProfile}
							switchToggleProfile={switchToggleProfile}
							matchState={matchState}
							matchIndexState={matchIndexState}
							setMatchIndexState={setMatchIndexState}
							isResearch={isResearch}
						/>
					</div>)}
				</div>
			</div>
			<MatchOverlays
				isSidebarSortAndFilterOpen={isSidebarSortAndFilterOpen}
				isSidebarResearchOpen={isSidebarResearchOpen}
				closeSidebarSortAndFilter={closeSidebarSortAndFilter}
				closeSidebarResearch={closeSidebarResearch}
			/>
			<MatchSidebar
				isSidebarSortAndFilterOpen={isSidebarSortAndFilterOpen}
				isSidebarResearchOpen={isSidebarResearchOpen}
				closeSidebarSortAndFilter={closeSidebarSortAndFilter}
				closeSidebarResearch={closeSidebarResearch}
				setMatchState={setMatchState}
				setMatchIndexState={setMatchIndexState}
				setIsResearch={setIsResearch}
			/>
		</>
	)
}
