import { useState } from "react";
import DOMPurify from 'dompurify';
import axios from 'axios';
import { API_ROUTES } from "../../utils/constants";
import BeatLoader from "react-spinners/BeatLoader";

export default function EmailForm({ data }) {
	const [inputState, setInputState] = useState("");
	const [verified, setVerified] = useState(false);
	const [errState, setErrState] = useState("");
	const [hasSubmit, setHasSumit] = useState(false);

	function handleSubmit(e) {
		e.preventDefault()

		if (validationCheck()) {
			setHasSumit(true)
			const obj = {
				email: DOMPurify.sanitize(inputState),
			}

			axios.patch(API_ROUTES.UPDATE_EMAIL, obj, {
				withCredentials: true,
			})
			.then((res) => {
				if (res.status != 200)
					throw new Error('Une erreur est survenue');
				setVerified(true);
				setInputState("");
			})
			.catch((err) => {
				if (err.response.data.message == "Email already exists")
					setErrState("Cette adresse e-mail est déjà utilisée");
				else
					setErrState("Formulaire invalide");
			})
			.finally(() => {
				setHasSumit(false)
			});
		}
	}

	function validationCheck() {
		if (inputState.length == 0) {
			setErrState("Ce champ ne peut pas être vide")
			return false;
		}
		else {
			setErrState("")
			return true;
		}
	}

	return (
		<>
			<form onSubmit={handleSubmit} action="" className="flex flex-col mt-6">
				<label className="font-poppins-medium" htmlFor="mail">Adresse e-mail</label>
				<div className="flex items-center space-x-2">
					<input className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none"
					placeholder={data.email === "" ? "Entrez une adresse mail" : data.email}
					type="text"
					name="mail"
					id="mail"
					autoComplete="email"
					value={inputState}
					onChange={(e) => {
						setInputState(e.target.value)
						setVerified(false)
					}}
					/>
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
				{verified != "" && (
				<p className="text-sm">Un mail de validation a été envoyé à votre nouvelle adresse</p>
				)}
			</form>
		</>
	)
}
