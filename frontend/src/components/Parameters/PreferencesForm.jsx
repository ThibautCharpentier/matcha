import { useState, useEffect } from "react";
import DOMPurify from 'dompurify';
import axios from 'axios';
import { API_ROUTES } from "../../utils/constants";

export default function PreferencesForm({ data }) {
	const [inputState, setInputState] = useState(data.preferences);
	const [verified, setVerified] = useState(false);
	const [errState, setErrState] = useState("");

	useEffect(() => {
		setInputState(data.preferences)
    }, [data]);

	function handleInputChange(e) {
		setInputState(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault()

		if (inputState == "")
		{
			setErrState("Veuillez sélectionner un champ");
			return ;
		}
		setErrState("")

		const obj = {
			preferences: DOMPurify.sanitize(inputState),
		}

		axios.patch(API_ROUTES.UPDATE_PREFERENCES, obj, {
			withCredentials: true,
		})
		.then((res) => {
			if (res.status != 200)
				throw new Error('Une erreur est survenue');
			setVerified(true);
		})
		.catch((err) => {
			setErrState("Formulaire invalide");
		});
	}

	return (
		<>
			<form action="" className="flex flex-col mt-6">
				<p className="font-poppins-medium">Préférences</p>
				<div className="flex items-center space-x-2">
					<div className="w-full">
						<div className="flex">
							<div className="w-1/2">
								<label className="font-poppins-regular text-sm">Hommes</label>
							</div>
							<input className=""
							type="radio"
							name="preferences"
							id="men"
							value="men"
							checked={inputState === "men"}
							onChange={handleInputChange}
							onFocus={() => setVerified(false)}
							/>
						</div>
						<div className="flex">
							<div className="w-1/2">
								<label className="font-poppins-regular text-sm">Femmes</label>
							</div>
							<input className=""
							type="radio"
							name="preferences"
							id="women"
							value="women"
							checked={inputState === "women"}
							onChange={handleInputChange}
							onFocus={() => setVerified(false)}
							/>
						</div>
						<div className="flex">
							<div className="w-1/2">
								<label className="font-poppins-regular text-sm">Les deux</label>
							</div>
							<input className=""
							type="radio"
							name="preferences"
							id="bi"
							value="bi"
							checked={inputState === "bi"}
							onChange={handleInputChange}
							onFocus={() => setVerified(false)}
							/>
						</div>
					</div>
					{verified ? 
					<button className="btn flex justify-center items-center bg-[--color-pink] w-40 h-12 p-2" disabled>
						<svg height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
							<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
							<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
							<g id="SVGRepo_iconCarrier"> <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"></path> </g>
						</svg>
					</button>
					:
					<button className="btn flex justify-center items-center w-40 h-12 p-2" onClick={handleSubmit}>
						Envoyer
					</button>
					}
				</div>
				{errState != "" && (
				<p className=" text-red-600 text-sm ">{errState}</p>
				)}
			</form>
		</>
	)
}
