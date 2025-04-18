import { useState } from "react";
import ModalHobbies from "./ModalHobbies"

export default function HobbiesStep({nextStep, infosUser}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [passions, setPassions] = useState([]);

    const handleSave = (selectedPassions) => {
        setPassions(selectedPassions);
        setIsModalOpen(false);
    };

    function handleSubmit() { 
        infosUser.interest = [...passions];
        nextStep();
    }

    return (  
        <>
            <div className="strike mb-10">
                <span>J'aime</span>
            </div>
            <div className="flex justify-center">
                <button className="btn btn-primary flex items-center bg-gray-200 hover:bg-gray-300 hover:text-black p-4" onClick={() => setIsModalOpen(true)}>
                <svg height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12.75 9C12.75 8.58579 12.4142 8.25 12 8.25C11.5858 8.25 11.25 8.58579 11.25 9L11.25 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H11.25V15C11.25 15.4142 11.5858 15.75 12 15.75C12.4142 15.75 12.75 15.4142 12.75 15L12.75 12.75H15C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H12.75V9Z" fill="currentColor"></path> <path fillRule="evenodd" clipRule="evenodd" d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z" fill="currentColor"></path> </g></svg>
                <span className="ml-1">Ajoutez des passions</span>
                </button>
            </div>  
            <div className="mb-5 mt-3">
                <ul className="flex flex-wrap">
                {passions.map(passion => (
                    <li key={passion} className="text-md rounded-xl border p-2 border-[--color-pink] mr-2 mb-2">{passion}</li>
                ))}
                </ul>
            </div>
            {passions.length > 0 && (
            <div className="flex justify-center mt-4">
                <button className="btn" onClick={handleSubmit}>Valider</button>
            </div>)}
            <ModalHobbies
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                passions={passions}
            />
        </>
    )
}
