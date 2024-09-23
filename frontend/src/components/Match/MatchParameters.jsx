export default function MatchParameters({openSidebarSortAndFilter, openSidebarResearch}) {
	return (
		<div className="flex space-x-3 sm:space-x-9 mt-8">
			<button onClick={openSidebarSortAndFilter} className="btn flex justify-center items-center w-36 h-11 p-2">
				Trier/Filtrer
			</button>
			<button onClick={openSidebarResearch} className="btn flex justify-center items-center w-36 h-11 p-2">
				Recherche avancée
			</button>
		</div>
	)
}
