import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function LocationMarker({position, setPosition, setChangeSettings}) {
	const map = useMapEvents({
        click(e) {
            setPosition(e.latlng);
			setChangeSettings(prev => ({
				...prev,
				position: e.latlng,
			}));
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

export default function LocationForm({ data, setChangeSettings, errState }) {
	const [position, setPosition] = useState(
        data.latitude && data.longitude ? { lat: data.latitude, lng: data.longitude } : null
    );

    return (
		<>
			<div className="flex flex-col mt-6">
				<MapContainer className="z-0" center={data.latitude && data.longitude ? [data.latitude, data.longitude] : [46.6, 1.9]} zoom={13} scrollWheelZoom={true} style={{ height: "300px", width: "100%" }}>
					<TileLayer
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					/>
					<LocationMarker position={position} setPosition={setPosition} setChangeSettings={setChangeSettings}/>
				</MapContainer>
				{errState != "" && (
				<p className=" text-red-600 text-sm text-center">{errState}</p>
				)}
			</div>
		</>
    );
}
