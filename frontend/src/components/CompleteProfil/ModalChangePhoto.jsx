import { useState } from "react";
import Cropper from 'react-easy-crop'

const MAX_WIDTH = 400;
const MAX_HEIGHT = 550;
const RATIO_DIMENSION = 1.375;

function getCropSize(width, height) {
    if (width * RATIO_DIMENSION >= height) {
        if (height > MAX_HEIGHT)
            return ({width: (height / (height / MAX_HEIGHT)) / RATIO_DIMENSION, height: height / (height / MAX_HEIGHT)})
        else
            return ({width: height / RATIO_DIMENSION, height: height})
    }
    else {
        if (width > MAX_WIDTH)
            return ({width: width / (width / MAX_WIDTH), height: width / (width / MAX_WIDTH) * RATIO_DIMENSION})
        else
            return ({width: width, height: width * RATIO_DIMENSION})
    }
}

export default function ModalChangePhoto({onClose, onSave, imgSrc, index, isProfilPicture}) {
    const [localImgSrc, setLocalImgSrc] = useState(imgSrc);
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [titlePhoto, setTitlePhoto] = isProfilPicture 
        ? useState("Première photo qui apparaitra sur votre profil de match")
        : useState(null);
    const [cropShape, setCropShape] = useState("rect")
    const [cropSize, setCropSize] = useState(getCropSize(window.innerWidth, window.innerHeight))

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }

    const createCroppedImage = async () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const image = new Image();
        image.src = localImgSrc;

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
            setCropSize({width: Math.min(cropSize.width, cropSize.height), height: Math.min(cropSize.width, cropSize.height)})
            setTitlePhoto("Votre photo de profil")
            setZoom(1);
            setCrop({ x: 0, y: 0 });
            const reader = new FileReader();
            reader.readAsDataURL(croppedImage);
            reader.onloadend = () => {
                setLocalImgSrc(reader.result)
            }
            return
        }
        onSave(croppedImage, index);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
			<div className="bg-gray-800 bg-opacity-50 absolute inset-0" onClick={onClose}></div>
			<div className="bg-white sm:rounded-xl shadow-lg relative h-full sm:h-5/6 z-10 max-w-lg w-full flex flex-col">
                <div className="bg-gray-100 rounded-xl flex p-4">
					<div className="flex flex-col w-full">
						<div className="flex justify-end mb-3">
							<svg style={{cursor: 'pointer'}} onClick={onClose} fill="#374151" width="15px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M0 14.545L1.455 16 8 9.455 14.545 16 16 14.545 9.455 8 16 1.455 14.545 0 8 6.545 1.455 0 0 1.455 6.545 8z" fillRule="evenodd"></path> </g></svg>
						</div>
						<div className="flex justify-between items-center mt-3">
							<h2 className="text-xl text-center">Modifier la photo</h2>
							<button className="btn btn-primary" onClick={handleSave}>Valider</button>
						</div>
					</div>
				</div>
                {isProfilPicture && (
                    <p className="bg-gray-100 py-2 text-center">{titlePhoto}</p>
                )}
                <div className="relative h-3/4">
                        <Cropper
                        image={localImgSrc}
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
