import { Link, useNavigate } from "react-router-dom";
import { API_ROUTES, APP_ROUTES } from "../../utils/constants";
import { useState } from "react";
import UsernameInput from "./UsernameInput"
import NameInput from "./NameInput"
import LastNameInput from "./LastNameInput"
import MailInput from "./MailInput"
import PasswordInput from "./PasswordInput"
import ConfirmPasswordInput from "./ConfirmPasswordInput"
import DOMPurify from 'dompurify';
import axios from 'axios';

export default function SignUp() {
	const navigate = useNavigate();
	const [inputsStates, setInputsStates] = useState({
		username: "",
		name: "",
		lastname: "",
		mail: "",
		password: "",
		confirmPassword: "",
	});

	const [showValidation, setShowValidation] = useState({
		username: false,
		name: false,
		lastname: false,
		mail: false,
		password: false,
		confirmPassword: false,
	});
	
	function handleSubmit(e) {
		e.preventDefault()

		if (validationCheck()) {
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
				console.log(res)
				if (res.status != 201)
					throw new Error('une erreur est survenue')
				else
					navigate('/')
			})
			.catch((err) => {
				console.log(err)
				if (err.response.data.message == "Username already exists")
					setShowValidation(state => ({...state, username: true}))
				else if (err.response.data.message == "Email already exists")
					setShowValidation(state => ({...state, mail: true}))
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
			setShowValidation(state => ({...state, username: true}))
		else {
			areValid.username = true
			setShowValidation(state => ({...state, username: false}))
		}

		if (inputsStates.name.length == 0)
			setShowValidation(state => ({...state, name: true}))
		else {
			areValid.name = true
			setShowValidation(state => ({...state, name: false}))
		}

		if (inputsStates.lastname.length == 0)
			setShowValidation(state => ({...state, lastname: true}))
		else {
			areValid.lastname = true
			setShowValidation(state => ({...state, lastname: false}))
		}

		if (inputsStates.mail.length == 0)
			setShowValidation(state => ({...state, mail: true}))
		else {
			areValid.mail = true
			setShowValidation(state => ({...state, mail: false}))
		}

		if (inputsStates.password.length < 10)
			setShowValidation(state => ({...state, password: true}))
		else {
			areValid.password = true
			setShowValidation(state => ({...state, password: false}))
		}

		if (inputsStates.confirmPassword !== inputsStates.password)
			setShowValidation(state => ({...state, confirmPassword: true}))
		else {
			areValid.confirmPassword = true
			setShowValidation(state => ({...state, confirmPassword: false}))
		}
		console.log(areValid)

		if (Object.values(areValid).every(value => value)) {
			return true
		}
		return false
	}


	return (
		<div className="flex justify-center">
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
					/>
					<ConfirmPasswordInput 
					inputsStates={inputsStates}
					setInputsStates={setInputsStates}
					showValidation={showValidation}
					/>
					<button className="btn mt-8">Créer un compte</button>
				</form>
			</div>
		</div>
	);
}
