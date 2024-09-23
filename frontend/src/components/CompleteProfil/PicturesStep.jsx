import { useState } from "react";
import ImageUploader from "../ImageUploader";
import InputProfilPicture from "./InputProfilPicture";
import InputOtherPicture from "./InputOtherPicture";

export default function PicturesStep({nextStep, infosUser}) {
    const [profilPicture, setProfilPicture] = useState("");
    const [otherPictures, setOtherPictures] = useState([]);

    function handleSubmit() { 
        infosUser.otherPictures = [...otherPictures];
        infosUser.profilPicture = profilPicture;
        nextStep();
    }

    return (
        <>
            <div className="strike mb-10">
                <span>Mes photos</span>
            </div>
            <div className="flex flex-col h-auto items-center justify-center">
                <InputProfilPicture />
                <div className="flex flex-wrap space-x-8 justify-center w-full mt-5">
                    <InputOtherPicture/>
                    <InputOtherPicture />
                </div>
                <div className="flex flex-wrap space-x-8 justify-center w-full mt-5">
                    <InputOtherPicture/>
                    <InputOtherPicture />
                </div>
                {/* <ImageUploader /> */}
            </div>
            {profilPicture != "" && otherPictures.length > 0 && (
            <div className="flex justify-center mt-4">
                <button className="btn" onClick={handleSubmit}>Valider</button>
            </div>)}
        </>
    )
}


// PLUS
// <svg height="24px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#ffffff" fillRule="evenodd" d="M9 17a1 1 0 102 0v-6h6a1 1 0 100-2h-6V3a1 1 0 10-2 0v6H3a1 1 0 000 2h6v6z"></path> </g></svg>

//  <svg fill="#000000" height="24px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.8,16l5.5-5.5c0.8-0.8,0.8-2,0-2.8l0,0C24,7.3,23.5,7,23,7c-0.5,0-1,0.2-1.4,0.6L16,13.2l-5.5-5.5 c-0.8-0.8-2.1-0.8-2.8,0C7.3,8,7,8.5,7,9.1s0.2,1,0.6,1.4l5.5,5.5l-5.5,5.5C7.3,21.9,7,22.4,7,23c0,0.5,0.2,1,0.6,1.4 C8,24.8,8.5,25,9,25c0.5,0,1-0.2,1.4-0.6l5.5-5.5l5.5,5.5c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8L18.8,16z"></path> </g></svg>