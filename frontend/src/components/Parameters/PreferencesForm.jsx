import { useState } from "react";

export default function PreferencesForm({ data, setChangeSettings, errState, setVerified }) {
	const [inputState, setInputState] = useState(data.preferences);

	function handleInputChange(e) {
		setInputState(e.target.value);
		if (e.target.value != data.preferences) {
			setChangeSettings(prev => ({
				...prev,
				preferences: e.target.value,
			}));	
		}
		else {
			setChangeSettings(prev => ({
				...prev,
				preferences: null,
			}));	
		}
	}

	return (
		<>
			<div className="flex flex-col mt-6">
				<p className="font-poppins-light">Je préfère</p>
				<div className="flex items-center space-x-2">
					<div className="w-full">
					<select
						className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none"
						name="preferences"
						value={inputState}
						onChange={handleInputChange}
						onFocus={() => setVerified(false)}
					>
						<option value="men">Les Hommes</option>
						<option value="women">Les Femmes</option>
						<option value="bi">Les deux</option>
					</select>
					</div>
				</div>
				{errState != "" && (
				<p className=" text-red-600 text-sm ">{errState}</p>
				)}
			</div>
		</>
	)
}
