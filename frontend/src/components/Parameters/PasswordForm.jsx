import { useState, useEffect } from "react";

export default function PasswordForm({setChangeSettings, errStatePassword, errStateCurrentPassword, verified, setVerified}) {
	const [inputsStates, setInputsStates] = useState({
		currentPassword: "",
		password: "",
		confirmPassword: "",
	});
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	function togglePasswordVisibility() {
		setIsPasswordVisible((prevState) => !prevState);
	}

	useEffect(() => {
		if (verified) {
			setInputsStates({
				currentPassword: "",
				password: "",
				confirmPassword: "",
			})
		}
    }, [verified]);

	return (
		<>
			<div className="flex flex-col mt-10">
				<h2 className="text-xl text-black">Changer mot de passe</h2>
				<p className="text-sm text-gray-400 font-poppins-light">Ton mot de passe doit contenir au moins 10 caractères ainsi qu'une combinaison de chiffres, de lettres et de caractères spéciaux (!$@%)</p>
				<div className="flex items-center space-x-2 mt-4">
					<div className="w-full">
						<label className="font-poppins-light" htmlFor="currentPassword">Mot de passe actuel</label>
						<div className="relative">
							<input
							className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none"
							placeholder="••••••••••"
							type={isPasswordVisible ? "text" : "password"}
							name="currentPassword"
							id="currentPassword"
							value={inputsStates.currentPassword}
							onChange={(e) => {
								setVerified(false)
								if (e.target.value.length > 0) {
									setChangeSettings(prev => ({
										...prev,
										currentPassword: e.target.value,
									}));
								}
								else {
									setChangeSettings(prev => ({
										...prev,
										currentPassword: null,
									}));
								}
								setInputsStates({...inputsStates, currentPassword: e.target.value})
							}}
							/>
							<button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700">
								{isPasswordVisible ? (
									<svg width="24" height="24" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 2L22 22" stroke="#ababab" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335" stroke="#ababab" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818" stroke="#ababab" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></g></svg>
								) : (
									<svg width="24" height="24" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12" stroke="#ababab" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12" stroke="#ababab" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <circle cx="12" cy="12" r="3" stroke="#ababab" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></circle></g></svg>
								)}
							</button>
						</div>
						{errStateCurrentPassword != "" && (
						<p className="text-[--color-pink] text-sm ">{errStateCurrentPassword}</p>
						)}
						<label className="font-poppins-light flex mt-6" htmlFor="password">Nouveau mot de passe</label>
						<div className="relative">
							<input
							className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none"
							placeholder="••••••••••"
							type={isPasswordVisible ? "text" : "password"}
							name="password"
							id="password"
							autoComplete="new-password"
							value={inputsStates.password}
							onChange={(e) => {
								setVerified(false)
								if (e.target.value.length > 0) {
									setChangeSettings(prev => ({
										...prev,
										password: e.target.value,
									}));
								}
								else {
									setChangeSettings(prev => ({
										...prev,
										password: null,
									}));
								}
								setInputsStates({...inputsStates, password: e.target.value})
							}}
							/>
							<button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700">
								{isPasswordVisible ? (
									<svg width="24" height="24" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 2L22 22" stroke="#ababab" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335" stroke="#ababab" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818" stroke="#ababab" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></g></svg>
								) : (
									<svg width="24" height="24" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12" stroke="#ababab" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12" stroke="#ababab" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <circle cx="12" cy="12" r="3" stroke="#ababab" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></circle></g></svg>
								)}
							</button>
						</div>
						<label className="mt-4 flex font-poppins-light" htmlFor="confirmPassword">Confirmer mot de passe</label>
						<div className="relative">
							<input
							className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none"
							placeholder="••••••••••"
							type={isPasswordVisible ? "text" : "password"}
							name="confirmPassword"
							id="confirmPassword"
							autoComplete="new-password"
							value={inputsStates.confirmPassword}
							onChange={(e) => {
								setVerified(false)
								if (e.target.value.length > 0) {
									setChangeSettings(prev => ({
										...prev,
										confirmPassword: e.target.value,
									}));
								}
								else {
									setChangeSettings(prev => ({
										...prev,
										confirmPassword: null,
									}));
								}
								setInputsStates({...inputsStates, confirmPassword: e.target.value})
							}}
							onPaste={(e) => e.preventDefault()}
							/>
							<button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700">
								{isPasswordVisible ? (
									<svg width="24" height="24" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 2L22 22" stroke="#ababab" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335" stroke="#ababab" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818" stroke="#ababab" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></g></svg>
								) : (
									<svg width="24" height="24" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12" stroke="#ababab" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12" stroke="#ababab" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <circle cx="12" cy="12" r="3" stroke="#ababab" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></circle></g></svg>
								)}
							</button>
						</div>
					</div>
				</div>
				{errStatePassword != "" && (
				<p className=" text-[--color-pink] text-sm ">{errStatePassword}</p>
				)}
			</div>
		</>
	)
}
