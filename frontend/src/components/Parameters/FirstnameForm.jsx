import { useState } from "react";

export default function FirstnameForm({ data, setChangeSettings, errState }) {
	const [inputState, setInputState] = useState("");

	return (
		<>
			<div className="flex flex-col mt-6 w-1/2">
				<label className="font-poppins-light" htmlFor="firstname">Prénom</label>
				<div className="flex items-center space-x-2">
					<input className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none"
					placeholder={data.firstname === "" ? "Entrez votre prénom" : data.firstname}
					type="text"
					name="firstname"
					id="firstname"
					autoComplete="firstname"
					value={inputState}
					onChange={(e) => {
						if (e.target.value.length > 0)
							setChangeSettings(prev => ({
								...prev,
								firstname: e.target.value
							}));
						else {
							setChangeSettings(prev => ({
								...prev,
								firstname: null,
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
