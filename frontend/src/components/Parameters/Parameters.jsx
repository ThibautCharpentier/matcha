import { useState } from "react";
import UsernameForm from "./UsernameForm"
import EmailForm from "./EmailForm"
import PasswordForm from "./PasswordForm"
import PreferencesForm from "./PreferencesForm"
import GpsForm from "./GpsForm"
import LocationForm from "./LocationForm";

export default function Parameters() {
	const [isGpsVisible, setIsGpsVisible] = useState(false);

	function toggleGpsVisibility()
	{
		setIsGpsVisible((prevState) => !prevState);
	}

	return (
		<div className="flex flex-grow justify-center">
			<div className="w-96 flex flex-col p-2 mt-6">
				<h1 className="text-5xl text-center font-poppins-bold ">Paramètres</h1>
				<UsernameForm/>
				<EmailForm/>
				<PasswordForm/>
				<PreferencesForm/>
				<GpsForm changeState={toggleGpsVisibility}/>
				{isGpsVisible && <LocationForm/>}
			</div>
		</div>
	)
}
