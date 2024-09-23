export default function MatchOverlays({isSidebarSortAndFilterOpen, isSidebarResearchOpen, closeSidebarSortAndFilter, closeSidebarResearch}) {
	return (
		<>
			{isSidebarSortAndFilterOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-20"
					onClick={closeSidebarSortAndFilter}
				></div>
			)}
			{isSidebarResearchOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-20"
					onClick={closeSidebarResearch}
				></div>
			)}
		</>
	)
}
