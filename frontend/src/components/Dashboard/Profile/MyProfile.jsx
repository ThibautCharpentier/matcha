import { useState } from "react";
import PicturesSlider from "../../Profile/PicturesSlider";
import ToggleProfile from "../../Profile/ToggleProfile";
import ModifyProfile from "./ModifyProfile";
import ModalHobbies from "../../CompleteProfil/ModalHobbies";
import ModalPhotos from "./ModalPhotos";
import Request from "../../../utils/request";
import { useAuthentified } from "../../AuthentifiedContext";
import ClipLoader from "react-spinners/ClipLoader";

export default function MyProfile() {
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

	const switchToggleProfile = () => {
		setToggleProfile((prevState) => !prevState);
	}

	return (
		
		<div className="flex flex-col mt-6">
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
			{(data.firstname != "" && data.lastname != "" && data.age != null && data.famerating != null) ?
				<div className="relative w-full max-w-[400px] max-h-[610px] aspect-[40/61] sm:w-[400px] sm:h-[610px] bg-gray-200 flex flex-col rounded-3xl">
					<ToggleProfile toggleProfile={toggleProfile} switchToggleProfile={switchToggleProfile} />
					{toggleProfile ? (
						<ModifyProfile myData={data} setIsModalHobbiesOpen={setIsModalHobbiesOpen} setIsModalPhotosOpen={setIsModalPhotosOpen}/>
					) : (
						<PicturesSlider userData={data} userIndex={null} />
					)}
				</div>
			:
				<div className="w-screen max-w-[400px] max-h-[610px] aspect-[40/61] sm:w-[400px] sm:h-[610px] flex justify-center items-center">
					<ClipLoader
						color="#fff"
						size={70}
					/>
				</div>
			}
		</div>
	)
}
