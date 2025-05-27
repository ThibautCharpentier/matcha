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

export default function Parameters() {
	const { data } = useAuthentified();
	const [isGpsVisible, setIsGpsVisible] = useState(data.gps);

	console.log(data);
	useEffect(() => {
		setIsGpsVisible(data.gps)
    }, [data]);

	return (
		<>
			{(data.username != "" && data.email != "" && data.preferences != "") ?
				<div className="w-full flex justify-center mb-[4em] sm:mb-0">
					<div className="flex flex-col p-2">
						<FirstnameForm data={data} />
						<LastnameForm data={data} />
						<GenderForm data={data} />
						<UsernameForm data={data} />
						<EmailForm data={data}/>
						<PasswordForm/>
						<PreferencesForm data={data}/>
						<GpsForm data={data}/>
						{isGpsVisible && <LocationForm data={data}/>}
					</div>
				</div>
			:
				<div className="w-full h-screen flex justify-center items-center">
					<ClipLoader
						color="#fff"
						size={70}
					/>
				</div>
			}
		</>
	)
}
