import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { API_ROUTES } from "../../utils/constants";

export default function ReportButton({toggleProfile, switchToggleProfile, matchState, matchIndexState, setMatchIndexState}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsMenuOpen(false);
        }
    };

    function reportProfile() {
		const obj = {
			target: matchState[matchIndexState].id
		}
		axios.post(API_ROUTES.REPORT, obj, {
			withCredentials: true,
		})
		.then((res) => {
			if (res.status != 200)
				throw new Error('Une erreur est survenue');
            setIsMenuOpen(false);
			if (toggleProfile)
				switchToggleProfile()
			setMatchIndexState(matchIndexState + 1)
		})
		.catch((err) => {
			console.log(err)
		});
	}

    useEffect(() => {
        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
        <>
            <button 
                onClick={toggleMenu} 
                className="rounded-full p-1"
            >
                <svg height="20px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 12C9.10457 12 10 12.8954 10 14C10 15.1046 9.10457 16 8 16C6.89543 16 6 15.1046 6 14C6 12.8954 6.89543 12 8 12Z" fill="#ffffff"></path> <path d="M8 6C9.10457 6 10 6.89543 10 8C10 9.10457 9.10457 10 8 10C6.89543 10 6 9.10457 6 8C6 6.89543 6.89543 6 8 6Z" fill="#ffffff"></path> <path d="M10 2C10 0.89543 9.10457 -4.82823e-08 8 0C6.89543 4.82823e-08 6 0.895431 6 2C6 3.10457 6.89543 4 8 4C9.10457 4 10 3.10457 10 2Z" fill="#ffffff"></path> </g></svg>
            </button>
            {isMenuOpen && (
                <div ref={menuRef} className="absolute w-24 right-0 top-8 bg-black rounded-md shadow-lg text-white">
                    <button onClick={reportProfile} className='w-full p-1 rounded-md'>
                        <span className='text-xs font-bold'>Signaler : <br></br></span>
                        <span className='text-xs'>faux compte</span>
                    </button>
                </div>
            )}
        </>
    )
}
