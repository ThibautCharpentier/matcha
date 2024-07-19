import { Link } from "react-router-dom";
import { API_ROUTES } from "../../../utils/constants";
import DOMPurify from 'dompurify';
import axios from 'axios';
import { useState } from "react";

export default function ForgotPassword({changeState}) {
	const [inputsStates, setInputsStates] = useState({
		username: "",
	});
	const [showValidation, setShowValidation] = useState({
		username: "",
		server: "",
	});
	const [returnMessage, setReturnMessage] = useState("");

	function handleSubmit(e) {
		e.preventDefault()

		if (validationCheck()) {
			const obj = {
				username: DOMPurify.sanitize(inputsStates.username),
			}

			axios.post(API_ROUTES.FORGOT_PASSWORD, obj, {
				withCredentials: true,
			})
			.then((res) => {
				if (res.status != 200)
					throw new Error('Une erreur est survenue');
				else
					setReturnMessage("Le lien a été envoyé à l'adresse " + res.data.message);
			})
			.catch((err) => {
				if (err.response.data.message == "Invalid username")
					setShowValidation(state => ({...state, username: "Nom d'utilisateur invalide"}))
				else
					setShowValidation(state => ({...state, server: "Formulaire invalide"}))
			});
		}
	}

	function validationCheck() {
		const areValid = {
			username: false,
		}

		if (inputsStates.username.length < 3 || inputsStates.username.length > 10)
			setShowValidation(state => ({...state, username: "Nom d'utilisateur invalide"}))
		else {
			areValid.username = true
			setShowValidation(state => ({...state, username: ""}))
		}

		setShowValidation(state => ({...state, server: ""}))
		setReturnMessage("")
		if (Object.values(areValid).every(value => value)) {
			return true
		}
		return false
	}

	return (
		<div className="w-80 flex flex-col p-2 mt-6">
			<p className="font-poppins-regular mt-4 text-sm">Veuillez indiquer votre nom d'utilisateur afin de vous envoyer un lien de changement de mot de passe</p>
			<form action="" className="flex flex-col mt-6">
				<label className="font-poppins-medium" htmlFor="username">Nom d'utilisateur</label>
				<input className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none"
				placeholder="Entrez un nom d'utilisateur"
				type="text"
				name="username"
				id="username"
				autoComplete="username"
				value={inputsStates.username}
				onChange={e => setInputsStates({...inputsStates, username: e.target.value})}
				/>
				{showValidation.username != "" && (
					<p className="text-red-600 text-sm">{showValidation.username}</p>
				)}
			</form>
			<p className="font-poppins-regular mt-4 text-sm"><Link className="underline hover:text-[--color-pink]" onClick={changeState}>Retour</Link></p>
			{showValidation.server != "" && (
				<p className="text-center text-red-600 text-sm mt-4">{showValidation.server}</p>
			)}
			{returnMessage != "" && (
				<p className="text-center text-sm mt-4">{returnMessage}</p>
			)}
			<button className="btn mt-6" onClick={handleSubmit}>Envoyer</button>
		</div>
	)
}
