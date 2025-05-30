import { useState, useEffect } from "react";
import UsernameForm from "./UsernameForm"
import EmailForm from "./EmailForm"
import PasswordForm from "./PasswordForm"
import PreferencesForm from "./PreferencesForm"
import GpsForm from "./GpsForm"
import LocationForm from "./LocationForm";
import FirstnameForm from "./FirstnameForm";
import LastnameForm from "./LastnameForm";
import GenderForm from "./GenderForm";
import { useAuthentified } from "../AuthentifiedContext"
import ClipLoader from "react-spinners/ClipLoader";
import { DomEvent } from "leaflet";

export default function Parameters() {
	const { data } = useAuthentified();
	const [isGpsVisible, setIsGpsVisible] = useState(data.gps);
	const [changeSettings, setChangeSettings] = useState({
		firstname: null,
		lastname: null,
		gender: null,
		preferences: null,
		username: null,
		mail: null,
		password: null,
		confirmPassword: null,
		position: null,
		gps: null,
	})

	console.log(changeSettings)
	//console.log(data);
	useEffect(() => {
		setIsGpsVisible(data.gps)
    }, [data]);
		
	const handleSave = () => {
		console.log("save btn")
	}

	return (
		<>
			{(data.username !== "" && data.email !== "" && data.preferences !== "") ? (
				<div className="w-full min-h-[100dvh] flex flex-col justify-center mb-[4em] sm:mb-0 bg-gray-50 border-gray-300 border-l-[1px]">
					<div className="flex lg:flex-row flex-col p-2 w-full text-gray-600 ">
						<div className="flex flex-col lg:w-1/2 p-4 items-start">
							<h2 className="text-xl mb-2 text-black">Informations personnelles</h2>
							<div className="flex flex-row space-x-6 font-light mb-4 w-full">
								<FirstnameForm data={data} setChangeSettings={setChangeSettings} />
								<LastnameForm data={data} setChangeSettings={setChangeSettings} />
							</div>
							<div className="flex flex-row w-full space-x-6 mb-4">
								<div className="w-1/2">
									<GenderForm data={data} setChangeSettings={setChangeSettings} />
								</div>
								<div className="w-1/2">
									<PreferencesForm data={data} setChangeSettings={setChangeSettings} />
								</div>
							</div>
							<div className="mb-4 w-full">
								<GpsForm data={data} setChangeSettings={setChangeSettings} />
							</div>
							{isGpsVisible && (
								<div className="w-full">
									<LocationForm data={data} setChangeSettings={setChangeSettings} />
								</div>
							)}
						</div>
						<div className="flex flex-col lg:w-1/2 p-4 items-start border-gray-300 lg:border-l-[1px]">
							<h2 className="text-xl mb-2 text-black">Paramètres du compte</h2>
							<div className="mb-4 w-3/4">
								<UsernameForm data={data} setChangeSettings={setChangeSettings} />
							</div>
							<div className="mb-4 w-3/4">
								<EmailForm data={data} setChangeSettings={setChangeSettings} />
							</div>
							<div className="w-3/4">
								<PasswordForm setChangeSettings={setChangeSettings} />
							</div>
						</div>
	
					</div>
							<button 
								className="btn-secondary mt-8 self-center"
								onClick={handleSave}>
									Sauvegarder
							</button>
				</div>
			) : (
				<div className="w-full h-screen flex justify-center items-center">
					<ClipLoader
						color="#fff"
						size={70}
					/>
				</div>
			)}
		</>
	)
	
}
