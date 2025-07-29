import { useState } from "react";
import axios from 'axios';
import { API_ROUTES } from "../../utils/constants";

export default function GpsForm({ data }) {
	const [inputState, setInputState] = useState(data.gps);
	const [errState, setErrState] = useState("");

	function toggleInputState() {
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
		})
		.catch((err) => {
			setErrState("Formulaire invalide");
		});
	}

	return (
		<>
			<div className="flex flex-col mt-6">
				<div className="flex">
					<input className="mr-4"
					type="checkbox"
					name="gps"
					id="gps"
					checked={inputState}
					onChange={handleSubmit}
					/>
					<div className="w-3/4">
						<label className="font-poppins-light">Autoriser la localisation GPS</label>
					</div>
				</div>
				{errState != "" && (
				<p className=" text-[--color-pink] text-sm ">{errState}</p>
				)}
			</div>
		</>
	)
}
