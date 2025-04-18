import { useState, useEffect } from "react";
import { API_ROUTES } from "../../utils/constants";
import axios from 'axios';
import InputPicture from "../CompleteProfil/InputPicture";


export default function ModalPhotos({ isOpen, onClose, onSave, photos }) {
	const [croppedImages, setCroppedImages] = useState([photos[0] || null, photos[0] || null, photos[1] || null, photos[2] || null, photos[3] || null, photos[4] || null]);
	const [showValidate, setShowValidate] = useState(false);
	const [error, setError] = useState("");

	function hasMinimumNonNullElement(arr) {
        if (arr[0] == null || arr[1] == null)
            return false;
        const nonNullCount = arr.filter(item => item !== null).length;

        return nonNullCount >= 4;
    }

    const handleAddCroppedImage = (croppedImage, index) => {
        const updatedImages = [...croppedImages];
        updatedImages[index] = croppedImage;
        setCroppedImages(updatedImages);
        setShowValidate(hasMinimumNonNullElement(updatedImages))
        };

    const handleDeleteImage = (index) => {
        const updatedImages = [...croppedImages];
        updatedImages[index] = null; // Remplacer l'image par null
        if (index === 0 && updatedImages[index + 1] != null)
            updatedImages[index + 1] = null;
        setCroppedImages(updatedImages);
        setShowValidate(hasMinimumNonNullElement(updatedImages))
    };
	
	return (
		<div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
			<div className="bg-gray-800 bg-opacity-50 absolute inset-0" onClick={onClose}></div>
			<div className="bg-white rounded-xl shadow-lg relative h-4/6 z-10 max-w-lg w-full flex flex-col overflow-hidden">
				<div className="bg-gray-100 rounded-xl flex justify-between items-center p-8">
					<h2 className="text-xl text-center">Changez vos photos</h2>
					{croppedImages.filter(img => img !== null).length > 3 && croppedImages[0] != null && (
						<button className="btn btn-primary" onClick={() => onSave(croppedImages.filter(img => img !== null))}>Sauvegarder</button>
					)}
				</div>
				<div className="relative flex flex-wrap flex-1 overflow-y-auto pt-2 ml-2 items-center, justify-center">
					<p className="text-center text-sm">Ajoutez au moins <span className="text-[--color-pink]">3 photos</span>, y compris votre photo de profil.</p>
						<div className="flex flex-wrap space-x-8 justify-center w-full mt-2">
							<InputPicture key={0} handleAddCroppedImage={handleAddCroppedImage} handleDeleteImage={handleDeleteImage} index={0} images={croppedImages} isProfilPicture={true} setError={setError}/>
						</div>	
						<div className="flex flex-wrap space-x-8 justify-center w-full mt-2">
							<InputPicture key={1} handleAddCroppedImage={handleAddCroppedImage} handleDeleteImage={handleDeleteImage} index={2} images={croppedImages} isProfilPicture={false} setError={setError}/>
							<InputPicture key={2} handleAddCroppedImage={handleAddCroppedImage} handleDeleteImage={handleDeleteImage} index={3} images={croppedImages} isProfilPicture={false} setError={setError}/>
						</div>
						<div className="flex flex-wrap space-x-8 justify-center w-full mt-2">
							<InputPicture key={3} handleAddCroppedImage={handleAddCroppedImage} handleDeleteImage={handleDeleteImage} index={4} images={croppedImages} isProfilPicture={false} setError={setError}/>
							<InputPicture key={4} handleAddCroppedImage={handleAddCroppedImage} handleDeleteImage={handleDeleteImage} index={5} images={croppedImages} isProfilPicture={false} setError={setError}/>
						</div>
				</div>
			</div>
		</div>
	)
}
