import { useState } from "react";
import PicturesSlider from "../Profile/PicturesSlider";
import ModifyProfile from "./ModifyProfile";
import ModalHobbies from "../CompleteProfil/ModalHobbies";
import ModalPhotos from "./ModalPhotos";
import Request from "../../utils/request";
import { useAuthentified } from "../AuthentifiedContext";

export default function MyProfil() {
	const { data } = useAuthentified()
	const [toggleProfile, setToggleProfile] = useState(true);
	const [isModalHobbiesOpen, setIsModalHobbiesOpen] = useState(false);
	const [isModalPhotosOpen, setIsModalPhotosOpen] = useState(false);

	const handleSaveHobbies = async (selectedPassions) => {
		await Request.updateInterests(selectedPassions);

        setIsModalHobbiesOpen(false);
    };

	const handleSavePhotos = async (selectedPhotos) => {
		await Request.updatePhotos(selectedPhotos);

		setIsModalPhotosOpen(false);
	}

	return (
		
		<div className="flex flex-col">
			{isModalHobbiesOpen &&
				<ModalHobbies
					isOpen={isModalHobbiesOpen}
					onClose={() => setIsModalHobbiesOpen(false)}
					onSave={handleSaveHobbies}
					passions={data.interest}
				/>
			}
			{isModalPhotosOpen &&
				<ModalPhotos
					isOpen={isModalPhotosOpen}
					onClose={() => setIsModalPhotosOpen(false)}
					onSave={handleSavePhotos}
					photos={data.pictures}
					picture_profile={data.picture_profile}
				/>
			}
			{data.firstname != "" && data.lastname != "" && data.age != null && data.famerating != null &&
				<div className="relative max-w-[400px] max-h-[550px]">
					{toggleProfile ? (
						<ModifyProfile myData={data} setIsModalHobbiesOpen={setIsModalHobbiesOpen} setIsModalPhotosOpen={setIsModalPhotosOpen}/>
					) : (
						<PicturesSlider userData={data} userIndex={null} />
					)}
				</div>
			}
			<div className="flex justify-center mt-5">
				<button onClick={() => setToggleProfile((prevState) => !prevState)} className="btn flex justify-center items-center w-20 h-11 sm:w-24 sm:h-12 p-2">
					{toggleProfile ? "Photos" : "Profil"}
				</button>
			</div>
		</div>
	)
}
