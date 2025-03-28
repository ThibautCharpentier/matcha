import { useState, useRef, useEffect } from "react";
import PicturesSlider from "../Profile/PicturesSlider";
import MatchProfil from "../Profile/UserProfile";
import ModifyProfile from "./ModifyProfile";
import axios from 'axios';
import { API_ROUTES } from "../../utils/constants";
import ModalHobbies from "../CompleteProfil/ModalHobbies";
import Request from "../../utils/request";

export default function MyProfil() {
	const hasFetched = useRef(false);
	const [toggleProfile, setToggleProfile] = useState(false);
	const [isModalHobbiesOpen, setIsModalHobbiesOpen] = useState(false);
	const [userData, setUserData] = useState([]);
	const [reload, setReload] = useState(false);

	if (userData[0])
		console.log(userData[0].tags)

	const handleSaveHobbies = async (selectedPassions) => {
        console.log("save Hobbies")
        console.log(selectedPassions)
		let res = await Request.updateInterests(selectedPassions);
		console.log(res);
        setIsModalHobbiesOpen(false);
		if (res.success === true)
			setReload(prev => !prev);
		else
			console.log("erreur lors de la mise à jour des interêts")
    };

	useEffect(() => {
		console.log("reload")

		const getProfileUser = async () => {
			console.log("passe dans la fonction")
				await axios.get(`${API_ROUTES.GET_PROFILE_USER}`, {
					withCredentials: true,
				})
				.then((res) => {
					console.log(res);
					if (res.status != 200)
						throw new Error('Une erreur est survenue');
					setUserData(() => {
						let newState = [];
						newState[0] = res.data.message;
						return newState;
					});
					console.log("a jour")
				})
				.catch((err) => {
					console.log(err)
				});
				hasFetched.current = true;
		}

		getProfileUser();
	}, [reload]);

	return (
		
		<div className="relative max-w-[400px] max-h-[550px]">
		{isModalHobbiesOpen &&
			<ModalHobbies
							isOpen={isModalHobbiesOpen}
							onClose={() => setIsModalHobbiesOpen(false)}
							onSave={handleSaveHobbies}
							passions={userData[0].tags}
						/>
		}
			<div className="flex flex-col justify-center text-white text-sm">
			</div>		
			{userData && userData[0] && (
			<div>
			{toggleProfile ? (
				<ModifyProfile myData={userData[0]} setIsModalHobbiesOpen={setIsModalHobbiesOpen} setReload={setReload}/>
			) : (
				<PicturesSlider userData={userData} userIndex={0} />
			)}
			</div>
			)}
				<button onClick={() => setToggleProfile((prevState) => !prevState)}>Profile</button>
			</div>
	)
}
