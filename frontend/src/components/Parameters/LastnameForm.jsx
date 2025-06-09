import { useState } from "react";

export default function LastnameForm({ data, setChangeSettings, errState }) {
	const [inputState, setInputState] = useState("");

	return (
		<>
			<div className="flex flex-col mt-6 w-1/2">
				<label className="font-poppins-light" htmlFor="lastname">Nom</label>
				<div className="flex items-center space-x-2">
					<input className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none"
					placeholder={data.lastname === "" ? "Entrez votre nom" : data.lastname}
					type="text"
					name="lastname"
					id="lastname"
					autoComplete="lastname"
					value={inputState}
					onChange={(e) => {
						if (e.target.value.length > 0)
							setChangeSettings(prev => ({
								...prev,
								lastname: e.target.value
							}));
						else {
							setChangeSettings(prev => ({
								...prev,
								lastname: null,
							}));
						}
						setInputState(e.target.value)
					}}
					/>
				</div>
				{errState != "" && (
				<p className=" text-red-600 text-sm ">{errState}</p>
				)}
			</div>
		</>
	)
}
