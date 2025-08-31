import GenderStep from "./GenderStep"
import PreferencesStep from "./PreferencesStep"
import AgeStep from "./AgeStep"
import HobbiesStep from "./HobbiesStep"
import PicturesStep from "./PicturesStep"
import BioStep from "./BioStep"
import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { API_ROUTES } from "../../utils/constants";
import axios from 'axios';
import { useAuthentified } from "../AuthentifiedContext"
import DOMPurify from 'dompurify';

export default function CompleteProfil() {
    const { profileComplete } = useAuthentified();
    const navigate = useNavigate();
    let infosUser = useRef({
        gender: "",
        preferences: "",
        birthdate: "",
        bio: "",
        interest: [],
        pictures: [],
    })

    const [step, setStep] = useState(1);

    const nextStep = () => {
        setStep(prevStep => prevStep + 1);
    };
    
    const renderStep = () => {
        switch (step) {
            case 1:
                return <GenderStep nextStep={nextStep} infosUser={infosUser.current}/>;
            case 2:
                return <PreferencesStep nextStep={nextStep} infosUser={infosUser.current}/>;
            case 3:
                return <AgeStep nextStep={nextStep} infosUser={infosUser.current}/>;
            case 4:
                return <HobbiesStep nextStep={nextStep} infosUser={infosUser.current}/>;
            case 5:
                return <BioStep nextStep={nextStep} infosUser={infosUser.current}/>;
            case 6:
                return <PicturesStep validateProfil={validateProfil} infosUser={infosUser.current}/>;
            default:
                return <div>Profile Completion Finished</div>;
        }
    };

    const validateProfil = () => {
        
        const formData = new FormData();

        formData.append('gender', infosUser.current.gender);
        formData.append('preferences', infosUser.current.preferences);
        formData.append('birthdate', infosUser.current.birthdate);
        formData.append('bio', DOMPurify.sanitize(infosUser.current.bio.trim()));

        infosUser.current.interest.forEach((interest) => {
            formData.append('interest[]', interest);
        });

        infosUser.current.pictures.forEach((picture) => {
            formData.append('pictures', picture);
        });

        axios.patch(API_ROUTES.COMPLETE_PROFILE, formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((res) => {
            if (res.status != 200)
                throw new Error('une erreur est survenue')
            else {
                profileComplete()
                navigate('/dashboard');
            }
        })
        .catch((err) => {
            console.log(err)
            navigate('/complete-profile');
        })
    }

    return (
        <div className="w-full min-h-screen flex flex-col items-center p-4">
            <div className="absolute top-0 w-full">
                <div className="bg-gray-300 h-1">
                    <div
                        className="bg-[--color-pink] h-1 rounded-full transition-all duration-500 ease-in-out"
                        style={{ width: `${((step - 1) / 6) * 100}%` }}
                    >
                    </div>
                </div>
            </div>
            <h1 className="text-3xl text-center font-poppins-bold mt-20">Compléter le profil</h1>
            <div className="mt-14 p-2 md:w-1/3 w-full">
                {renderStep()}
            </div>
        </div>
    )
}
