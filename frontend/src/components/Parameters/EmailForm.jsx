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
				email: DOMPurify.sanitize(inputState),
			}

			axios.post(API_ROUTES.UPDATE_EMAIL, obj, {
				withCredentials: true,
			})
			.then((res) => {
				if (res.status != 200)
					throw new Error('Une erreur est survenue');
			})
			.catch((err) => {
				if (err.response.data.message == "Email already exists")
					setErrState("Cette adresse e-mail est déjà utilisée");
				else
					setErrState("Formulaire invalide");
			});
		}
	}

	function validationCheck() {
		if (inputState.length == 0) {
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
			<form action="" className="flex flex-col mt-6">
				<label className="font-poppins-medium" htmlFor="mail">Adresse e-mail</label>
				<div className="flex items-center space-x-2">
					<input className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none"
					placeholder="Entrez une adresse mail"
					type="text"
					name="mail"
					id="mail"
					autoComplete="email"
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
