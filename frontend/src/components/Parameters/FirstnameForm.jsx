import { useState, useEffect } from "react";

export default function FirstnameForm({ data, setChangeSettings, errState, verified, setVerified }) {
	const [inputState, setInputState] = useState("");

	useEffect(() => {
		if (verified)
			setInputState("")
    }, [verified]);

	return (
		<>
			<div className="flex flex-col mt-6 w-1/2">
				<label className="font-poppins-light" htmlFor="firstname">Prénom{" "}<span className="text-sm font-poppins-light">(20 caractères max)</span></label>
				<div className="flex items-center space-x-2">
					<input className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none"
					placeholder={data.firstname === "" ? "Entrez votre prénom" : data.firstname}
					type="text"
					name="firstname"
					id="firstname"
					autoComplete="firstname"
					value={inputState}
					onChange={(e) => {
						setVerified(false)
						const cleanValue = e.target.value.trimStart().replace(/\s{2,}/g, ' ');
						if (cleanValue.length > 0)
							setChangeSettings(prev => ({
								...prev,
								firstname: cleanValue
							}));
						else {
							setChangeSettings(prev => ({
								...prev,
								firstname: null,
							}));
						}
						setInputState(cleanValue)
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
