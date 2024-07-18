import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { APP_ROUTES, API_ROUTES } from "../utils/constants";
import DOMPurify from 'dompurify';
import axios from 'axios';

export default function SignIn() {
	const navigate = useNavigate();
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	function togglePasswordVisibility()
	{
		setIsPasswordVisible((prevState) => !prevState);
	}

	function checkError(username, password)
	{
		let errUsername = "";
		let errPassword = "";

		if (username.length == 0)
			errUsername = "Veuillez entrer un nom d'utilisateur";
		else if (username.length < 3 || username.length > 10)
			errUsername = "Nom d'utilisateur invalide";
		if (password.length == 0)
			errPassword = "Veuillez entrer un mot de passe";
		else if (password.length < 10 || password.length > 20)
			errPassword = "Mot de passe invalide";
		if (errUsername.length != 0)
			document.getElementById("errUsername").textContent = errUsername;
		else
			document.getElementById("errUsername").textContent = "";
		if (errPassword.length != 0)
			document.getElementById("errPassword").textContent = errPassword;
		else
			document.getElementById("errPassword").textContent = "";
		document.getElementById("errServ").textContent = "";
		if (errUsername.length == 0 && errPassword.length == 0)
			return (0);
		return (1);
	}

	function formSignIn()
	{
		let username = DOMPurify.sanitize(document.getElementById("username").value);
		let password = DOMPurify.sanitize(document.getElementById("password").value);

		if (checkError(username, password))
			return ;

		const obj = {
			username: username,
			password: password
		}
		axios.post(API_ROUTES.SIGN_IN, obj, {
			withCredentials: true,
		})
		.then((res) => {
			if (res.status != 200)
				throw new Error('Une erreur est survenue');
			else
				navigate('/');
		})
		.catch((err) => {
			if (err.response.data.message == "Invalid password")
				document.getElementById("errPassword").textContent = "Mot de passe invalide";
			else if (err.response.data.message == "Invalid username")
				document.getElementById("errUsername").textContent = "Nom d'utilisateur invalide";
			else if (err.response.data.message == "Email not verified")
				document.getElementById("errServ").textContent = "Veuillez d'abord vérifier votre adresse mail. Un lien de vérification vous a été envoyé.";
			else
				document.getElementById("errServ").textContent = "Formulaire invalide";
		});
	}

	return (
		<div className="flex justify-center">
			<div className="w-80 flex flex-col p-2 mt-6">
				<h1 className="text-5xl text-center font-poppins-bold ">Connexion</h1>
				<p className="font-poppins-regular mt-4 text-sm">Vous n'avez pas de compte ? <Link className="underline hover:text-[--color-pink]" to={ APP_ROUTES.SIGN_UP } >S'inscrire</Link></p>
				<form action="" className="flex flex-col mt-4">
					<label className="font-poppins-medium" htmlFor="username">Nom d'utilisateur</label>
					<input className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none" placeholder="Entrez nom d'utilisateur" type="text" name="username" id="username"/>
					<p className="text-center mt-1 text-sm" id="errUsername"></p>
					<label className="mt-2 font-poppins-medium" htmlFor="password">Mot de passe</label>
					<div className="relative">
						<input className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none" placeholder="Entrez mot de passe" type={isPasswordVisible ? "text" : "password"} name="password" id="password"/>
						<button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700">
							{isPasswordVisible ? (
								<svg width="24" height="24" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 2L22 22" stroke="#ababab" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335" stroke="#ababab" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818" stroke="#ababab" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></g></svg>
							) : (
								<svg width="24" height="24" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12" stroke="#ababab" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12" stroke="#ababab" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <circle cx="12" cy="12" r="3" stroke="#ababab" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></circle></g></svg>
							)}
						</button>
					</div>
					<p className="text-center mt-1 text-sm" id="errPassword"></p>
				</form>
				<p className="font-poppins-regular mt-2 text-sm"><Link className="underline hover:text-[--color-pink]" to={ APP_ROUTES.SIGN_UP } >Mot de passe oublié</Link></p>
				<p className="text-center mt-2 text-sm" id="errServ"></p>
				<button className="btn mt-4" onClick={formSignIn}>Se connecter</button>
			</div>
		</div>
	)
}
