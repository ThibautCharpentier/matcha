import InputSelectPicture from "./InputSelectPicture"
import { useState, useEffect } from "react";
import { API_URL} from "../../utils/constants";


export default function InputPicture({handleAddCroppedImage, handleDeleteImage, index, images, isProfilPicture, setError}) {
    const [image, setImage] = useState(null);
    const [btnAddImage, setBtnAddImage] = useState(true);
    const classPreviewPhoto = isProfilPicture
        ? "relative w-28 h-28 rounded-full border-dashed border-4 border-gray-300 bg-gray-200"
        : "relative w-[100px] h-[150px] rounded-lg border-dashed border-4 border-gray-300 bg-gray-200";

    useEffect(() => {
        if (images[index] != null) {
            if (typeof images[index] === "string") {
                setImage(API_URL + "/" + images[index]); // URL
            } else {
                const objectURL = URL.createObjectURL(images[index]);
                setImage(objectURL);
            }
            setBtnAddImage(false);
        } else {
            setImage(null);
            setBtnAddImage(true);
        }

        return () => {
            if (image && image.startsWith("blob:")) {
                URL.revokeObjectURL(image);
            }
        };
    }, [images, index]);
    

    return (
        <div className={classPreviewPhoto}>
            {image && (
                <img src={image} alt="Profile" className={`w-full h-full object-cover ${isProfilPicture ? "rounded-full" : "rounded-lg"}`}/>
            )}
            <InputSelectPicture onAddCroppedImage={handleAddCroppedImage} onRemoveImage={handleDeleteImage} index={index} btnAddImage={btnAddImage} isProfilPicture={isProfilPicture} setError={setError}/>
            
        </div>
    )
}