import { useState, useEffect } from "react";
import UsernameForm from "./UsernameForm"
import EmailForm from "./EmailForm"
import PasswordForm from "./PasswordForm"
import PreferencesForm from "./PreferencesForm"
import GpsForm from "./GpsForm"
import LocationForm from "./LocationForm";

export default function Parameters({ data }) {
	const [isGpsVisible, setIsGpsVisible] = useState(data.gps);

	useEffect(() => {
		setIsGpsVisible(data.gps)
    }, [data]);

	return (
		<div className="flex flex-grow justify-center">
			<div className="w-96 flex flex-col p-2 mt-6">
				<h1 className="text-5xl text-center font-poppins-bold ">Paramètres</h1>
				<UsernameForm data={data} />
				<EmailForm data={data}/>
				<PasswordForm/>
				<PreferencesForm data={data}/>
				<GpsForm data={data}/>
				{isGpsVisible && <LocationForm data={data}/>}
			</div>
		</div>
	)
}
