import { useState, useRef, useEffect } from "react";
import PicturesSlider from "../Profile/PicturesSlider";
import MatchProfil from "../Profile/UserProfile";
import ModifyProfile from "./ModifyProfile";
import axios from 'axios';
import { API_ROUTES } from "../../utils/constants";
import ModalHobbies from "../CompleteProfil/ModalHobbies";
import ModalPhotos from "./ModalPhotos";
import Request from "../../utils/request";

import { showErrorServer, showSuccess } from "../../utils/toastUtils";

export default function MyProfil() {
	const hasFetched = useRef(false);
	const [toggleProfile, setToggleProfile] = useState(true);
	const [isModalHobbiesOpen, setIsModalHobbiesOpen] = useState(false);
	const [isModalPhotosOpen, setIsModalPhotosOpen] = useState(false);
	const [userData, setUserData] = useState([]);
	const [reload, setReload] = useState(false);

	const handleSaveHobbies = async (selectedPassions) => {
		let res = await Request.updateInterests(selectedPassions);

        setIsModalHobbiesOpen(false);
		if (res.success === true)
			setReload(prev => !prev);
		else
			console.log("erreur lors de la mise à jour des interêts")
    };

	const handleSavePhotos = async (selectedPhotos) => {
		let res = await Request.updatePhotos(selectedPhotos);

		setIsModalPhotosOpen(false);
		if (res.success === true)
			setReload(prev => !prev);
		else
			console.log("erreur lors de la mise à jour des photos")
	}

	useEffect(() => {
		const getProfileUser = async () => {
				await axios.get(`${API_ROUTES.GET_PROFILE_USER}`, {
					withCredentials: true,
				})
				.then((res) => {
					if (res.status != 200)
						throw new Error('Une erreur est survenue');
					setUserData(() => {
						let newState = [];
						newState[0] = res.data.message;
						return newState;
					});
				})
				.catch((err) => {
					console.log(err)
					showErrorServer()
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
		{isModalPhotosOpen &&
			<ModalPhotos
				isOpen={isModalPhotosOpen}
				OnClose={() => setIsModalPhotosOpen(false)}
				onSave={handleSavePhotos}
				photos={userData[0].pictures}
			/>
		}		
			<div className="flex flex-col justify-center text-white text-sm">
			</div>		
			{userData && userData[0] && (
			<div>
			{toggleProfile ? (
				<ModifyProfile myData={userData[0]} setIsModalHobbiesOpen={setIsModalHobbiesOpen} setIsModalPhotosOpen={setIsModalPhotosOpen} setReload={setReload}/>
			) : (
				<PicturesSlider userData={userData} userIndex={0} />
			)}
			</div>
			)}
			<div className="flex justify-center mt-5">
				<button onClick={() => setToggleProfile((prevState) => !prevState)} className="btn-secondary flex justify-center items-center w-20 h-11 sm:w-24 sm:h-12 p-2">
					{toggleProfile ? "Photos" : "Profil"}
				</button>
			</div>
		</div>
	)
}
