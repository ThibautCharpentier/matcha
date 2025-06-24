import { Link } from "react-router-dom";
import { API_ROUTES, APP_ROUTES } from "../../utils/constants";
import { useState } from "react";
import UsernameInput from "./UsernameInput"
import NameInput from "./NameInput"
import LastNameInput from "./LastNameInput"
import MailInput from "./MailInput"
import PasswordInput from "./PasswordInput"
import ConfirmPasswordInput from "./ConfirmPasswordInput"
import ValidateSignup from "./ValidateSignup"
import DOMPurify from 'dompurify';
import axios from 'axios';
import BeatLoader from "react-spinners/BeatLoader";

export default function SignUp() {
	const [showValidateSignup, setShowValidateSignup] = useState(false)
	const [inputsStates, setInputsStates] = useState({
		username: "",
		name: "",
		lastname: "",
		mail: "",
		password: "",
		confirmPassword: ""
	});
	const [showValidation, setShowValidation] = useState({
		username: "",
		name: "",
		lastname: "",
		mail: "",
		password: "",
		confirmPassword: "",
		server: ""
	});
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [hasSubmit, setHasSumit] = useState(false);

	function togglePasswordVisibility() {
		setIsPasswordVisible((prevState) => !prevState);
	}
	
	function handleSubmit(e) {
		e.preventDefault()

		if (validationCheck()) {
			setHasSumit(true)
			const obj = {
				username: DOMPurify.sanitize(inputsStates.username),
				firstname: DOMPurify.sanitize(inputsStates.name),
				lastname: DOMPurify.sanitize(inputsStates.lastname),
				email: DOMPurify.sanitize(inputsStates.mail),
				password: DOMPurify.sanitize(inputsStates.password),
			}

			axios.post(API_ROUTES.SIGN_UP, obj, {
				withCredentials: true,
			})
			.then((res) => {
				if (res.status != 201)
					throw new Error('une erreur est survenue')
				else
					setShowValidateSignup(true)
			})
			.catch((err) => {
				if (err.response.data.message == "Username already exists")
					setShowValidation(state => ({...state, username: "Le nom d'utilisateur est déjà pris"}))
				else if (err.response.data.message == "Email already exists")
					setShowValidation(state => ({...state, mail: "Cette adresse e-mail est déjà utilisée"}))
				else
					setShowValidation(state => ({...state, server: "Formulaire invalide"}))
			})
			.finally(() => {
				setHasSumit(false)
			})
		}
	}

	function validationCheck() {
		const areValid = {
			username: false,
			name: false,
			lastname: false,
			mail: false,
			password: false,
			confirmPassword: false
		}

		if (inputsStates.username.length < 3 || inputsStates.username.length > 10)
			setShowValidation(state => ({...state, username: "Votre nom d'utilisateur doit contenir entre 3 et 10 caractères"}))
		else {
			areValid.username = true
			setShowValidation(state => ({...state, username: ""}))
		}

		if (inputsStates.name.length == 0)
			setShowValidation(state => ({...state, name: "Ce champ ne peut pas être vide"}))
		else {
			areValid.name = true
			setShowValidation(state => ({...state, name: ""}))
		}

		if (inputsStates.lastname.length == 0)
			setShowValidation(state => ({...state, lastname: "Ce champ ne peut pas être vide"}))
		else {
			areValid.lastname = true
			setShowValidation(state => ({...state, lastname: ""}))
		}

		if (inputsStates.mail.length == 0)
			setShowValidation(state => ({...state, mail: "Ce champ ne peut pas être vide"}))
		else {
			areValid.mail = true
			setShowValidation(state => ({...state, mail: ""}))
		}

		if (inputsStates.password.length < 10)
			setShowValidation(state => ({...state, password: "Votre mot de passe doit contenir au moins 10 caractères"}))
		else {
			areValid.password = true
			setShowValidation(state => ({...state, password: ""}))
		}

		if (inputsStates.confirmPassword !== inputsStates.password)
			setShowValidation(state => ({...state, confirmPassword: "Les mots de passe ne correspondent pas"}))
		else if (inputsStates.confirmPassword.length == 0)
			setShowValidation(state => ({...state, confirmPassword: "Ce champ ne peut pas être vide"}))
		else {
			areValid.confirmPassword = true
			setShowValidation(state => ({...state, confirmPassword: ""}))
		}

		setShowValidation(state => ({...state, server: ""}))
		if (Object.values(areValid).every(value => value))
			return true
		return false
	}


	return (
		<div className="flex justify-center">
			{showValidateSignup ? 
			<ValidateSignup mailUser={inputsStates.mail}/>
			:
			<div className="w-80 flex flex-col p-2 mt-6">
				<h1 className="text-5xl text-center font-poppins-bold ">
					Créer un compte
				</h1>
				<p className="font-poppins-regular mt-4 text-sm">
					Vous avez déjà un compte ?{" "}
					<Link
						className="underline hover:text-[--color-pink]"
						to={APP_ROUTES.SIGN_IN}
					>
						Se connecter
					</Link>
				</p>
				<form onSubmit={handleSubmit} action="" className="flex flex-col mt-6">
					<UsernameInput 
					inputsStates={inputsStates}
					setInputsStates={setInputsStates}
					showValidation={showValidation}
					/>
					<NameInput 
					inputsStates={inputsStates}
					setInputsStates={setInputsStates}
					showValidation={showValidation}
					/>
					<LastNameInput 
					inputsStates={inputsStates}
					setInputsStates={setInputsStates}
					showValidation={showValidation}
					/>
					<MailInput 
					inputsStates={inputsStates}
					setInputsStates={setInputsStates}
					showValidation={showValidation}
					/>
					<PasswordInput 
					inputsStates={inputsStates}
					setInputsStates={setInputsStates}
					showValidation={showValidation}
					isPasswordVisible={isPasswordVisible}
					togglePasswordVisibility={togglePasswordVisibility}
					/>
					<ConfirmPasswordInput 
					inputsStates={inputsStates}
					setInputsStates={setInputsStates}
					showValidation={showValidation}
					isPasswordVisible={isPasswordVisible}
					togglePasswordVisibility={togglePasswordVisibility}
					/>
					{showValidation.server != "" && (
					<p className="text-center text-red-600 text-sm mt-4">{showValidation.server}</p>
					)}
					{hasSubmit ?
						<button className="btn mt-8 bg-[--color-light-green]" disabled>
							<BeatLoader
								color="#fff"
								size={9}
							/>
						</button>
					:
						<button className="btn mt-8">Créer un compte</button>
					}
				</form>
			</div>
			}
		</div>
	);
}
