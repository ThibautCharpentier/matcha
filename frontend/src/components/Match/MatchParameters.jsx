export default function MatchParameters({openSidebarSortAndFilter, openSidebarResearch}) {
	return (
		<div className="flex space-x-3 sm:space-x-9 mt-6 mb-3">
			<button onClick={openSidebarSortAndFilter} className="btn flex justify-center items-center w-36 h-11 p-2">
				Options de suggestion
			</button>
			<button onClick={openSidebarResearch} className="btn flex justify-center items-center w-36 h-11 p-2">
				Recherche avancée
			</button>
		</div>
	)
}
