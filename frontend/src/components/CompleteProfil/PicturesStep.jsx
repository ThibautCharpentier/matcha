import { useState } from "react";
import ImageUploader from "../ImageUploader";
import InputPicture from "./InputPicture";


export default function PicturesStep({validateProfil, infosUser}) {
    const [croppedImages, setCroppedImages] = useState([null, null, null, null, null, null]);
    const [showValidate, setShowValidate] = useState(false);
    const [error, setError] = useState("");

    function handleSubmit() { 
        infosUser.pictures = croppedImages.filter(item => item != null);
        validateProfil();
    }

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
        <>
            <div className="strike mb-3">
                <span>Mes photos</span>
            </div>
            <p className="text-center text-sm mb-5">Ajoutez au moins <span className="text-[--color-pink]">3 photos</span>, y compris votre photo de profil.</p>
            <div className="flex flex-col h-auto items-center justify-center">
                <InputPicture key={0} handleAddCroppedImage={handleAddCroppedImage} handleDeleteImage={handleDeleteImage} index={0} images={croppedImages} isProfilPicture={true} setError={setError}/>
                <div className="flex flex-wrap space-x-8 justify-center w-full mt-5">
                    <InputPicture key={1} handleAddCroppedImage={handleAddCroppedImage} handleDeleteImage={handleDeleteImage} index={2} images={croppedImages} isProfilPicture={false} setError={setError}/>
                    <InputPicture key={2} handleAddCroppedImage={handleAddCroppedImage} handleDeleteImage={handleDeleteImage} index={3} images={croppedImages} isProfilPicture={false} setError={setError}/>
                </div>
                <div className="flex flex-wrap space-x-8 justify-center w-full mt-5">
                    <InputPicture key={3} handleAddCroppedImage={handleAddCroppedImage} handleDeleteImage={handleDeleteImage} index={4} images={croppedImages} isProfilPicture={false} setError={setError}/>
                    <InputPicture key={4} handleAddCroppedImage={handleAddCroppedImage} handleDeleteImage={handleDeleteImage} index={5} images={croppedImages} isProfilPicture={false} setError={setError}/>
                </div>
            </div>
            <div className="flex justify-center mt-4">
            {showValidate && (
                <button className="btn" onClick={handleSubmit}>Valider</button>
            )}
            <p className="text-red-600">{error}</p>
            </div>
        </>
    )
}
