import { useState, useEffect } from "react";
import DOMPurify from 'dompurify';
import axios from 'axios';
import { API_ROUTES } from "../../utils/constants";
import BeatLoader from "react-spinners/BeatLoader";

export default function GenderForm({ data, setChangeSettings }) {
	const [inputState, setInputState] = useState(data.gender);
	const [verified, setVerified] = useState(false);
	const [errState, setErrState] = useState("");
	const [hasSubmit, setHasSumit] = useState(false);

	useEffect(() => {
		setInputState(data.gender)
    }, [data]);

	function handleInputChange(e) {
		setInputState(e.target.value);
		if (e.target.value != data.gender) {
			setChangeSettings(prev => ({
				...prev,
				gender: e.target.value,
			}));	
		}
		else {
			setChangeSettings(prev => ({
				...prev,
				gender: null,
			}));	
		}
	}

	function handleSubmit(e) {
		e.preventDefault()

		if (inputState == "")
		{
			setErrState("Veuillez sélectionner un champ");
			return ;
		}
		setErrState("")
		setHasSumit(true)

		const obj = {
			gender: DOMPurify.sanitize(inputState),
		}

		axios.patch(API_ROUTES.UPDATE_GENDER, obj, {
			withCredentials: true,
		})
		.then((res) => {
			if (res.status != 200)
				throw new Error('Une erreur est survenue');
			setVerified(true);
		})
		.catch((err) => {
			setErrState("Formulaire invalide");
		})
		.finally(() => {
			setHasSumit(false)
		})
	}

	return (
		<>
			<form onSubmit={handleSubmit} action="" className="flex flex-col mt-6">
				<p className="font-poppins-light">Je suis</p>
				<div className="flex items-center space-x-2">
					<div className="w-full">
					<select
						className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none"
						name="gender"
						value={inputState}
						onChange={handleInputChange}
						onFocus={() => setVerified(false)}
					>
						<option value="man">Un homme</option>
						<option value="woman">Une femme</option>
					</select>
					</div>
				</div>
				{errState != "" && (
				<p className=" text-red-600 text-sm ">{errState}</p>
				)}
			</form>
		</>
	)
}
