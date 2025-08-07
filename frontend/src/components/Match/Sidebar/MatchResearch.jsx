import { useState, useEffect } from "react";
import { useAuthentified } from "../../AuthentifiedContext";
import axios from 'axios';
import { API_ROUTES } from "../../../utils/constants";
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

export default function MatchResearch({closeSidebarResearch, setMatchState, setMatchIndexState, setIsResearch, sortParameters, filterParameters, researchState, setResearchState}) {
	const { data } = useAuthentified();
	const [filterAge, setFilterAge] = useState(researchState.filterAge);
	const [filterLocation, setFilterLocation] = useState(researchState.filterLocation);
	const [filterFameRating, setFameRating] = useState(researchState.filterFameRating);
	const [filterCommonTags, setCommonTags] = useState(researchState.filterCommonTags);
	const [position, setPosition] = useState(researchState.position);
	const [listTags, setListTags] = useState(researchState.listTags)
	const [selectTags, setSelectTags] = useState(researchState.selectTags)
	const [sortState, setSortState] = useState(researchState.sort)

	const handleSortChange = (e) => {
		const { name, checked } = e.target;
		setSortState((prevState) => ({
		  ...prevState,
		  [name]: checked,
		}));
	};

	const handleSelectTags = (e) => {
		setSelectTags((prevTags) => {
			if (!prevTags.includes(e.target.value)) {
				return [...prevTags, e.target.value];
			}
			return prevTags;
		});
		setListTags(listTags.filter((i) => i !== e.target.value));
	}

	const handleRemoveTags = (tag) => {
		setListTags((prevTags) => {
			if (!prevTags.includes(tag)) {
				return [...prevTags, tag];
			}
			return prevTags;
		});
		setSelectTags(selectTags.filter((i) => i !== tag));
	};

	useEffect(() => {
		if (listTags.length < 1) {
			axios.get(API_ROUTES.GET_ALL_INTERESTS, {
				withCredentials: true,
				timeout: 5000,
			})
			.then((res) => {
				if (res.status != 200)
					throw new Error('une erreur est survenue')
				let tab = []
				for (let i = 0; i < res.data.data.length; i++)
					tab.push(res.data.data[i].name)
				setListTags(tab)
			})
			.catch((err) => {
				console.log(err)
			})
		}
    }, []);

	function handleSubmit() {
		let positionToSend
		if (!position) {
			positionToSend = {
				lat: data.latitude,
				lng: data.longitude
			}
		}
		else {
			positionToSend = {
				lat: parseFloat(parseFloat(position.lat).toFixed(6)),
				lng: parseFloat(parseFloat(position.lng).toFixed(6))
			}
		}
		let obj = {
			sort: sortState,
			filterAge: filterAge,
			filterLocation: filterLocation,
			filterFameRating: filterFameRating,
			filterCommonTags: filterCommonTags,
			position: positionToSend,
			listTags: listTags,
			selectTags: selectTags
		}
		setResearchState(obj)
		axios.get(`${API_ROUTES.GET_RESEARCH}?lat=${positionToSend.lat}&lng=${positionToSend.lng}&tags=${selectTags}&sort=${sortParameters(obj)}&filter=${filterParameters(obj)}`, {
			withCredentials: true,
		})
		.then((res) => {
			if (res.status != 200)
				throw new Error('Une erreur est survenue');
			closeSidebarResearch()
			setIsResearch(true)
			setMatchState(res.data.message);
			setMatchIndexState(0);
		})
		.catch((err) => {
			console.log(err)
		});
	}

	return (
		<div className="p-4">
			<div className="flex flex-row justify-between items-center">
				<span className="text-gray-700">Recherche avancée</span>
				<svg style={{cursor: 'pointer'}} onClick={closeSidebarResearch} fill="#374151" width="20px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M0 14.545L1.455 16 8 9.455 14.545 16 16 14.545 9.455 8 16 1.455 14.545 0 8 6.545 1.455 0 0 1.455 6.545 8z" fillRule="evenodd"></path> </g></svg>
			</div>
			<div className="w-3/4 border-b border-gray-300 mx-auto mt-4"></div>
			<div className="mt-2">
				<p className="font-poppins-medium">Localisation</p>
				<MapContainer center={[0, 0]} zoom={1} scrollWheelZoom={true} style={{ height: "200px", width: "100%" }}>
					<TileLayer
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					/>
					<LocationMarker position={position} setPosition={setPosition}/>
				</MapContainer>
			</div>
			<div className="mt-2">
				<p className="font-poppins-medium">#Tags</p>
				<div className="border-solid border-gray-300 bg-white border-[1px] rounded-xl p-1 h-20" style={{overflowY: 'auto'}}>
					<div className="text-xs flex flex-wrap gap-1">
						{selectTags && selectTags.map((tag, index) => (
							<div style={{cursor: "pointer"}}  onClick={() => handleRemoveTags(tag)} key={index} className="bg-[--color-light-green] hover:bg-[--color-dark-green] rounded-3xl p-1 text-black">#{tag}</div>
						))}
					</div>
				</div>
				<select
					id="listTags"
					value=""
					onChange={handleSelectTags}
					className="w-full px-3 border border-gray-300 rounded-md mt-1">
					<option value="" disabled>
						-- Sélectionnez des #tags --
					</option>
					{listTags && listTags.map((tag, index) =>(
						<option key={index} value={tag}>#{tag}</option>
					))}
				</select>
			</div>
			<div className="mt-2">
				<p className="font-poppins-medium">Trier par</p>
				<div className="flex">
					<div className="w-3/4 sm:w-1/2">
						<label className="font-poppins-regular text-sm">Age</label>
					</div>
					<input className=""
					type="checkbox"
					name="age"
					checked={sortState.age}
        			onChange={handleSortChange}
					/>
				</div>
				<div className="flex">
					<div className="w-3/4 sm:w-1/2">
						<label className="font-poppins-regular text-sm">Zone géographique</label>
					</div>
					<input className=""
					type="checkbox"
					name="location"
					checked={sortState.location}
        			onChange={handleSortChange}
					/>
				</div>
				<div className="flex">
					<div className="w-3/4 sm:w-1/2">
						<label className="font-poppins-regular text-sm">Popularité</label>
					</div>
					<input className=""
					type="checkbox"
					name="fameRating"
					checked={sortState.fameRating}
        			onChange={handleSortChange}
					/>
				</div>
				<div className="flex">
					<div className="w-3/4 sm:w-1/2">
						<label className="font-poppins-regular text-sm">Tags</label>
					</div>
					<input className=""
					type="checkbox"
					name="commonTags"
					checked={sortState.commonTags}
        			onChange={handleSortChange}
					/>
				</div>
			</div>
			<div className="mt-2">
				<label className="font-poppins-medium" htmlFor="filterAge">Filtrer par âge</label>
				<select
					id="filterAge"
					value={filterAge}
					onChange={(e) => setFilterAge(e.target.value)}
					className="w-full py-1 px-3 border border-gray-300 rounded-md">
					<option value="">
						-- Sélectionnez une option --
					</option>
					<option value="age18_20">18 - 20 ans</option>
					<option value="age21_30">21 - 30 ans</option>
					<option value="age26_35">26 - 35 ans</option>
					<option value="age31_40">31 - 40 ans</option>
					<option value="age36_45">36 - 45 ans</option>
					<option value="age41_50">41 - 50 ans</option>
					<option value="age46_55">46 - 55 ans</option>
					<option value="age51_60">51 - 60 ans</option>
					<option value="age56_65">56 - 65 ans</option>
					<option value="age61_70">61 - 70 ans</option>
					<option value="age66_75">66 - 75 ans</option>
					<option value="age71_80">71 - 80 ans</option>
					<option value="age81">81+ ans</option>
				</select>
			</div>
			<div className="mt-2">
				<label className="font-poppins-medium" htmlFor="filterLocation">Filtrer par zone géographique</label>
				<select
					id="filterLocation"
					value={filterLocation}
					onChange={(e) => setFilterLocation(e.target.value)}
					className="w-full py-1 px-3 border border-gray-300 rounded-md">
					<option value="">
						-- Sélectionnez une option --
					</option>
					<option value="location10">moins de 10 km</option>
					<option value="location30">moins de 30 km</option>
					<option value="location50">moins de 50 km</option>
					<option value="location100">moins de 100 km</option>
				</select>
			</div>
			<div className="mt-2">
				<label className="font-poppins-medium" htmlFor="filterFameRating">Filtrer par popularité</label>
				<select
					id="filterFameRating"
					value={filterFameRating}
					onChange={(e) => setFameRating(e.target.value)}
					className="w-full py-1 px-3 border border-gray-300 rounded-md">
					<option value="">
						-- Sélectionnez une option --
					</option>
					<option value="fameRate90">90+ %</option>
					<option value="fameRate70">70+ %</option>
					<option value="fameRate50">50+ %</option>
					<option value="fameRate30">30+ %</option>
					<option value="fameRate10">10+ %</option>
				</select>
			</div>
			<div className="mt-2">
				<label className="font-poppins-medium" htmlFor="filterCommonTags">Filtrer par tags</label>
				<select
					id="filterCommonTags"
					value={filterCommonTags}
					onChange={(e) => setCommonTags(e.target.value)}
					className="w-full py-1 px-3 border border-gray-300 rounded-md">
					<option value="">
						-- Sélectionnez une option --
					</option>
					<option value="commonTags1">1+</option>
					<option value="commonTags2">2+</option>
					<option value="commonTags3">3+</option>
					<option value="commonTags5">5+</option>
					<option value="commonTags7">7+</option>
				</select>
			</div>
			<div className="mt-4 justify-center items-center flex">
				<button className="btn-secondary flex justify-center items-center w-36 h-11 p-2" onClick={handleSubmit}>
					Valider
				</button>
			</div>
		</div>
	)
}
