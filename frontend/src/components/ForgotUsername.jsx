import { Link } from "react-router-dom";
import { API_ROUTES } from "../utils/constants";
import DOMPurify from 'dompurify';
import axios from 'axios';

export default function ForgotUsername({changeState}) {

	function checkError(email)
	{
		let errEmail = "";

		if (email.length == 0)
			errEmail = "Veuillez entrer votre email";
		if (errEmail.length != 0)
			document.getElementById("errEmail").textContent = errEmail;
		else
			document.getElementById("errEmail").textContent = "";
		document.getElementById("errServ").textContent = "";
		if (errEmail.length == 0)
        	return (0);
    	return (1);
	}

	function formForgotUsername()
	{
		let email = DOMPurify.sanitize(document.getElementById("email").value);

		if (checkError(email))
			return ;

		const obj = {
			email: email,
		}
		axios.post(API_ROUTES.FORGOT_USERNAME, obj, {
			withCredentials: true,
		})
		.then((res) => {
			if (res.status != 200)
				throw new Error('Une erreur est survenue');
			else if (res.data.message)
				document.getElementById("errServ").textContent = "L'intitulé de votre nom d'utilisateur vous a été envoyé";
		})
		.catch((err) => {
			console.log(err)
			if (err.response.data.message == "Invalid email")
				document.getElementById("errEmail").textContent = "Adresse mail invalide";
			else
				document.getElementById("errServ").textContent = "Formulaire invalide";
		});
	}

	return (
		<div className="w-80 flex flex-col p-2 mt-6">
			<p className="font-poppins-regular mt-4 text-sm">Veuillez indiquer votre adresse mail afin de vous envoyer l'intitulé de votre nom d'utilisateur</p>
			<form action="" className="flex flex-col mt-4">
				<label className="font-poppins-medium" htmlFor="email">Mail</label>
				<input className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none" placeholder="Entrez adresse mail" type="text" name="email" id="email"/>
				<p className="text-center mt-1 text-sm" id="errEmail"></p>
			</form>
			<p className="font-poppins-regular mt-2 text-sm"><Link className="underline hover:text-[--color-pink]" onClick={changeState}>Retour</Link></p>
			<p className="text-center mt-2 text-sm" id="errServ"></p>
			<button className="btn mt-4" onClick={formForgotUsername}>Envoyer</button>
		</div>
	)
}
