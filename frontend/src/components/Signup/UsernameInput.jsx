export default function UsernameInput({inputsStates, setInputsStates, showValidation}) {

	let contentError = ""

	if (showValidation.username) {
		if (inputsStates.username.length < 3 || inputsStates.username.length > 10)
			contentError = "Votre nom d'utilisateur doit contenir entre 3 et 10 caractères"
		else
			contentError = "Le nom d'utilisateur est déjà pris"

	}

	return (
		<>
			<label className="font-poppins-medium" htmlFor="username">
			Nom d'utilisateur{" "} <span className="text-sm">(entre 3 et 10 caractères)</span>
			</label>
			<input
			className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none"
			type="text"
			name="username"
			id="username"
			autoComplete="username"
			placeholder="Entrez un nom d'utilisateur"
			value={inputsStates.username}
			onChange={e => setInputsStates({...inputsStates, username: e.target.value})}
			/>
			{showValidation.username && (
				<p className=" text-red-600 text-sm ">{contentError}</p>
			)}
		</>
	)
}
