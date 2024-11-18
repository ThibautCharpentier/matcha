import { useState, useRef, useEffect } from "react";
import MatchButtons from "./MatchButtons";
import MatchParameters from "./MatchParameters";
import MatchSlider from "./MatchSlider";
import MatchProfil from "./MatchProfil";
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
			<div className="w-full">
				<div className="flex flex-col items-center w-full mt-6 p-2 mb-0">
					<MatchParameters 
						openSidebarSortAndFilter={openSidebarSortAndFilter}
						openSidebarResearch={openSidebarResearch}
					/>
					{(matchState && !matchState[matchIndexState] && <p className="mt-8 text-xl text-center font-poppins-bold">Pas de suggestion pour le moment, revenez plus tard !</p>)}
					{(matchState && matchState[matchIndexState] && <div className="relative mt-6 mb-6 max-w-[400px] max-h-[550px]">
						{(toggleProfile ? <MatchProfil
							matchState={matchState}
							matchIndexState={matchIndexState}
						/> : <MatchSlider
							matchState={matchState}
							matchIndexState={matchIndexState}
						/>)}
					</div>)}
				</div>
						<MatchButtons
							toggleProfile={toggleProfile}
							switchToggleProfile={switchToggleProfile}
							matchState={matchState}
							matchIndexState={matchIndexState}
							setMatchIndexState={setMatchIndexState}
						/>
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
			/>
		</>
	)
}
