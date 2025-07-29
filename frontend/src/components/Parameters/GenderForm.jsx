import { useState } from "react";

export default function GenderForm({ data, setChangeSettings, errState, setVerified }) {
	const [inputState, setInputState] = useState(data.gender);

	function handleInputChange(e) {
		setInputState(e.target.value);
		if (e.target.value != data.gender) {
			setChangeSettings(prev => ({
				...prev,
				gender: e.target.value,
			}));	
		}
		else {
			setChangeSettings(prev => ({
				...prev,
				gender: null,
			}));	
		}
	}

	return (
		<>
			<div className="flex flex-col mt-6">
				<p className="font-poppins-light">Je suis</p>
				<div className="flex items-center space-x-2">
					<div className="w-full">
					<select
						className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none"
						name="gender"
						value={inputState}
						onChange={handleInputChange}
						onFocus={() => setVerified(false)}
					>
						<option value="man">Un homme</option>
						<option value="woman">Une femme</option>
					</select>
					</div>
				</div>
				{errState != "" && (
				<p className=" text-[--color-pink] text-sm ">{errState}</p>
				)}
			</div>
		</>
	)
}
