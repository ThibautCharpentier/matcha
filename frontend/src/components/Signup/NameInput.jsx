export default function NameInput({inputsStates, setInputsStates, showValidation}) {

	let contentError = ""

	if (inputsStates.name.length === 0)
		contentError = "Ce champ ne peut pas être vide"

	return (
	<>
		<label className="mt-3 sm font-poppins-medium" htmlFor="name">Prénom</label>
		<input
		className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none"
		type="text"
		name="name"
		id="name"
		autoComplete="given-name"
		placeholder="Entrez votre prénom"
		value={inputsStates.name}
		onChange={e => setInputsStates({...inputsStates, name: e.target.value})}
		/>
		{showValidation.name && (
			<p className=" text-red-600 text-sm ">{contentError}</p>
		)}
	</>
	)
}
