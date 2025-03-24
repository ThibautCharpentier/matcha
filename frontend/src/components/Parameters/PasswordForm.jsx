import { useState } from "react";
import DOMPurify from 'dompurify';
import axios from 'axios';
import { API_ROUTES } from "../../utils/constants";
import BeatLoader from "react-spinners/BeatLoader";

export default function PasswordForm() {
	const [inputsStates, setInputsStates] = useState({
		password: "",
		confirmPassword: "",
	});
	const [verified, setVerified] = useState(false);
	const [errState, setErrState] = useState("");
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [hasSubmit, setHasSumit] = useState(false);

	function togglePasswordVisibility()
	{
		setIsPasswordVisible((prevState) => !prevState);
	}

	function handleSubmit(e) {
		e.preventDefault()

		if (validationCheck()) {
			setHasSumit(true)
			const obj = {
				password: DOMPurify.sanitize(inputsStates.password),
			}

			axios.patch(API_ROUTES.UPDATE_PASSWORD, obj, {
				withCredentials: true,
			})
			.then((res) => {
				if (res.status != 200)
					throw new Error('Une erreur est survenue');
				setVerified(true);
				setInputsStates({
					password: "",
					confirmPassword: "",
				})
			})
			.catch((err) => {
				setErrState("Formulaire invalide");
			})
			.finally(() => {
				setHasSumit(false)
			})
		}
	}

	function validationCheck() {
		const areValid = {
			password: false,
			confirmPassword: false
		}

		if (inputsStates.password.length < 10) {
			setErrState("Votre mot de passe doit contenir au moins 10 caractères")
			return false
		}
		else {
			areValid.password = true
			setErrState("")
		}

		if (inputsStates.confirmPassword !== inputsStates.password) {
			setErrState("Les mots de passe ne correspondent pas")
			return false
		}
		else {
			areValid.confirmPassword = true
			setErrState("")
		}

		return true
	}

	return (
		<>
			<form onSubmit={handleSubmit} action="" className="flex flex-col mt-6">
				<div className="flex items-center space-x-2">
					<div className="w-full">
						<label className="font-poppins-medium" htmlFor="password">Nouveau mot de passe</label>
						<div className="relative">
							<input
							className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none"
							placeholder="••••••••••"
							type={isPasswordVisible ? "text" : "password"}
							name="password"
							id="password"
							autoComplete="new-password"
							value={inputsStates.password}
							onChange={(e) => {
								setInputsStates({...inputsStates, password: e.target.value})
								setVerified(false)
							}}
							/>
							<button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700">
								{isPasswordVisible ? (
									<svg width="24" height="24" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 2L22 22" stroke="#ababab" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335" stroke="#ababab" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818" stroke="#ababab" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></g></svg>
								) : (
									<svg width="24" height="24" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12" stroke="#ababab" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12" stroke="#ababab" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <circle cx="12" cy="12" r="3" stroke="#ababab" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></circle></g></svg>
								)}
							</button>
						</div>
						<label className="mt-3 font-poppins-medium" htmlFor="confirmPassword">Confirmer mot de passe</label>
						<div className="relative">
							<input
							className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none"
							placeholder="••••••••••"
							type={isPasswordVisible ? "text" : "password"}
							name="confirmPassword"
							id="confirmPassword"
							autoComplete="new-password"
							value={inputsStates.confirmPassword}
							onChange={(e) => {
								setInputsStates({...inputsStates, confirmPassword: e.target.value})
								setVerified(false)
							}}
							/>
							<button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700">
								{isPasswordVisible ? (
									<svg width="24" height="24" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 2L22 22" stroke="#ababab" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335" stroke="#ababab" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818" stroke="#ababab" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></g></svg>
								) : (
									<svg width="24" height="24" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12" stroke="#ababab" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12" stroke="#ababab" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <circle cx="12" cy="12" r="3" stroke="#ababab" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></circle></g></svg>
								)}
							</button>
						</div>
					</div>
					{verified ? 
						<button className="btn flex justify-center items-center bg-[--color-pink] w-40 h-12 p-2" disabled>
							<svg height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
								<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
								<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
								<g id="SVGRepo_iconCarrier"> <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"></path> </g>
							</svg>
						</button>
					:
						<>
						{hasSubmit ?
							<button className="btn flex justify-center items-center w-40 h-12 p-2 bg-[--color-pink]" disabled>
								<BeatLoader
									color="#fff"
									size={9}
								/>
							</button>
						:
							<button className="btn flex justify-center items-center w-40 h-12 p-2">Envoyer</button>
						}
						</>
					}
				</div>
				{errState != "" && (
				<p className=" text-red-600 text-sm ">{errState}</p>
				)}
			</form>
		</>
	)
}
