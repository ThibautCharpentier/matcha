import { useState } from "react";
import MatchButtons from "./MatchButtons";
import MatchParameters from "./MatchParameters";
import MatchSlider from "./MatchSlider";
import MatchProfil from "./MatchProfil";
import MatchOverlays from "./MatchOverlays";
import MatchSidebar from "./Sidebar/MatchSidebar";

export default function Match() {
	const [isSidebarSortAndFilterOpen, setSidebarSortAndFilterOpen] = useState(false);
	const [isSidebarResearchOpen, setSidebarResearchOpen] = useState(false);
	const [toggleProfile, setToggleProfile] = useState(false);

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

	return (
		<>
			<div className="w-full">
				<div className="flex flex-col items-center w-full mt-6 p-2 mb-[6em] sm:mb-0">
					<h1 className="text-5xl text-center font-poppins-bold">Matchs</h1>
					<MatchParameters 
						openSidebarSortAndFilter={openSidebarSortAndFilter}
						openSidebarResearch={openSidebarResearch}
					/>
					<div className="relative max-w-[400px] max-h-[550px]">
						{(toggleProfile ? <MatchProfil/> : <MatchSlider/>)}
						<MatchButtons
							toggleProfile={toggleProfile}
							switchToggleProfile={switchToggleProfile}
						/>
					</div>
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
			/>
		</>
	)
}
