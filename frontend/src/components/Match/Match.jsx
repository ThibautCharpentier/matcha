import { useState, useEffect } from "react";
import MatchButtons from "./MatchButtons";
import MatchParameters from "./MatchParameters";
import PicturesSlider from "../Profile/PicturesSlider";
import UserProfile from "../Profile/UserProfile";
import ReportButton from "../Profile/ReportButton";
import MatchOverlays from "./MatchOverlays";
import MatchSidebar from "./Sidebar/MatchSidebar";
import axios from 'axios';
import { API_ROUTES } from "../../utils/constants";
import ClipLoader from "react-spinners/ClipLoader";

export default function Match() {
	const [isSidebarSortAndFilterOpen, setSidebarSortAndFilterOpen] = useState(false);
	const [isSidebarResearchOpen, setSidebarResearchOpen] = useState(false);
	const [toggleProfile, setToggleProfile] = useState(false);
	const [matchState, setMatchState] = useState(null);
	const [matchIndexState, setMatchIndexState] = useState(0);
	const [isResearch, setIsResearch] = useState(false);

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
    }, []);

	return (
		<>
			{matchState != null ?
				<div className="w-full sm:p-2 mb-[4em] sm:mb-0">
					<div className="flex flex-col items-center w-full">
						<MatchParameters 
							openSidebarSortAndFilter={openSidebarSortAndFilter}
							openSidebarResearch={openSidebarResearch}
						/>
						{(matchState && !matchState[matchIndexState] && !isResearch && <p className="mt-8 text-xl text-center font-poppins-bold">Pas de suggestion pour le moment, revenez plus tard !</p>)}
						{(matchState && !matchState[matchIndexState] && isResearch && <p className="mt-8 text-xl text-center font-poppins-bold">Aucun profil correspondant à votre recherche !</p>)}
						{(matchState && matchState[matchIndexState] && <div className="relative w-full max-w-[400px] max-h-[610px] aspect-[40/61] sm:w-[400px] sm:h-[610px] bg-gray-200 flex flex-col rounded-3xl">
							{(toggleProfile ?
								<>
									<UserProfile
										userData={matchState}
										userIndex={matchIndexState}
									/>
									<MatchButtons
										toggleProfile={toggleProfile}
										switchToggleProfile={switchToggleProfile}
										matchState={matchState}
										matchIndexState={matchIndexState}
										setMatchIndexState={setMatchIndexState}
										isResearch={isResearch}
									/>
									<div className="absolute right-1 top-4">
										<ReportButton
											toggleProfile={toggleProfile}
											switchToggleProfile={switchToggleProfile}
											userData={matchState}
											userIndex={matchIndexState}
											functionInterface={() => setMatchIndexState(matchIndexState + 1)}
										/>
									</div>
								</>
							:
								<>
									<PicturesSlider
										userData={matchState}
										userIndex={matchIndexState}
									/>
									<MatchButtons
										toggleProfile={toggleProfile}
										switchToggleProfile={switchToggleProfile}
										matchState={matchState}
										matchIndexState={matchIndexState}
										setMatchIndexState={setMatchIndexState}
										isResearch={isResearch}
									/>
								</>
							)}
						</div>)}
					</div>
				</div>
			:
				<div className="w-full h-screen flex justify-center items-center">
					<ClipLoader
						color="#fff"
						size={70}
					/>
				</div>
			}
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
