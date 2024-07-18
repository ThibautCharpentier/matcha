export default function MailInput({inputsStates, setInputsStates, showValidation}) {
	let contentError = ""

	if (showValidation.mail) {
		if (inputsStates.mail.length === 0)
			contentError = "Ce champ ne peut pas être vide"
		else
			contentError = "Ce mail est déjà utilisé"
	}
	
	return (
		<>
			<label className="mt-3 font-poppins-medium" htmlFor="mail">Mail</label>
			<input
				className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none"
				type="text"
				name="mail"
				id="mail"
				placeholder="exemple@gmail.com"
				autoComplete="email"
				value={inputsStates.mail}
				onChange={e => setInputsStates({...inputsStates, mail: e.target.value})}
			/>
			{showValidation.mail && (
			<p className=" text-red-600 text-sm ">{contentError}</p>
		)}
		</>
	)
}