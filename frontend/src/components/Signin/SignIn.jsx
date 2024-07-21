import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { APP_ROUTES, API_ROUTES } from "../../utils/constants";
import DOMPurify from 'dompurify';
import axios from 'axios';
import UsernameInput from "./UsernameInput"
import PasswordInput from "./PasswordInput"
import ForgotPassword from "./Forgot/ForgotPassword"
import ForgotUsername from "./Forgot/ForgotUsername"
import { useAuth } from "../AuthContext";

export default function SignIn() {
	const navigate = useNavigate();
	const [inputsStates, setInputsStates] = useState({
		username: "",
		password: "",
	});
	const [showValidation, setShowValidation] = useState({
		username: "",
		password: "",
		server: "",
	});
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isForgotPassword, setIsForgotPassword] = useState(false);
	const [isForgotUsername, setIsForgotUsername] = useState(false);
	const [isSignIn, setIsSignIn] = useState(true);
	const { login } = useAuth();

	function handleSubmit(e) {
		e.preventDefault()

		if (validationCheck()) {
			const obj = {
				username: DOMPurify.sanitize(inputsStates.username),
				password: DOMPurify.sanitize(inputsStates.password),
			}

			axios.post(API_ROUTES.SIGN_IN, obj, {
				withCredentials: true,
			})
			.then((res) => {
				if (res.status != 200)
					throw new Error('Une erreur est survenue');
				else
				{
					login();
					navigate('/dashboard');
				}
			})
			.catch((err) => {
				if (err.response.data.message == "Invalid password")
					setShowValidation(state => ({...state, password: "Mot de passe invalide"}))
				else if (err.response.data.message == "Invalid username")
					setShowValidation(state => ({...state, username: "Nom d'utilisateur invalide"}))
				else if (err.response.data.message == "Email not verified")
					setShowValidation(state => ({...state, server: "Veuillez d'abord vérifier votre adresse mail. Un lien de vérification vous a été envoyé."}))
				else
					setShowValidation(state => ({...state, server: "Formulaire invalide"}))
			});
		}
	}

	function validationCheck() {
		const areValid = {
			username: false,
			password: false
		}

		if (inputsStates.username.length < 3 || inputsStates.username.length > 10)
			setShowValidation(state => ({...state, username: "Nom d'utilisateur invalide"}))
		else {
			areValid.username = true
			setShowValidation(state => ({...state, username: ""}))
		}

		if (inputsStates.password.length < 10)
			setShowValidation(state => ({...state, password: "Mot de passe invalide"}))
		else {
			areValid.password = true
			setShowValidation(state => ({...state, password: ""}))
		}
		
		setShowValidation(state => ({...state, server: ""}))
		if (Object.values(areValid).every(value => value)) {
			return true
		}
		return false
	}

	function togglePasswordVisibility()
	{
		setIsPasswordVisible((prevState) => !prevState);
	}

	function toggleForgotPassword()
	{
        setIsForgotPassword((prevState) => !prevState);
		setIsSignIn((prevState) => !prevState);
    }

	function toggleForgotUsername()
	{
        setIsForgotUsername((prevState) => !prevState);
		setIsSignIn((prevState) => !prevState);
    }

	return (
		<div className="flex justify-center">
		{isForgotPassword && <ForgotPassword changeState={toggleForgotPassword}/>}
		{isForgotUsername && <ForgotUsername changeState={toggleForgotUsername}/>}
		{isSignIn && (
			<div className="w-80 flex flex-col p-2 mt-6">
				<h1 className="text-5xl text-center font-poppins-bold ">Connexion</h1>
				<p className="font-poppins-regular mt-4 text-sm">Vous n'avez pas de compte ? <Link className="underline hover:text-[--color-pink]" to={ APP_ROUTES.SIGN_UP } >S'inscrire</Link></p>
				<form action="" className="flex flex-col mt-6">
					<UsernameInput 
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
				</form>
				<p className="font-poppins-regular mt-4 text-sm"><Link className="underline hover:text-[--color-pink]" onClick={toggleForgotUsername} >Nom d'utilisateur oublié</Link></p>
				<p className="font-poppins-regular mt-2 text-sm"><Link className="underline hover:text-[--color-pink]" onClick={toggleForgotPassword} >Mot de passe oublié</Link></p>
				{showValidation.server != "" && (
					<p className="text-center text-red-600 text-sm mt-4">{showValidation.server}</p>
				)}
				<button className="btn mt-6" onClick={handleSubmit}>Se connecter</button>
			</div>
		)}
		</div>
	)
}
