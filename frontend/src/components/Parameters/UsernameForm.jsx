import { useState, useEffect } from "react";

export default function UsernameForm({ data, setChangeSettings, errState, verified, setVerified }) {
	const [inputState, setInputState] = useState("");

	useEffect(() => {
		if (verified)
			setInputState("")
    }, [verified]);

	return (
		<>
			<div className="flex flex-col mt-6">
				<label className="font-poppins-light" htmlFor="username">Nom d'utilisateur{" "}<span className="text-xs font-poppins-light">(entre 3 et 10 caractères)</span></label>
				<div className="flex items-center space-x-2">
					<input className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none"
					placeholder={data.username === "" ? "Entrez un nom d'utilisateur" : data.username}
					type="text"
					name="username"
					id="username"
					autoComplete="username"
					value={inputState}
					onChange={(e) => {
						setVerified(false)
						const cleanValue = e.target.value.trimStart();
						if (cleanValue.length > 0)
							setChangeSettings(prev => ({
								...prev,
								username: cleanValue
							}));
						else {
							setChangeSettings(prev => ({
								...prev,
								username: null,
							}));
						}
						setInputState(cleanValue)
					}}
					/>
				</div>
				{errState != "" && (
				<p className=" text-[--color-pink] text-sm ">{errState}</p>
				)}
			</div>
		</>
	)
}
