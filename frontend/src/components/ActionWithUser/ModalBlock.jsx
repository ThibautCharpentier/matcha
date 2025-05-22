import { useState, useEffect } from 'react';
import Request from "../../utils/request"

export default function ModalBlock({ isModalBlockOpen, setIsModalBlockOpen, idContact, functionDeleteContact, setActivateDots }) {

    const handleContinueButton = async () => {
        console.log("handleBtn")
        const res = await Request.blockMatch(idContact);
        console.log(res);
        setIsModalBlockOpen(false);
        setActivateDots(false);
        functionDeleteContact();
    }

    return (
        <div className={`fixed inset-0 z-50 ${isModalBlockOpen ? 'flex' : 'hidden'} items-center justify-center`}>
            <div
                className="absolute inset-0 bg-gray-800 bg-opacity-50"
                onClick={() => setIsModalBlockOpen(false)}
            ></div>
            <div className="relative bg-white w-3/4 max-w-96 p-6 z-10 rounded-xl shadow-md">
                <p>Êtes-vous sûr de vouloir bloquer cet utilisateur ? Cette action est irréversible.</p>
                <div className="flex flex-row justify-center items-center mt-4">
                    <button
                        onClick={() => setIsModalBlockOpen(false)}
                        className="mr-2 px-4 py-2 bg-gray-300 text-white rounded"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={handleContinueButton}
                        className="ml-2 px-4 py-2 bg-pink-300 text-white rounded">
                        Continuer
                    </button>
                </div>
            </div>
        </div>
    );
}
