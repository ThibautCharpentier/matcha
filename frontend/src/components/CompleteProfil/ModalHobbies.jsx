import { useState, useEffect } from "react";
import { API_ROUTES } from "../../utils/constants";
import axios from 'axios';
import "../../style/Scrollbar.css"


export default function ModalHobbies({ isOpen, onClose, onSave }) {
	const [interestNames, setInterestNames] = useState([]);
	const [selectedPassions, setSelectedPassions] = useState([]);

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
			<div className="bg-white rounded-xl shadow-lg relative h-5/6 z-10 max-w-lg w-full">
				<div className="bg-gray-100 rounded-xl flex justify-between items-center p-8">
					<h2 className="text-xl text-center">Sélectionnez vos passions</h2>
					<button className="btn btn-primary" onClick={() => onSave(selectedPassions)}>Sauvegarder</button>
				</div>
				<div className="relative flex flex-wrap h-4/5 overflow-y-auto mt-2 ml-2">
					{interestNames.map(passion => (
					<button
					key={passion}
					className={`text-md rounded-xl border p-2 mx-2 mb-2 ${selectedPassions.includes(passion) && 'border-[--color-pink]' }`}
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