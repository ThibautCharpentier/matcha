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
				<div className="relative w-full max-w-[400px] max-h-[610px] aspect-[61/40] sm:w-[400px] sm:h-[610px] bg-gray-50 flex flex-col rounded-3xl">
					<div className="bg-gray-50 w-full rounded-3xl max-h-[60px] aspect-[20/3] sm:h-[60px] justify-center flex items-center">
						<div className="text-gray-500 flex flex-row items-center justify-between sm:w-[60%]">
							<span className={`${toggleProfile && "text-gray-900"} pr-3`}>Profil</span>
							<button onClick={() => setToggleProfile((prevState) => !prevState)}
								className="relative w-24 h-8 bg-pink-600 rounded-full"
							>
							
							<div
								className={`absolute top-1 left-1 w-10 h-6 bg-white rounded-full shadow transition-transform duration-300 ${
								toggleProfile ? "translate-x-0" : "translate-x-[calc(100%+0.5rem)]"
								}`}
							></div>
							</button>
							<span className={`${!toggleProfile && "text-gray-900"} pl-3`}>Photos</span>
						</div>
					</div>
					{toggleProfile ? (
						<ModifyProfile myData={data} setIsModalHobbiesOpen={setIsModalHobbiesOpen} setIsModalPhotosOpen={setIsModalPhotosOpen}/>
					) : (
						<PicturesSlider userData={data} userIndex={null} />
					)}
				</div>
			}
		</div>
	)
}
