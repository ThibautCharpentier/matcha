export default function UsernameInput({inputsStates, setInputsStates, showValidation}) {
	return (
		<>
			<label className="font-poppins-medium" htmlFor="username">Nom d'utilisateur</label>
			<input className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none" placeholder="Entrez un nom d'utilisateur"
			type="text"
			name="username"
			id="username"
			autoComplete="username"
			value={inputsStates.username}
			onChange={e => setInputsStates({...inputsStates, username: e.target.value.trimStart().replace(/\s{2,}/g, ' ')})}
			/>
			{showValidation.username != "" && (
				<p className="text-red-600 text-sm">{showValidation.username}</p>
			)}
		</>
	)
}
