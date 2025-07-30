import MatchSortAndFilter from "./MatchSortAndFilter";
import MatchResearch from "./MatchResearch";

export default function MatchSidebar({isSidebarSortAndFilterOpen, isSidebarResearchOpen, closeSidebarSortAndFilter, closeSidebarResearch, setMatchState, setMatchIndexState, setIsResearch, sortParameters, filterParameters, suggestionState, setSuggestionState, researchState, setResearchState}) {
	return (
		<>
			<div
				style={{ overflowY: "auto"}}
				className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-gray-50 z-30 transition-transform duration-300 ${
				(isSidebarSortAndFilterOpen || isSidebarResearchOpen) ? "translate-x-0" : "translate-x-full"
				}`}
			>
        		{(isSidebarSortAndFilterOpen &&
					<MatchSortAndFilter
						closeSidebarSortAndFilter={closeSidebarSortAndFilter}
						setMatchState={setMatchState}
						setMatchIndexState={setMatchIndexState}
						setIsResearch={setIsResearch}
						sortParameters={sortParameters}
						filterParameters={filterParameters}
						suggestionState={suggestionState}
						setSuggestionState={setSuggestionState}
					/>
				)}
				{(isSidebarResearchOpen &&
					<MatchResearch
						closeSidebarResearch={closeSidebarResearch}
						setMatchState={setMatchState}
						setMatchIndexState={setMatchIndexState}
						setIsResearch={setIsResearch}
						sortParameters={sortParameters}
						filterParameters={filterParameters}
						researchState={researchState}
						setResearchState={setResearchState}
					/>
				)}
      		</div>
		</>
	)
}
