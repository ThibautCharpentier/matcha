export default function MailInput({inputsStates, setInputsStates, showValidation}) {
	
	return (
		<>
			<label className="mt-3 font-poppins-medium" htmlFor="mail">Adresse e-mail</label>
			<input
				className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none"
				type="text"
				name="mail"
				id="mail"
				placeholder="Entrez une adresse mail"
				autoComplete="email"
				value={inputsStates.mail}
				onChange={e => setInputsStates({...inputsStates, mail: e.target.value.trim()})}
			/>
			{showValidation.mail != "" && (
			<p className=" text-red-600 text-sm ">{showValidation.mail}</p>
			)}
		</>
	)
}
