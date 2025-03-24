import { useState } from "react";
import DOMPurify from 'dompurify';
import axios from 'axios';
import { API_ROUTES } from "../../utils/constants";
import BeatLoader from "react-spinners/BeatLoader";

export default function UsernameForm({ data }) {
	const [inputState, setInputState] = useState("");
	const [verified, setVerified] = useState(false);
	const [errState, setErrState] = useState("");
	const [hasSubmit, setHasSumit] = useState(false);

	function handleSubmit(e) {
		e.preventDefault()

		if (validationCheck()) {
			setHasSumit(true)
			const obj = {
				username: DOMPurify.sanitize(inputState),
			}

			axios.patch(API_ROUTES.UPDATE_USERNAME, obj, {
				withCredentials: true,
			})
			.then((res) => {
				if (res.status != 200)
					throw new Error('Une erreur est survenue');
				setVerified(true);
				setInputState("");
			})
			.catch((err) => {
				if (err.response.data.message == "Username already exists")
					setErrState("Le nom d'utilisateur est déjà pris");
				else
					setErrState("Formulaire invalide");
			})
			.finally(() => {
				setHasSumit(false)
			});
		}
	}

	function validationCheck() {
		if (inputState.length < 3 || inputState.length > 10) {
			setErrState("Votre nom d'utilisateur doit contenir entre 3 et 10 caractères")
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
				<label className="font-poppins-medium" htmlFor="username">Nom d'utilisateur</label>
				<div className="flex items-center space-x-2">
					<input className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none"
					placeholder={data.username === "" ? "Entrez un nom d'utilisateur" : data.username}
					type="text"
					name="username"
					id="username"
					autoComplete="username"
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
			</form>
		</>
	)
}
