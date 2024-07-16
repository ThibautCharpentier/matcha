import { Link } from "react-router-dom"
import { APP_ROUTES } from "../utils/constants"
import { useState } from 'react'

export default function SignUp() {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

	function togglePasswordVisibility() {
		setIsPasswordVisible((prevState) => !prevState);
	}

	function toggleConfirmPasswordVisibility() {
		setIsConfirmPasswordVisible((prevState) => !prevState);
	}

	return (
    <div className="flex justify-center">
		<div className="w-80 flex flex-col p-2 mt-6">
        <h1 className="text-5xl text-center font-poppins-bold ">Créer un compte</h1>
        <p className="font-poppins-regular mt-4 text-sm">Vous avez déjà un compte ? <Link className="underline hover:text-[--color-pink]" to={ APP_ROUTES.SIGN_IN } >Se connecter</Link></p>
			<form action="" className="flex flex-col mt-6">
				<label className="font-poppins-medium" htmlFor="username ">Nom d'utilisateur <span className="text-sm">(entre 3 et 10 caractères)</span></label>
				<input className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none" type="text" name="username" id="username" placeholder="nom d'utilisateur"/>
				<label className="mt-2 sm font-poppins-medium" htmlFor="name">Prénom</label>
				<input className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none" type="text" name="name" id="name" placeholder="prénom"/>
				<label className="mt-2 font-poppins-medium" htmlFor="lastname">Nom</label>
				<input className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none" type="text" name="lastname" id="lastname" placeholder="nom"/>
				<label className="mt-2 font-poppins-medium" htmlFor="mail">Mail</label>
				<input className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none" type="text" name="mail" id="mail" placeholder="exemple@gmail.com"/>
				<label className="mt-2 font-poppins-medium" htmlFor="password">Mot de passe <span className="text-sm">(minimum 10 caractères)</span></label>
				<div class="relative">
					<input type={isPasswordVisible ? "text" : "password"} className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none" placeholder="Entrez mot de passe"/>
					<button
					type="button"
					onClick={togglePasswordVisibility}
					className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700"
					>
					{isPasswordVisible ? (
						<svg width="24" height="24" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 2L22 22" stroke="#ababab" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335" stroke="#ababab" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818" stroke="#ababab" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
					) : (
						<svg width="24" height="24" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12" stroke="#ababab" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12" stroke="#ababab" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <circle cx="12" cy="12" r="3" stroke="#ababab" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></circle> </g></svg>
					)}
					</button>
				</div>
				<label className="mt-2 font-poppins-medium" htmlFor="password">Confirmer mot de passe</label>
				<div class="relative">
					<input type={isConfirmPasswordVisible ? "text" : "password"} className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none" placeholder="Entrez mot de passe"/>
					<button
					type="button"
					onClick={toggleConfirmPasswordVisibility}
					className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700"
					>
					{isConfirmPasswordVisible ? (
						<svg width="24" height="24" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 2L22 22" stroke="#ababab" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335" stroke="#ababab" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818" stroke="#ababab" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
					) : (
						<svg width="24" height="24" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12" stroke="#ababab" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12" stroke="#ababab" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <circle cx="12" cy="12" r="3" stroke="#ababab" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></circle> </g></svg>
					)}
					</button>
				</div>
			</form>
			<button className="btn mt-8">Créer un compte</button>
        </div>
    </div>
	)
}

