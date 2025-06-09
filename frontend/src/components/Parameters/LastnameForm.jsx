import { useState, useEffect } from "react";
import DOMPurify from 'dompurify';
import axios from 'axios';
import { API_ROUTES } from "../../utils/constants";
import BeatLoader from "react-spinners/BeatLoader";

export default function LastnameForm({ data, setChangeSettings }) {
	const [inputState, setInputState] = useState("");
	const [verified, setVerified] = useState(false);
	const [errState, setErrState] = useState("");
	const [hasSubmit, setHasSumit] = useState(false);

	function handleSubmit(e) {
		e.preventDefault()

		if (validationCheck()) {
			setHasSumit(true)
			const obj = {
				lastname: DOMPurify.sanitize(inputState),
			}

			axios.patch(API_ROUTES.UPDATE_LASTNAME, obj, {
				withCredentials: true,
			})
			.then((res) => {
				if (res.status != 200)
					throw new Error('Une erreur est survenue');
				setVerified(true);
				setInputState("");
			})
			.catch((err) => {
				setErrState("Formulaire invalide");
			})
			.finally(() => {
				setHasSumit(false)
			});
		}
	}

	function validationCheck() {
		if (inputState.length < 1) {
			setErrState("Ce champ ne peut pas être vide")
			return false;
		}
		else {
			setErrState("")
			return true;
		}
	}

	useEffect(() => {
			if (inputState.length > 0)
				setChangeSettings(prev => ({
					...prev,
					lastname: inputState
				}));
			else {
				setChangeSettings(prev => ({
					...prev,
					lastname: null,
				}));
			}	
		}, [inputState])

	return (
		<>
			<form onSubmit={handleSubmit} action="" className="flex flex-col mt-6 w-1/2">
				<label className="font-poppins-light" htmlFor="lastname">Nom</label>
				<div className="flex items-center space-x-2">
					<input className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none"
					placeholder={data.lastname === "" ? "Entrez votre prénpm" : data.lastname}
					type="text"
					name="lastname"
					id="lastname"
					autoComplete="lastname"
					value={inputState}
					onChange={(e) => {
						setInputState(e.target.value)
						setVerified(false)
					}}
					/>
				</div>
				{errState != "" && (
				<p className=" text-red-600 text-sm ">{errState}</p>
				)}
			</form>
		</>
	)
}
