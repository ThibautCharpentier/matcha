import { useState, useEffect } from 'react';

export default function ConversationMessage() {
	const [windowSize, setWindowSize] = useState(window.innerWidth);

	useEffect(() => {
		function handleResize() {
		  setWindowSize(window.innerWidth);
		}
	
		window.addEventListener('resize', handleResize);
	
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<>
			{windowSize > 640 && <div className="border-gray-300 border-l-[1px] flex flex-col justify-center h-screen sm:w-7/12 lg:w-3/4 text-center">
				<div>Sélectionnez un contact pour afficher la conversation</div>
			</div>}
		</>
	)
}
