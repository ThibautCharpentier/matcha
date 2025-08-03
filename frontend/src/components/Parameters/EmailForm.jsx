import { useState } from "react";

export default function EmailForm({ data, setChangeSettings, errState, verified, setVerified }) {
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
						setVerified(false)
						const cleanValue = e.target.value.trimStart();
						if (cleanValue.length > 0)
							setChangeSettings(prev => ({
								...prev,
								mail: cleanValue
							}));
						else {
							setChangeSettings(prev => ({
								...prev,
								mail: null,
							}));
						}
						setInputState(cleanValue)
					}}
					/>
				</div>
				{errState != "" && (
				<p className=" text-[--color-pink] text-sm ">{errState}</p>
				)}
				{verified != "" && inputState != "" && (
				<p className="text-sm">Un mail de validation a été envoyé à votre nouvelle adresse</p>
				)}
			</div>
		</>
	)
}
