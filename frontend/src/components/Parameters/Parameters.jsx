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
import DOMPurify from 'dompurify';
import axios from 'axios';
import { API_ROUTES } from "../../utils/constants";
import BeatLoader from "react-spinners/BeatLoader";

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
	})
	const [errState, setErrorState] = useState({
		firstname: "",
		lastname: "",
		gender: "",
		preferences: "",
		username: "",
		mail: "",
		password: "",
		confirmPassword: "",
		position: "",
	})
	const [verified, setVerified] = useState(false);

	console.log(changeSettings)

	useEffect(() => {
		setIsGpsVisible(data.gps)
    }, [data]);

	async function getCityName(lat, lng) {
		try {
			const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
			return (res.data.address.city || res.data.address.town || res.data.address.village)
		}
		catch (err) {
			setErrorState(prev => ({
				...prev,
				position: "Formulaire invalide"
			}));
			return (null);
		}
	}
		
	const handleSubmit = (e) => {
		e.preventDefault()
		console.log("save btn")
	}

	return (
		<>
			{(data.username !== "" && data.email !== "" && data.preferences !== "") ? (
				<form onSubmit={handleSubmit} action="" className="w-full min-h-[100dvh] h-full flex flex-col justify-center mb-[4em] sm:mb-0 bg-gray-50 border-gray-300 border-l-[1px]">
					<div className="flex lg:flex-row flex-col sm:p-2 w-full text-gray-600 ">
						<div className="flex flex-col lg:w-1/2 px-4 sm:py-4 items-start">
							<h2 className="text-xl text-black">Informations personnelles</h2>
							<div className="flex flex-row space-x-6 font-light w-full">
								<FirstnameForm data={data} setChangeSettings={setChangeSettings} errState={errState.firstname} />
								<LastnameForm data={data} setChangeSettings={setChangeSettings} errState={errState.lastname}/>
							</div>
							<div className="flex flex-row w-full space-x-6">
								<div className="w-1/2">
									<GenderForm data={data} setChangeSettings={setChangeSettings} errState={errState.gender}/>
								</div>
								<div className="w-1/2">
									<PreferencesForm data={data} setChangeSettings={setChangeSettings} errState={errState.preferences}/>
								</div>
							</div>
							<div className="w-full">
								<GpsForm data={data} />
							</div>
							{isGpsVisible && (
								<div className="w-full">
									<LocationForm data={data} setChangeSettings={setChangeSettings} errState={errState.position} />
								</div>
							)}
						</div>
						<div className="flex flex-col lg:w-1/2 px-4 sm:py-4 items-start border-gray-300 lg:border-l-[1px]">
							<h2 className="text-xl mt-8 sm:mt-0 text-black">Paramètres du compte</h2>
							<div className="md:w-3/4 w-full">
								<UsernameForm data={data} setChangeSettings={setChangeSettings} errState={errState.username} />
							</div>
							<div className="md:w-3/4 w-full">
								<EmailForm data={data} setChangeSettings={setChangeSettings} errState={errState.mail} verified={verified} />
							</div>
							<div className="md:w-3/4  w-full">
								<PasswordForm setChangeSettings={setChangeSettings} />
							</div>
						</div>
					</div>
					<button className="btn-secondary mt-8 mb-8 self-center">
						Sauvegarder
					</button>
				</form>
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
