import GenderStep from "./GenderStep"
import PreferencesStep from "./PreferencesStep"
import AgeStep from "./AgeStep"
import HobbiesStep from "./HobbiesStep"
import PicturesStep from "./PicturesStep"
import React, { useState, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { API_ROUTES, APP_ROUTES } from "../../utils/constants";

export default function CompleteProfil() {
    const navigate = useNavigate();
    let infosUser = useRef({
        gender: "",
        preferences: "",
        age: "",
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
                return <GenderStep nextStep={nextStep} infosUser={infosUser}/>;
            case 2:
                return <PreferencesStep nextStep={nextStep} infosUser={infosUser}/>;
            case 3:
                return <AgeStep nextStep={nextStep} infosUser={infosUser}/>;
            case 4:
                return <HobbiesStep nextStep={nextStep} infosUser={infosUser}/>;
            case 5:
                return <PicturesStep validateProfil={validateProfil} infosUser={infosUser}/>;
            
          // Ajoutez d'autres cas pour les étapes supplémentaires
            default:
                return <div>Profile Completion Finished</div>;
        }
    };

    const validateProfil = () => {
        axios.post(API_ROUTES.SIGN_UP, infosUser, {
            withCredentials: true,
        })
        .then((res) => {
            if (res.status != 201)
                throw new Error('une erreur est survenue')
            else
                navigate('/dashboard');
        })
        .catch((err) => {
            console.log(err)
            if (err.response.data.message == "")
                console.log("error")
        })
    }
    console.log(infosUser)

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-3xl text-center font-poppins-bold mt-20">Compléter le profil</h1>
            <div className="w-96 h-80 rounded-3xl mt-14 p-2">
                {renderStep()}
                <p className=" text-gray-500 text-xs text-center mt-10">Etape <span>{step}</span>/5</p>
            </div>
        </div>
    )
}