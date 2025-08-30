import { useState, useEffect } from "react";
import { API_ROUTES } from "../../utils/constants";
import axios from 'axios';
import "../../style/Scrollbar.css"


export default function ModalHobbies({ isOpen, onClose, onSave, passions }) {
	const [interestNames, setInterestNames] = useState([]);
	const [selectedPassions, setSelectedPassions] = useState(passions || []);

	useEffect(() => {

		async function fetchInterest() {
			axios.get(API_ROUTES.GET_ALL_INTERESTS, {
				withCredentials: true,
				timeout: 5000,
			})
			.then((res) => {
				if (res.status != 200)
					throw new Error('une erreur est survenue')
				const names = res.data.data.map(interest => interest.name);
				setInterestNames(names);
			})
			.catch((err) => {
				console.log(err)
			})
		}
	
		fetchInterest();
	}, [])
	
	const handlePassionClick = (passion) => {
	if (selectedPassions.includes(passion)) {
		setSelectedPassions(selectedPassions.filter(p => p !== passion));
	} else {
		setSelectedPassions([...selectedPassions, passion]);
	}
	};
	return (
		<div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
			<div className="bg-gray-800 bg-opacity-50 absolute inset-0" onClick={onClose}></div>
			<div className="bg-white sm:rounded-xl shadow-lg relative h-full sm:h-5/6 z-10 sm:max-w-lg w-full flex flex-col overflow-hidden">
				<div className="bg-gray-100 rounded-top-xl flex p-4">
					<div className="flex flex-col w-full">
						<div className="flex justify-end mb-3">
							<svg style={{cursor: 'pointer'}} onClick={onClose} fill="#374151" width="15px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M0 14.545L1.455 16 8 9.455 14.545 16 16 14.545 9.455 8 16 1.455 14.545 0 8 6.545 1.455 0 0 1.455 6.545 8z" fillRule="evenodd"></path> </g></svg>
						</div>
						<div className="flex justify-between items-center mt-3">
							<h2 className="text-xl text-center">Sélectionnez vos passions</h2>
							<button className={`btn btn-primary ${selectedPassions.length > 0 ? 'block' : 'hidden'}`} onClick={() => onSave(selectedPassions)}>Valider</button>
						</div>
					</div>
				</div>
				<div className="relative flex flex-wrap flex-1 overflow-y-auto pt-2 ml-2">
					{interestNames.map(passion => (
					<button
					key={passion}
					className={`text-md rounded-xl border p-2 mx-2 mb-2 ${selectedPassions?.includes(passion) && 'border-[--color-dark-green] bg-[--color-light-green]' }`}
					onClick={() => handlePassionClick(passion)}
					>
					{passion}
					</button>
					))}
				</div>
			</div>
		</div>
	)
}
