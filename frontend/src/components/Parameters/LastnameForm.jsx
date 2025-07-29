import { useState, useEffect } from "react";

export default function LastnameForm({ data, setChangeSettings, errState, verified, setVerified }) {
	const [inputState, setInputState] = useState("");

	useEffect(() => {
		if (verified)
			setInputState("")
    }, [verified]);

	return (
		<>
			<div className="flex flex-col mt-6 w-1/2">
				<label className="font-poppins-light" htmlFor="lastname">Nom{" "}<span className="text-xs font-poppins-light">(maximun 20 caractères)</span></label>
				<div className="flex items-center space-x-2">
					<input className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none"
					placeholder={data.lastname === "" ? "Entrez votre nom" : data.lastname}
					type="text"
					name="lastname"
					id="lastname"
					autoComplete="lastname"
					value={inputState}
					onChange={(e) => {
						setVerified(false)
						const cleanValue = e.target.value.trimStart().replace(/\s{2,}/g, ' ');
						if (cleanValue.length > 0)
							setChangeSettings(prev => ({
								...prev,
								lastname: cleanValue
							}));
						else {
							setChangeSettings(prev => ({
								...prev,
								lastname: null,
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
