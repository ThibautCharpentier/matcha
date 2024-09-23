import React, { useState, useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import ReactCrop, {
	centerCrop,
	convertToPixelCrop,
	makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import setCanvasPreview from "./setCanvasPreview";


const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

function ImageUploader() {
	const [image, setImage] = useState("");
	const imgRef = useRef(null);
	const previewCanvasRef = useRef(null);
	const [crop, setCrop] = useState();
	const [error, setError] = useState("");

	const onDrop = useCallback((acceptedFiles) => {
		const file = acceptedFiles[0];
		const reader = new FileReader();
		reader.onload = (event) => {
			setImage(event.target.result);
		};
		reader.readAsDataURL(file);
		console.log(reader);
	}, []);

	const { getRootProps, getInputProps } = useDropzone({ onDrop });

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
	};
	
	const onImageLoad = (e) => {
		const { width, height } = e.currentTarget;
		const cropWidthInPercent = (MIN_DIMENSION / width) * 100;
	
		const crop = makeAspectCrop(
		{
			unit: "%",
			width: cropWidthInPercent,
		},
			ASPECT_RATIO,
			width,
			height
		);
		const centeredCrop = centerCrop(crop, width, height);
		setCrop(centeredCrop);
	};

	return (
	<div className="max-w-lg mx-auto">
		<div className="bg-gray-100 p-4 rounded-lg">
		<div {...getRootProps()} className="border-dashed border-2 p-4 text-center">
			<input {...getInputProps()} />
			<p className="text-gray-500">Drag & drop a file here, or click to select one</p>
		</div>
		{image && (
		<div className="flex flex-col items-center">
			<ReactCrop
			crop={crop}
			onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
			circularCrop
			keepSelection
			aspect={ASPECT_RATIO}
			minWidth={MIN_DIMENSION}
			>
				<img
				ref={imgRef}
				src={image}
				alt="Upload"
				style={{ maxHeight: "70vh" }}
				onLoad={onImageLoad}
				/>
			</ReactCrop>
			<button
			className="text-white font-mono text-xs py-2 px-4 rounded-2xl mt-4 bg-sky-500 hover:bg-sky-600"
			onClick={() => {
				setCanvasPreview(
				imgRef.current, // HTMLImageElement
				previewCanvasRef.current, // HTMLCanvasElement
				convertToPixelCrop(
					crop,
					imgRef.current.width,
					imgRef.current.height
				)
				);
				const dataUrl = previewCanvasRef.current.toDataURL();
				updateAvatar(dataUrl);
				closeModal();
			}}
		  >
			Crop Image
		  </button>
		</div>
	  )}
	  {crop && (
		<canvas
		  ref={previewCanvasRef}
		  className="mt-4"
		  style={{
			display: "none",
			border: "1px solid black",
			objectFit: "contain",
			width: 150,
			height: 150,
		  }}
		/>
	  )}
		</div>
	</div>
	);
}

export default ImageUploader;
