import { useState } from "react";
import axios from 'axios';
import { API_ROUTES } from "../../utils/constants";

export default function GpsForm({changeState}) {
	const [inputState, setInputState] = useState(false);
	const [errState, setErrState] = useState("");

	function toggleInputState()
	{
		setInputState((prevState) => !prevState);
	}

	function handleSubmit(e) {
		const obj = {
			gps: e.target.checked,
		}

		setErrState("");
		axios.patch(API_ROUTES.UPDATE_GPS, obj, {
			withCredentials: true,
		})
		.then((res) => {
			if (res.status != 200)
				throw new Error('Une erreur est survenue');
			toggleInputState();
			changeState();
		})
		.catch((err) => {
			setErrState("Formulaire invalide");
		});
	}

	return (
		<>
			<form action="" className="flex flex-col mt-6">
				<div className="flex">
					<div className="w-3/4">
						<label className="font-poppins-medium">Autoriser la localisation GPS</label>
					</div>
					<input className=""
					type="checkbox"
					name="gps"
					id="gps"
					checked={inputState}
					onChange={handleSubmit}
					/>
				</div>
				{errState != "" && (
				<p className=" text-red-600 text-sm ">{errState}</p>
				)}
			</form>
		</>
	)
}
