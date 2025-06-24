import { Link } from "react-router-dom";
import { API_ROUTES } from "../../../utils/constants";
import DOMPurify from 'dompurify';
import axios from 'axios';
import { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";

export default function ForgotPassword({changeState}) {
	const [inputsStates, setInputsStates] = useState({
		username: "",
	});
	const [showValidation, setShowValidation] = useState({
		username: "",
		server: "",
	});
	const [returnMessage, setReturnMessage] = useState("");
	const [hasSubmit, setHasSubmit] = useState(false);

	function handleSubmit(e) {
		e.preventDefault()

		if (validationCheck()) {
			setHasSubmit(true)
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
					setReturnMessage(res.data.message);
			})
			.catch((err) => {
				if (err.response.data.message == "Invalid username")
					setShowValidation(state => ({...state, username: "Nom d'utilisateur invalide"}))
				else
					setShowValidation(state => ({...state, server: "Formulaire invalide"}))
			})
			.finally(() => {
				setHasSubmit(false)
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
		if (Object.values(areValid).every(value => value))
			return true
		return false
	}

	return (
		<div className="w-80 flex flex-col p-2 mt-6">
			{returnMessage == "" ?
				<>
					<p className="font-poppins-regular mt-4 text-sm">Veuillez indiquer votre nom d'utilisateur afin de vous envoyer un lien de changement de mot de passe</p>
					<form onSubmit={handleSubmit} action="" className="flex flex-col mt-6">
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
						<p className="font-poppins-regular mt-4 text-sm"><Link className="underline hover:text-[--color-pink]" onClick={changeState}>Retour</Link></p>
						{showValidation.server != "" && (
							<p className="text-center text-red-600 text-sm mt-4">{showValidation.server}</p>
						)}
						{hasSubmit ?
							<button className="btn mt-6 bg-[--color-light-green]" disabled>
								<BeatLoader
									color="#fff"
									size={9}
								/>
							</button>
						:
							<button className="btn mt-6">Envoyer</button>
						}
					</form>
				</>
			:
				<>
					<p className="text-center text-xl mt-4">Un lien de renouvellement de mot de passe vous a été envoyé à l'adresse <span className='text-[--color-pink]'>e-mail</span> : <br /> <span className="font-poppins-semibold" >{returnMessage}</span></p>
					<button className="btn mt-6" onClick={changeState}>Retour</button>
				</>
			}
		</div>
	)
}
