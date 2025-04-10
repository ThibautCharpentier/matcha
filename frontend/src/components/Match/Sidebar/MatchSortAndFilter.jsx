import { useState } from "react";
import axios from 'axios';
import { API_ROUTES } from "../../../utils/constants";

export default function MatchSortAndFilter({closeSidebarSortAndFilter, setMatchState, setMatchIndexState, setIsResearch}) {
	const [filterAge, setFilterAge] = useState("");
	const [filterLocation, setFilterLocation] = useState("");
	const [filterFameRating, setFameRating] = useState("");
	const [filterCommonTags, setCommonTags] = useState("");
	const [sortState, setSortState] = useState({
		age: false,
		location: false,
		fameRating: false,
		commonTags: false
	})

	const handleSortChange = (e) => {
		const { name, checked } = e.target;
		setSortState((prevState) => ({
		  ...prevState,
		  [name]: checked,
		}));
	};

	function sortParameters() {
		let sort = ""
		let plus = false;
		if (sortState.age) {
			sort += "age"
			plus = true
		}
		if (sortState.location) {
			if (plus == true)
				sort += "+"
			sort += "location"
			plus = true
		}
		if (sortState.fameRating) {
			if (plus == true)
				sort += "+"
			sort += "fame"
			plus = true
		}
		if (sortState.commonTags) {
			if (plus == true)
				sort += "+"
			sort += "tags"
		}
		return (sort)
	}

	function filterParameters() {
		let filter = ""
		let plus = false;
		if (filterAge != "") {
			filter += filterAge
			plus = true
		}
		if (filterLocation != "") {
			if (plus == true)
				filter += "+"
			filter += filterLocation
			plus = true
		}
		if (filterFameRating != "") {
			if (plus == true)
				filter += "+"
			filter += filterFameRating
			plus = true
		}
		if (filterCommonTags != "") {
			if (plus == true)
				filter += "+"
			filter += filterCommonTags
		}
		return (filter)
	}

	function handleSubmit() {
		axios.get(`${API_ROUTES.GET_MATCHS}?sort=${sortParameters()}&filter=${filterParameters()}`, {
			withCredentials: true,
		})
		.then((res) => {
			if (res.status != 200)
				throw new Error('Une erreur est survenue');
			closeSidebarSortAndFilter()
			setIsResearch(false)
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
				<span className="text-gray-700">Options de suggestion</span>
				<svg style={{cursor: 'pointer'}} onClick={closeSidebarSortAndFilter} fill="#374151" width="20px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M0 14.545L1.455 16 8 9.455 14.545 16 16 14.545 9.455 8 16 1.455 14.545 0 8 6.545 1.455 0 0 1.455 6.545 8z" fillRule="evenodd"></path> </g></svg>
			</div>
			<div className="w-3/4 border-b border-gray-300 mx-auto mt-4"></div>
			<div className="mt-6">
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
						<label className="font-poppins-regular text-sm">Tags en commun</label>
					</div>
					<input className=""
					type="checkbox"
					name="commonTags"
					checked={sortState.commonTags}
        			onChange={handleSortChange}
					/>
				</div>
			</div>
			<div className="mt-6">
				<label className="font-poppins-medium" htmlFor="filterAge">Filtrer par âge</label>
				<select
					id="filterAge"
					value={filterAge}
					onChange={(e) => setFilterAge(e.target.value)}
					className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md">
					<option value="" disabled>
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
			<div className="mt-6">
				<label className="font-poppins-medium" htmlFor="filterLocation">Filtrer par zone géographique</label>
				<select
					id="filterLocation"
					value={filterLocation}
					onChange={(e) => setFilterLocation(e.target.value)}
					className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md">
					<option value="" disabled>
						-- Sélectionnez une option --
					</option>
					<option value="location10">moins de 10 km</option>
					<option value="location30">moins de 30 km</option>
					<option value="location50">moins de 50 km</option>
					<option value="location100">moins de 100 km</option>
				</select>
			</div>
			<div className="mt-6">
				<label className="font-poppins-medium" htmlFor="filterFameRating">Filtrer par popularité</label>
				<select
					id="filterFameRating"
					value={filterFameRating}
					onChange={(e) => setFameRating(e.target.value)}
					className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md">
					<option value="" disabled>
						-- Sélectionnez une option --
					</option>
					<option value="fameRate90">90+ %</option>
					<option value="fameRate70">70+ %</option>
					<option value="fameRate50">50+ %</option>
					<option value="fameRate30">30+ %</option>
					<option value="fameRate10">10+ %</option>
				</select>
			</div>
			<div className="mt-6">
				<label className="font-poppins-medium" htmlFor="filterCommonTags">Filtrer par tags en commun</label>
				<select
					id="filterCommonTags"
					value={filterCommonTags}
					onChange={(e) => setCommonTags(e.target.value)}
					className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md">
					<option value="" disabled>
						-- Sélectionnez une option --
					</option>
					<option value="commonTags1">1+</option>
					<option value="commonTags2">2+</option>
					<option value="commonTags3">3+</option>
					<option value="commonTags5">5+</option>
					<option value="commonTags7">7+</option>
				</select>
			</div>
			<div className="mt-6 justify-center items-center flex">
				<button className="btn-secondary flex justify-center items-center w-36 h-11 p-2" onClick={handleSubmit}>
					Valider
				</button>
			</div>
		</div>
	)
}
