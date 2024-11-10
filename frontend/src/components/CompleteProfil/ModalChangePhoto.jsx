import { useState, useEffect } from "react";
import Cropper from 'react-easy-crop'

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

export default function ModalChangePhoto({onClose, onSave, imgSrc, index, isProfilPicture}) {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [titlePhoto, setTitlePhoto] = isProfilPicture 
        ? useState("Première photo qui apparaitre sur votre profil de match")
        : useState(null);
    let [cropShape, setCropShape] = useState("rect")
    let [cropSize, setCropSize] = useState({width: 400, height: 550})

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }

    const createCroppedImage = async () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const image = new Image();
        image.src = imgSrc;

        const { width, height, x, y } = croppedAreaPixels;

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(
            image,
            x, y, width, height,
            0, 0, width, height
        );

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                resolve(blob);
            }, 'image/jpeg');
        });
    };

    let handleSave = async () => {
        const croppedImage = await createCroppedImage();

        if (isProfilPicture && cropShape === "rect") {
            const newIndex = index + 1
            onSave(croppedImage, newIndex);
            setCropShape("round")
            setCropSize({width: 400, height: 400})
            setTitlePhoto("Votre photo de profil")
            return
        }
        onSave(croppedImage, index);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
			<div className="bg-gray-800 bg-opacity-50 absolute inset-0" onClick={onClose}></div>
			<div className="bg-white rounded-xl shadow-lg relative h-5/6 z-10 max-w-lg w-full flex flex-col">
				<div className="bg-gray-100 rounded-xl flex justify-between items-center p-8">
					<h2 className="text-xl text-center">Modifier la photo</h2>
					<button className="btn btn-primary" onClick={handleSave}>Valider</button>
				</div>
                {isProfilPicture && (
                    <p className="bg-gray-100 py-2 text-center">{titlePhoto}</p>
                )}
                <div className="relative h-3/4">
                        <Cropper
                        image={imgSrc}
                        crop={crop}
                        zoom={zoom}
                        cropShape={cropShape}
                        cropSize={cropSize}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        />
                </div>
                <div className="controls flex-grow flex justify-center items-center">
                    <input
                    type="range"
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-labelledby="Zoom"
                    onChange={(e) => {
                        setZoom(e.target.value)
                    }}
                    className="zoom-range accent-pink-500 "
                    />
                </div>
            </div>
		</div>
    )
}