import { useState, useEffect } from "react";
import axios from 'axios';
import { API_ROUTES } from "../../utils/constants";
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function LocationMarker({position, setPosition}) {
	const map = useMapEvents({
        click(e) {
            setPosition(e.latlng);
        },
		locationfound(e) {
			map.flyTo(e.latlng, map.getZoom())
			setPosition(e.latlng);
		}
    });

	useEffect(() => {
        if (position === null)
			map.locate()
    }, []);

    return position === null ? null : (
        <Marker position={position}></Marker>
    );
}

export default function LocationForm() {
	const [position, setPosition] = useState(null);
	const [errState, setErrState] = useState("");

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

		const city = await getCityName(position.lat, position.lng)
		if (!city)
			return

		const obj = {
			lat: position.lat,
			lng: position.lng,
			city: city
		}

		axios.post(API_ROUTES.UPDATE_CITY, obj, {
			withCredentials: true,
		})
		.then((res) => {
			if (res.status != 200)
				throw new Error('Une erreur est survenue');
		})
		.catch((err) => {
			setErrState("Formulaire invalide");
		});
	}

    return (
		<>
			<form action="" className="flex flex-col mt-6">
				<MapContainer center={[46.6 , 1.9]} zoom={13} scrollWheelZoom={false} style={{ height: "300px", width: "100%" }}>
					<TileLayer
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					/>
					<LocationMarker position={position} setPosition={setPosition}/>
				</MapContainer>
				<button className="btn mt-3" onClick={handleSubmit}>Valider la localisation</button>
				{errState != "" && (
				<p className=" text-red-600 text-sm text-center">{errState}</p>
				)}
			</form>
		</>
    );
}
