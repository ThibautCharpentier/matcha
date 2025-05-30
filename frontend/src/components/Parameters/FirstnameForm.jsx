import { useEffect, useState } from "react";
import DOMPurify from 'dompurify';
import axios from 'axios';
import { API_ROUTES } from "../../utils/constants";
import BeatLoader from "react-spinners/BeatLoader";

export default function FirstnameForm({ data, setChangeSettings }) {
	const [inputState, setInputState] = useState("");
	const [verified, setVerified] = useState(false);
	const [errState, setErrState] = useState("");
	const [hasSubmit, setHasSumit] = useState(false);

	function handleSubmit(e) {
		e.preventDefault()

		if (validationCheck()) {
			setHasSumit(true)
			const obj = {
				firstname: DOMPurify.sanitize(inputState),
			}

			axios.patch(API_ROUTES.UPDATE_FIRSTNAME, obj, {
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
	
	useEffect(() => {
		if (inputState.length > 0)
			setChangeSettings(prev => ({
				...prev,
				firstname: inputState
			}));
		else {
			setChangeSettings(prev => ({
				...prev,
				firstname: null,
			}));
		}	
	}, [inputState])

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

	return (
		<>
			<form onSubmit={handleSubmit} action="" className="flex flex-col mt-6 w-1/2">
				<label className="font-poppins-light" htmlFor="firstname">Prénom</label>
				<div className="flex items-center space-x-2">
					<input className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none"
					placeholder={data.firstname === "" ? "Entrez votre prénpm" : data.firstname}
					type="text"
					name="firstname"
					id="firstname"
					autoComplete="firstname"
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
