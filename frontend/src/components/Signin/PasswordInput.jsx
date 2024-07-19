export default function PasswordInput({inputsStates, setInputsStates, showValidation, isPasswordVisible, togglePasswordVisibility}) {
	return (
		<>
			<label className="mt-3 font-poppins-medium" htmlFor="password">Mot de passe</label>
			<div className="relative">
				<input
				className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none"
				placeholder="Entrez un mot de passe"
				type={isPasswordVisible ? "text" : "password"}
				name="password"
				id="password"
				autoComplete="new-password"
				value={inputsStates.password}
				onChange={e => setInputsStates({...inputsStates, password: e.target.value})}
				/>
				<button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700">
					{isPasswordVisible ? (
						<svg width="24" height="24" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 2L22 22" stroke="#ababab" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335" stroke="#ababab" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818" stroke="#ababab" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></g></svg>
					) : (
						<svg width="24" height="24" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12" stroke="#ababab" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12" stroke="#ababab" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <circle cx="12" cy="12" r="3" stroke="#ababab" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></circle></g></svg>
					)}
				</button>
			</div>
			{showValidation.password != "" && (
				<p className="text-red-600 text-sm">{showValidation.password}</p>
			)}
		</>
	)
}
