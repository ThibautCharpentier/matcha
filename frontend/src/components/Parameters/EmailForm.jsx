import { useState } from "react";

export default function EmailForm({ data, setChangeSettings, errState, verified }) {
	const [inputState, setInputState] = useState("");

	return (
		<>
			<div className="flex flex-col mt-6">
				<label className="font-poppins-light" htmlFor="mail">Adresse e-mail</label>
				<div className="flex items-center space-x-2">
					<input className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none"
					placeholder={data.email === "" ? "Entrez une adresse mail" : data.email}
					type="text"
					name="mail"
					id="mail"
					autoComplete="email"
					value={inputState}
					onChange={(e) => {
						if (e.target.value.length > 0)
							setChangeSettings(prev => ({
								...prev,
								mail: e.target.value
							}));
						else {
							setChangeSettings(prev => ({
								...prev,
								mail: null,
							}));
						}
						setInputState(e.target.value)
					}}
					/>
				</div>
				{errState != "" && (
				<p className=" text-red-600 text-sm ">{errState}</p>
				)}
				{verified != "" && (
				<p className="text-sm">Un mail de validation a été envoyé à votre nouvelle adresse</p>
				)}
			</div>
		</>
	)
}
