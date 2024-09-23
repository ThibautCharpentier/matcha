import { useState } from "react";

export default function MatchResearch({closeSidebarResearch}) {
	return (
		<div className="p-4">
			<div className="flex flex-row justify-between items-center">
				<span className="text-gray-700">Recherche avancée</span>
				<svg style={{cursor: 'pointer'}} onClick={closeSidebarResearch} fill="#374151" width="20px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M0 14.545L1.455 16 8 9.455 14.545 16 16 14.545 9.455 8 16 1.455 14.545 0 8 6.545 1.455 0 0 1.455 6.545 8z" fillRule="evenodd"></path> </g></svg>
			</div>
			<div className="w-3/4 border-b border-gray-300 mx-auto mt-4"></div>
		</div>
	)
}
