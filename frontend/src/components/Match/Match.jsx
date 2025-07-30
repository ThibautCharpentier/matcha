import { useState, useEffect } from "react";
import MatchButtons from "./MatchButtons";
import MatchParameters from "./MatchParameters";
import PicturesSlider from "../Profile/PicturesSlider";
import UserProfile from "../Profile/UserProfile";
import MatchOverlays from "./MatchOverlays";
import MatchSidebar from "./Sidebar/MatchSidebar";
import axios from 'axios';
import { API_ROUTES } from "../../utils/constants";
import ClipLoader from "react-spinners/ClipLoader";
import BtnUnlikeBlockReport from "../ActionWithUser/BtnUnlikeBlockReport";

export default function Match() {
	const [isSidebarSortAndFilterOpen, setSidebarSortAndFilterOpen] = useState(false);
	const [isSidebarResearchOpen, setSidebarResearchOpen] = useState(false);
	const [toggleProfile, setToggleProfile] = useState(false);
	const [matchState, setMatchState] = useState(null);
	const [matchIndexState, setMatchIndexState] = useState(0);
	const [isResearch, setIsResearch] = useState(false);
	const [suggestionState, setSuggestionState] = useState({
		sort: {
			age: false,
			location: false,
			fameRating: false,
			commonTags: false
		},
		filterAge: "",
		filterLocation: "",
		filterFameRating: "",
		filterCommonTags: ""
	})
	const [researchState, setResearchState] = useState({
		sort: {
			age: false,
			location: false,
			fameRating: false,
			commonTags: false
		},
		filterAge: "",
		filterLocation: "",
		filterFameRating: "",
		filterCommonTags: "",
		position: null,
		listTags: [],
		selectTags: []
	})

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

	function sortParameters(state) {
		let sort = ""
		let plus = false;
		if (state.sort.age) {
			sort += "age"
			plus = true
		}
		if (state.sort.location) {
			if (plus == true)
				sort += "+"
			sort += "location"
			plus = true
		}
		if (state.sort.fameRating) {
			if (plus == true)
				sort += "+"
			sort += "fame"
			plus = true
		}
		if (state.sort.commonTags) {
			if (plus == true)
				sort += "+"
			sort += "tags"
		}
		return (sort)
	}

	function filterParameters(state) {
		let filter = ""
		let plus = false;
		if (state.filterAge != "") {
			filter += state.filterAge
			plus = true
		}
		if (state.filterLocation != "") {
			if (plus == true)
				filter += "+"
			filter += state.filterLocation
			plus = true
		}
		if (state.filterFameRating != "") {
			if (plus == true)
				filter += "+"
			filter += state.filterFameRating
			plus = true
		}
		if (state.filterCommonTags != "") {
			if (plus == true)
				filter += "+"
			filter += state.filterCommonTags
		}
		return (filter)
	}

	useEffect(() => {
		if ((matchState && !matchState[matchIndexState] && matchIndexState != 0 || !matchState) && !isResearch) {
			setMatchState(null)
			axios.get(`${API_ROUTES.GET_MATCHS}?sort=${sortParameters(suggestionState)}&filter=${filterParameters(suggestionState)}` , {
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
		}
    }, [matchIndexState]);

	return (
		<>
			<div className="w-full sm:p-2 mb-[4em] sm:mb-0">
				<div className="flex flex-col items-center w-full">
					<MatchParameters 
						openSidebarSortAndFilter={openSidebarSortAndFilter}
						openSidebarResearch={openSidebarResearch}
					/>
					{matchState != null ?
							<div className="sm:mt-6">
								{(matchState && !matchState[matchIndexState] && !isResearch && <p className="mt-8 text-xl text-center font-poppins-medium ">Pas de suggestion pour le moment, revenez plus tard !</p>)}
								{(matchState && !matchState[matchIndexState] && isResearch && <p className="mt-8 text-xl text-center font-poppins-medium ">Aucun profil correspondant à votre recherche !</p>)}
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
												<BtnUnlikeBlockReport
													isLikeState={'unlike'}
													idContact={matchState[matchIndexState].id}
													functionDeleteContact={() => {
														switchToggleProfile()
														setMatchIndexState(matchIndexState + 1)
													}}
													color="#ffffff"
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
					:
						<div className="w-screen max-w-[400px] max-h-[610px] aspect-[40/61] sm:w-[400px] sm:h-[610px] flex justify-center items-center">
							<ClipLoader
								color="#fff"
								size={70}
							/>
						</div>
					}
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
				sortParameters={sortParameters}
				filterParameters={filterParameters}
				suggestionState={suggestionState}
				setSuggestionState={setSuggestionState}
				researchState={researchState}
				setResearchState={setResearchState}
			/>
		</>
	)
}
