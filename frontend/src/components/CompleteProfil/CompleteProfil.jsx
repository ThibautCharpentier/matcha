import GenderStep from "./GenderStep"
import SexualPreferencesStep from "./SexualPreferencesStep"
import AgeStep from "./AgeStep"
import React, { useState, useRef } from 'react';


export default function CompleteProfil() {
    let infosUser = useRef({
        gender: "",
        sexual_preferences: "",
        age: "",
        interest: [],
        pictures: []
    })

    const [step, setStep] = useState(1);

    const nextStep = () => {
        setStep(prevStep => prevStep + 1);
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return <GenderStep nextStep={nextStep} infosUser={infosUser}/>;
            case 2:
                return <SexualPreferencesStep nextStep={nextStep} infosUser={infosUser}/>;
            case 3:
                return <AgeStep nextStep={nextStep} infosUser={infosUser}/>;
            
          // Ajoutez d'autres cas pour les étapes supplémentaires
            default:
                return <div>Profile Completion Finished</div>;
        }
    };

    console.log(infosUser)

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-3xl text-center font-poppins-bold mt-20">Compléter le profil</h1>
            <div className="w-80 h-80 rounded-3xl mt-14 p-10">
                {renderStep()}
                <p className=" text-gray-500 text-xs text-center mt-10">Etape <span>{step}</span>/5</p>
            </div>
        </div>
    )
}