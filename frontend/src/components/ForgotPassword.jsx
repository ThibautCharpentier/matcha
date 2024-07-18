import { Link } from "react-router-dom";
import { API_ROUTES } from "../utils/constants";
import DOMPurify from 'dompurify';
import axios from 'axios';

export default function ForgotPassword({changeState}) {

	function checkError(username)
	{
		let errUsername = "";

		if (username.length == 0)
			errUsername = "Veuillez entrer un nom d'utilisateur";
		else if (username.length < 3 || username.length > 10)
			errUsername = "Nom d'utilisateur invalide";
		if (errUsername.length != 0)
			document.getElementById("errUsername").textContent = errUsername;
		else
			document.getElementById("errUsername").textContent = "";
		document.getElementById("errServ").textContent = "";
		if (errUsername.length == 0)
        	return (0);
    	return (1);
	}

	function formForgotPassword()
	{
		let username = DOMPurify.sanitize(document.getElementById("username").value);

		if (checkError(username))
			return ;

		const obj = {
			username: username,
		}
		axios.post(API_ROUTES.FORGOT_PASSWORD, obj, {
			withCredentials: true,
		})
		.then((res) => {
			if (res.status != 200)
				throw new Error('Une erreur est survenue');
			else if (res.data.message)
				document.getElementById("errServ").textContent = "Le lien a été envoyé à l'adresse " + res.data.message;
		})
		.catch((err) => {
			console.log(err)
			if (err.response.data.message == "Invalid username")
				document.getElementById("errUsername").textContent = "Nom d'utilisateur invalide";
			else
				document.getElementById("errServ").textContent = "Formulaire invalide";
		});
	}

	return (
		<div className="w-80 flex flex-col p-2 mt-6">
			<p className="font-poppins-regular mt-4 text-sm">Veuillez indiquer votre nom d'utilisateur afin de vous envoyer un lien de changement de mot de passe</p>
			<form action="" className="flex flex-col mt-4">
				<label className="font-poppins-medium" htmlFor="username">Nom d'utilisateur</label>
				<input className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none" placeholder="Entrez nom d'utilisateur" type="text" name="username" id="username"/>
				<p className="text-center mt-1 text-sm" id="errUsername"></p>
			</form>
			<p className="font-poppins-regular mt-2 text-sm"><Link className="underline hover:text-[--color-pink]" onClick={changeState}>Retour</Link></p>
			<p className="text-center mt-2 text-sm" id="errServ"></p>
			<button className="btn mt-4" onClick={formForgotPassword}>Envoyer</button>
		</div>
	)
}
