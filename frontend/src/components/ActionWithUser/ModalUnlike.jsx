import { useState, useEffect } from 'react';
import Request from "../../utils/request"

export default function ModalUnlike({ setIsLikeState, isModalUnlikeOpen, setIsModalUnlikeOpen, idContact, functionDeleteContact, setActivateDots }) {

    const handleContinueButton = async () => {
        const res = await Request.unlikeMatch(idContact);
        if (res.success) {
            setIsModalUnlikeOpen(false);
            setActivateDots(false);
            setIsLikeState("unlike");
            functionDeleteContact();
        }
    }

    return (
        <div className={`fixed inset-0 z-50 ${isModalUnlikeOpen ? 'flex' : 'hidden'} items-center justify-center`}>
            <div
                className="absolute inset-0 bg-gray-800 bg-opacity-50"
                onClick={() => setIsModalUnlikeOpen(false)}
            ></div>
            <div className="relative bg-white w-3/4 max-w-96 p-6 z-10 rounded-xl shadow-md">
                <p className='text-center'>Êtes-vous sûr de vouloir de retirer le like ? Cette action est irréversible.</p>
                <div className="flex flex-row justify-center items-center mt-4">
                    <button
                        onClick={() => setIsModalUnlikeOpen(false)}
                        className="mr-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-white rounded"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={handleContinueButton}
                        className="ml-2 px-4 py-2 bg-pink-300 hover:bg-pink-400 text-white rounded">
                        Continuer
                    </button>
                </div>
            </div>
        </div>
    );
}