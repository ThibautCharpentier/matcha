import { useState } from "react";
import DOMPurify from 'dompurify';
import axios from 'axios';
import { API_ROUTES } from "../../utils/constants";

export default function EmailForm() {
	const [inputState, setInputState] = useState("");
	const [errState, setErrState] = useState("");

	function handleSubmit(e) {
		e.preventDefault()

		if (validationCheck()) {
			const obj = {
				username: DOMPurify.sanitize(inputState),
			}

			axios.patch(API_ROUTES.UPDATE_USERNAME, obj, {
				withCredentials: true,
			})
			.then((res) => {
				if (res.status != 200)
					throw new Error('Une erreur est survenue');
			})
			.catch((err) => {
				if (err.response.data.message == "Username already exists")
					setErrState("Le nom d'utilisateur est déjà pris");
				else
					setErrState("Formulaire invalide");
			});
		}
	}

	function validationCheck() {
		if (inputState.length < 3 || inputState.length > 10) {
			setErrState("Votre nom d'utilisateur doit contenir entre 3 et 10 caractères")
			return false;
		}
		else {
			setErrState("")
			return true;
		}
	}

	return (
		<>
			<form action="" className="flex flex-col mt-6">
				<label className="font-poppins-medium" htmlFor="username">Nom d'utilisateur</label>
				<div className="flex items-center space-x-2">
					<input className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none"
					placeholder="Entrez un nom d'utilisateur"
					type="text"
					name="username"
					id="username"
					autoComplete="username"
					value={inputState}
					onChange={e => setInputState(e.target.value)}
					/>
					<button className="btn" onClick={handleSubmit}>Envoyer</button>
				</div>
				{errState != "" && (
				<p className=" text-red-600 text-sm ">{errState}</p>
				)}
			</form>
		</>
	)
}
