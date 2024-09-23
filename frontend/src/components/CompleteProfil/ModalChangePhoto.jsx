import InputSelectPicture from "./InputSelectPicture"
import { useState } from "react";
import Cropper from 'react-easy-crop'

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

export default function ModalChangePhoto({onClose, onSave, imgSrc}) {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const cropSize = {
        width: 400,
        height : 550
    }

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        console.log(croppedArea, croppedAreaPixels)
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
			<div className="bg-gray-800 bg-opacity-50 absolute inset-0" onClick={onClose}></div>
			<div className="bg-white rounded-xl shadow-lg relative h-5/6 z-10 max-w-lg w-full">
				<div className="bg-gray-100 rounded-xl flex justify-between items-center p-8">
					<h2 className="text-xl text-center">Modifier la photo</h2>
					<button className="btn btn-primary" onClick={() => onSave(selectedPassions)}>Valider</button>
				</div>
                <div className="relative h-3/4">
                        <Cropper
                        image={imgSrc}
                        crop={crop}
                        zoom={zoom}
                        cropShape="rect"
                        cropSize={cropSize}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        />
                </div>
                <div className="controls text-center mt-5">
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