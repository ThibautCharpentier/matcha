import { useState, useEffect } from "react";
import axios from 'axios';
import { API_ROUTES } from "../../utils/constants";
import BeatLoader from "react-spinners/BeatLoader";
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function LocationMarker({position, setPosition, setVerified}) {
	const map = useMapEvents({
        click(e) {
            setPosition(e.latlng);
			setVerified(false);
        },
		locationfound(e) {
			map.flyTo(e.latlng, map.getZoom())
			setPosition(e.latlng);
		}
    });

	useEffect(() => {
        if (position === null)
			map.locate()
		else
			setVerified(true)
    }, []);

    return position === null ? null : (
        <Marker position={position}></Marker>
    );
}

export default function LocationForm({ data }) {
	const [position, setPosition] = useState(
        data.latitude && data.longitude ? { lat: data.latitude, lng: data.longitude } : null
    );
	const [verified, setVerified] = useState(false);
	const [errState, setErrState] = useState("");
	const [hasSubmit, setHasSumit] = useState(false);

	async function getCityName(lat, lng) {
		try {
			const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
			return (res.data.address.city || res.data.address.town || res.data.address.village)
		}
		catch (err) {
			setErrState("Formulaire invalide");
			return (null);
		}
	}

	async function handleSubmit(e) {
		e.preventDefault()

		if (position === null) {
			setErrState("Formulaire invalide");
			return
		}
		setErrState("");
		setHasSumit(true)
		
		const city = await getCityName(position.lat, position.lng)
		if (!city) {
			setHasSumit(false)
			return
		}

		const obj = {
			lat: parseFloat(position.lat.toFixed(6)),
			lng: parseFloat(position.lng.toFixed(6)),
			city: city
		}

		axios.patch(API_ROUTES.UPDATE_LOCATION, obj, {
			withCredentials: true,
		})
		.then((res) => {
			if (res.status != 200)
				throw new Error('Une erreur est survenue');
			setVerified(true);
		})
		.catch((err) => {
			setErrState("Formulaire invalide");
		})
		.finally(() => {
			setHasSumit(false)
		})
	}

    return (
		<>
			<form onSubmit={handleSubmit} action="" className="flex flex-col mt-6">
				<MapContainer className="z-0" center={data.latitude && data.longitude ? [data.latitude, data.longitude] : [46.6, 1.9]} zoom={13} scrollWheelZoom={true} style={{ height: "300px", width: "100%" }}>
					<TileLayer
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					/>
					<LocationMarker position={position} setPosition={setPosition} setVerified={setVerified}/>
				</MapContainer>
				{verified ? 
					<button className="btn mt-3 flex self-center justify-center items-center bg-[--color-pink] w-80 h-12 p-2" disabled>
						<svg height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
							<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
							<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
							<g id="SVGRepo_iconCarrier"> <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"></path> </g>
						</svg>
					</button>
				:
					<>
						{hasSubmit ?
							<button className="btn mt-3 flex self-center justify-center items-center w-80 h-12 p-2 bg-[--color-pink]" disabled>
								<BeatLoader
									color="#fff"
									size={9}
								/>
							</button>
						:
							<button className="btn mt-3 flex self-center justify-center items-center w-80 h-12 p-2">
								Valider la localisation
							</button>
						}
					</>
				}
				{errState != "" && (
				<p className=" text-red-600 text-sm text-center">{errState}</p>
				)}
			</form>
		</>
    );
}
