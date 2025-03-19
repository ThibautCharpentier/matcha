import GenderStep from "./GenderStep"
import PreferencesStep from "./PreferencesStep"
import AgeStep from "./AgeStep"
import HobbiesStep from "./HobbiesStep"
import PicturesStep from "./PicturesStep"
import React, { useState, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { API_ROUTES, APP_ROUTES } from "../../utils/constants";
import axios from 'axios';
import { useAuth } from "../AuthContext";
import { useAuthentified } from "../AuthentifiedContext"

export default function CompleteProfil() {
    const { profileComplete } = useAuthentified();
    const navigate = useNavigate();
    let infosUser = useRef({
        gender: "",
        preferences: "",
        birthdate: "",
        interest: [],
        pictures: [],
    })

    const [step, setStep] = useState(1);

    const nextStep = () => {
        setStep(prevStep => prevStep + 1);
    };

    const previousStep = () => {
        setStep(prevStep => prevStep - 1);
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
        <div className="w-full min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl text-center font-poppins-bold mt-20">Compléter le profil</h1>
            <div className="w-96 h-80 mt-14 p-2">
                {renderStep()}
                <p className=" text-gray-500 text-xs text-center mt-10">Etape <span>{step}</span>/5</p>
            </div>
        </div>
    )
}