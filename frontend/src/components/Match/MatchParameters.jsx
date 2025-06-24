export default function MatchParameters({openSidebarSortAndFilter, openSidebarResearch}) {
	return (
		<div className="flex space-x-3 sm:space-x-9 mt-2 mb-3 px-2">
			<button onClick={openSidebarSortAndFilter} className="btn flex justify-center items-center h-11 p-2 px-4">
				Options de suggestion
			</button>
			<button onClick={openSidebarResearch} className="btn flex justify-center items-center h-11 p-2 px-4">
				Recherche avancée
			</button>
		</div>
	)
}
