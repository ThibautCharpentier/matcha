import { Link } from "react-router-dom";
import { API_ROUTES } from "../../../utils/constants";
import DOMPurify from 'dompurify';
import axios from 'axios';
import { useState } from "react";

export default function ForgotUsername({changeState}) {
	const [inputsStates, setInputsStates] = useState({
		email: "",
	});
	const [showValidation, setShowValidation] = useState({
		email: "",
		server: "",
	});
	const [returnMessage, setReturnMessage] = useState("");

	function handleSubmit(e) {
		e.preventDefault()

		if (validationCheck()) {
			const obj = {
				email: DOMPurify.sanitize(inputsStates.email),
			}

			axios.post(API_ROUTES.FORGOT_USERNAME, obj, {
				withCredentials: true,
			})
			.then((res) => {
				if (res.status != 200)
					throw new Error('Une erreur est survenue');
				else
					setReturnMessage("L'intitulé de votre nom d'utilisateur vous a été envoyé");
			})
			.catch((err) => {
				if (err.response.data.message == "Invalid email")
					setShowValidation(state => ({...state, email: "Adresse mail invalide"}))
				else
					setShowValidation(state => ({...state, server: "Formulaire invalide"}))
			});
		}
	}

	function validationCheck() {
		const areValid = {
			email: false,
		}

		if (inputsStates.email.length == 0)
			setShowValidation(state => ({...state, email: "Veuillez entrer votre email"}))
		else {
			areValid.email = true
			setShowValidation(state => ({...state, email: ""}))
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
			<p className="font-poppins-regular mt-4 text-sm">Veuillez indiquer votre adresse mail afin de vous envoyer l'intitulé de votre nom d'utilisateur</p>
			<form action="" className="flex flex-col mt-6">
				<label className="font-poppins-medium" htmlFor="email">Adresse e-mail</label>
				<input className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none"
				placeholder="Entrez une adresse mail"
				type="text"
				name="email"
				id="email"
				autoComplete="email"
				value={inputsStates.email}
				onChange={e => setInputsStates({...inputsStates, email: e.target.value})}
				/>
				{showValidation.email != "" && (
					<p className="text-red-600 text-sm">{showValidation.email}</p>
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
