import { useState } from "react";
import ModalChangePhoto from "./ModalChangePhoto"

export default function InputSelectPicture() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imgSrc, setImgSrc] = useState("");
    const onSelectFile = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
    
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            const imageElement = new Image();
            const imageUrl = reader.result?.toString() || "";
            imageElement.src = imageUrl;

            imageElement.addEventListener("load", (e) => {
                if (error) setError("");
                const { naturalWidth, naturalHeight } = e.currentTarget;
                if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
                    setError("Image must be at least 150 x 150 pixels.");
                    return setImgSrc("");
                }
            });
            setImgSrc(imageUrl);
        });
        reader.readAsDataURL(file);
        setIsModalOpen(true);
    };
    
    const handleSave = (selectedPassions) => {
        setIsModalOpen(false);
    };

    return (
        <>
            <input 
                type="file" 
                accept="image/*" 
                id="fileInput" 
                className="hidden"
                onChange={onSelectFile}
            />
            <button 
                className="cursor-pointer"
                onClick={() => document.getElementById('fileInput').click()}
            >
                <div className="absolute -bottom-2 -right-2 bg-[--color-pink] w-7 h-7 rounded-full flex justify-center items-center hover:w-8 hover:h-8">
                    <svg height="18px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none">
                        <path fill="#ffffff" fillRule="evenodd" d="M9 17a1 1 0 102 0v-6h6a1 1 0 100-2h-6V3a1 1 0 10-2 0v6H3a1 1 0 000 2h6v6z"></path>
                    </svg>
                </div>
            </button>
            {isModalOpen && 
            <ModalChangePhoto 
            onClose={() => setIsModalOpen(false)}
            onSave={handleSave}
            imgSrc = {imgSrc}
            />}
        </>
    )
}