import { Link } from "react-router-dom";
import { API_ROUTES } from "../../../utils/constants";
import DOMPurify from 'dompurify';
import axios from 'axios';
import { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";

export default function ForgotUsername({changeState}) {
	const [inputsStates, setInputsStates] = useState({
		email: "",
	});
	const [showValidation, setShowValidation] = useState({
		email: "",
		server: "",
	});
	const [returnMessage, setReturnMessage] = useState("");
	const [hasSubmit, setHasSumit] = useState(false);

	function handleSubmit(e) {
		e.preventDefault()

		if (validationCheck()) {
			setHasSumit(true)
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
					setReturnMessage(res.data.message);
			})
			.catch((err) => {
				if (err.response.data.message == "Invalid email")
					setShowValidation(state => ({...state, email: "Adresse mail invalide"}))
				else
					setShowValidation(state => ({...state, server: "Formulaire invalide"}))
			})
			.finally(() => {
				setHasSumit(false)
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
		if (Object.values(areValid).every(value => value))
			return true
		return false
	}

	return (
		<div className="w-80 flex flex-col p-2 mt-6">
			{returnMessage == "" ?
				<>
					<p className="font-poppins-regular mt-4 text-sm">Veuillez indiquer votre adresse mail afin de vous envoyer l'intitulé de votre nom d'utilisateur</p>
					<form onSubmit={handleSubmit} action="" className="flex flex-col mt-6">
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
					<p className="text-center text-xl mt-4">L'intitulé de votre nom d'utilisateur vous a été envoyé à l'adresse <span className='text-[--color-pink]'>e-mail</span> : <br /> <span className="font-poppins-semibold" >{returnMessage}</span></p>
					<button className="btn mt-6" onClick={changeState}>Retour</button>
				</>
			}
		</div>
	)
}
