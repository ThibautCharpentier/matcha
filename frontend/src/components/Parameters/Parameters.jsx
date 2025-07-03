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
import { showErrorData, showSuccess } from "../../utils/toastUtils";


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
		position: "",
		global: ""
	})
	const [verified, setVerified] = useState(false);
	const [hasSubmit, setHasSubmit] = useState(false)
	
	console.log(changeSettings);

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
	
	async function validationCheck() {
		const areValid = {
			firstname: false,
			lastname: false,
			username: false,
			mail: false,
			password: false,
			confirmPassword: false,
			position: false,
		}

		console.log(changeSettings.firstname)
		if (changeSettings.firstname != null && (changeSettings.firstname.length < 1 || changeSettings.firstname.length > 20)) {
			setErrorState(prev => ({
				...prev,
				firstname: "Ce champ ne peut pas être vide"
			}))
		}
		else {
			areValid.firstname = true
			setErrorState(prev => ({
				...prev,
				firstname: ""
			}))
		}

		if (changeSettings.lastname != null && (changeSettings.lastname.length < 1 || changeSettings.lastname.length > 20)) {
			setErrorState(prev => ({
				...prev,
				lastname: "Ce champ ne peut pas être vide"
			}))
		}
		else {
			areValid.lastname = true
			setErrorState(prev => ({
				...prev,
				lastname: ""
			}))
		}

		if (changeSettings.username != null && (changeSettings.username.length < 3 || changeSettings.username.length > 10)) {
			setErrorState(prev => ({
				...prev,
				username: "Votre nom d'utilisateur doit contenir entre 3 et 10 caractères"
			}))
		}
		else {
			areValid.username = true
			setErrorState(prev => ({
				...prev,
				username: ""
			}))
		}

		if (changeSettings.mail != null && changeSettings.mail.length < 1) {
			setErrorState(prev => ({
				...prev,
				mail: "Ce champ ne peut pas être vide"
			}))
		}
		else {
			areValid.mail = true
			setErrorState(prev => ({
				...prev,
				mail: ""
			}))
		}

		if (changeSettings.password != null && changeSettings.password.length < 10) {
			setErrorState(prev => ({
				...prev,
				password: "Votre mot de passe doit contenir au moins 10 caractères"
			}))
		}
		else {
			areValid.password = true
			setErrorState(prev => ({
				...prev,
				password: ""
			}))

			if (changeSettings.confirmPassword !== changeSettings.password) {
				setErrorState(prev => ({
					...prev,
					password: "Les mots de passe ne correspondent pas"
				}))
			}
			else {
				areValid.confirmPassword = true
				setErrorState(prev => ({
					...prev,
					password: ""
				}))
			}
		}

		if (changeSettings.position != null && !(changeSettings.position.city = await getCityName(changeSettings.position.lat, changeSettings.position.lng))) {
			setErrorState(prev => ({
				...prev,
				position: "Erreur interne lors de la localisation GPS"
			}))
		}
		else {
			areValid.position = true
			setErrorState(prev => ({
				...prev,
				position: ""
			}))
		}

		if (Object.values(areValid).every(value => value == true))
			return true
		else
			return false
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		
		setErrorState(prev => ({
			firstname: "",
			lastname: "",
			gender: "",
			preferences: "",
			username: "",
			mail: "",
			password: "",
			position: "",
			global: ""
		}));
		if (await validationCheck()) {
			setHasSubmit(true)
			const obj = {
				firstname: changeSettings.firstname === null ? undefined : DOMPurify.sanitize(changeSettings.firstname),
				lastname: changeSettings.lastname === null ? undefined : DOMPurify.sanitize(changeSettings.lastname),
				gender: changeSettings.gender === null ? undefined : DOMPurify.sanitize(changeSettings.gender),
				preferences: changeSettings.preferences === null ? undefined : DOMPurify.sanitize(changeSettings.preferences),
				username: changeSettings.username === null ? undefined : DOMPurify.sanitize(changeSettings.username),
				email: changeSettings.mail === null ? undefined : DOMPurify.sanitize(changeSettings.mail),
				password: changeSettings.password === null ? undefined : DOMPurify.sanitize(changeSettings.password),
				lat: changeSettings.position === null ? undefined : parseFloat(changeSettings.position.lat.toFixed(6)),
				lng: changeSettings.position === null ? undefined : parseFloat(changeSettings.position.lng.toFixed(6)),
				city: changeSettings.position === null ? undefined : DOMPurify.sanitize(changeSettings.position.city),
			}

			axios.patch(API_ROUTES.UPDATE_PARAMETERS, obj, {
				withCredentials: true,
			})
			.then((res) => {
				if (res.status != 200)
					throw new Error('Une erreur est survenue');
				setVerified(true);
				setChangeSettings({
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
				showSuccess("Les modifications ont été enregistrées.");
			})
			.catch((err) => {
				if (err.response.data.message == 'Username already exists') {
					setErrorState(prev => ({
						...prev,
						username: "Le nom d'utilisateur est déjà pris"
					}))
				}
				else if (err.response.data.message == 'Email already exists') {
					setErrorState(prev => ({
						...prev,
						mail: "Cette adresse e-mail est déjà utilisée"
					}))
				}
				showErrorData();
			})
			.finally(() => {
				setHasSubmit(false)
			})
		}
		else {
			showErrorData();
		}
	}

	return (
		<>
			{(data.username !== "" && data.email !== "" && data.preferences !== "") ? (
				<form onSubmit={handleSubmit} action="" className="w-full min-h-[100dvh] h-full flex flex-col justify-center mb-[4em] sm:mb-0 bg-gray-50 border-gray-300 border-l-[1px]">
					<div className="flex lg:flex-row flex-col sm:p-2 w-full text-gray-600 ">
						<div className="flex flex-col lg:w-1/2 px-4 sm:py-4 items-start">
							<h2 className="text-xl text-black">Informations personnelles</h2>
							<div className="flex flex-row space-x-6 font-light w-full">
								<FirstnameForm data={data} setChangeSettings={setChangeSettings} errState={errState.firstname} verified={verified} setVerified={setVerified} />
								<LastnameForm data={data} setChangeSettings={setChangeSettings} errState={errState.lastname} verified={verified} setVerified={setVerified}/>
							</div>
							<div className="flex flex-row w-full space-x-6">
								<div className="w-1/2">
									<GenderForm data={data} setChangeSettings={setChangeSettings} errState={errState.gender} setVerified={setVerified}/>
								</div>
								<div className="w-1/2">
									<PreferencesForm data={data} setChangeSettings={setChangeSettings} errState={errState.preferences} setVerified={setVerified}/>
								</div>
							</div>
							<div className="w-full">
								<GpsForm data={data} />
							</div>
							{isGpsVisible && (
								<div className="w-full">
									<LocationForm data={data} setChangeSettings={setChangeSettings} errState={errState.position} setVerified={setVerified} />
								</div>
							)}
						</div>
						<div className="flex flex-col lg:w-1/2 px-4 sm:py-4 items-start border-gray-300 lg:border-l-[1px]">
							<h2 className="text-xl mt-8 sm:mt-0 text-black">Paramètres du compte</h2>
							<div className="md:w-3/4 w-full">
								<UsernameForm data={data} setChangeSettings={setChangeSettings} errState={errState.username} verified={verified} setVerified={setVerified} />
							</div>
							<div className="md:w-3/4 w-full">
								<EmailForm data={data} setChangeSettings={setChangeSettings} errState={errState.mail} verified={verified} setVerified={setVerified} />
							</div>
							<div className="md:w-3/4  w-full">
								<PasswordForm setChangeSettings={setChangeSettings} errState={errState.password} verified={verified} setVerified={setVerified}/>
							</div>
						</div>
					</div>
					<div className="flex flex-col justify-center items-center mt-6 mb-8">
						{errState.global != "" && (
						<p className=" text-red-600 text-sm text-center">{errState.global}</p>
						)}
						{verified ? 
							<button className="btn-secondary flex justify-center mt-2 items-center self-center w-[154px] h-12" disabled>
								<svg height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
									<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
									<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
									<g id="SVGRepo_iconCarrier"> <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"></path> </g>
								</svg>
							</button>
						:
							<>
								{hasSubmit ?
									<button className="btn-secondary mt-2 self-center w-[154px] h-12" disabled>
										<BeatLoader
											color="#fff"
											size={9}
										/>
									</button>
								:
									<button className="btn-secondary mt-2 self-center w-[154px] h-12">
										Sauvegarder
									</button>
								}
							</>
						}
					</div>
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
