import { useState } from "react";
import DOMPurify from 'dompurify';
import axios from 'axios';
import { API_ROUTES } from "../../utils/constants";

export default function EmailForm() {
	const [inputState, setInputState] = useState("");
	const [errState, setErrState] = useState("");

	function handleInputChange(e) {
		setInputState(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault()

		if (inputState == "")
		{
			setErrState("Veuillez sélectionner un champ");
			return ;
		}
		setErrState("")

		const obj = {
			preferences: DOMPurify.sanitize(inputState),
		}

		axios.patch(API_ROUTES.UPDATE_PREFERENCES, obj, {
			withCredentials: true,
		})
		.then((res) => {
			if (res.status != 200)
				throw new Error('Une erreur est survenue');
		})
		.catch((err) => {
			setErrState("Formulaire invalide");
		});
	}

	return (
		<>
			<form action="" className="flex flex-col mt-6">
				<p className="font-poppins-medium">Préférences</p>
				<div className="flex items-center space-x-2">
					<div className="w-full">
						<div className="flex">
							<div className="w-1/2">
								<label className="font-poppins-regular text-sm">Hommes</label>
							</div>
							<input className=""
							type="radio"
							name="preferences"
							id="men"
							value="hommes"
							checked={inputState == "hommes"}
							onChange={handleInputChange}
							/>
						</div>
						<div className="flex">
							<div className="w-1/2">
								<label className="font-poppins-regular text-sm">Femmes</label>
							</div>
							<input className=""
							type="radio"
							name="preferences"
							id="women"
							value="femmes"
							checked={inputState == "femmes"}
							onChange={handleInputChange}
							/>
						</div>
						<div className="flex">
							<div className="w-1/2">
								<label className="font-poppins-regular text-sm">Les deux</label>
							</div>
							<input className=""
							type="radio"
							name="preferences"
							id="bi"
							value="bi"
							checked={inputState == "bi"}
							onChange={handleInputChange}
							/>
						</div>
					</div>
					<button className="btn" onClick={handleSubmit}>Envoyer</button>
				</div>
				{errState != "" && (
				<p className=" text-red-600 text-sm ">{errState}</p>
				)}
			</form>
		</>
	)
}
