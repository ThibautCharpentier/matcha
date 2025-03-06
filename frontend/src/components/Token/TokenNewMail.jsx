import { API_ROUTES } from "../../utils/constants";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

export default function TokenNewMail() {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
	const hasFetched = useRef(false);
	const [display, setDisplay] = useState("");

	useEffect(() => {
        if (hasFetched.current == false)
		{
			axios.get(`${API_ROUTES.VERIFY_NEW_EMAIL}?token=${token}`, {
				withCredentials: true,
			})
			.then((res) => {
				if (res.status != 200)
					throw new Error('Une erreur est survenue');
				else
					setDisplay("Votre adresse mail a été modifiée avec succès ! Veuillez fermer cette page.");
			})
			.catch((err) => {
				setDisplay("Le lien a expiré ! Veuillez fermer cette page.");
			});
		}
        hasFetched.current = true;
    }, []);

	return (
		<div className="flex justify-center">
			<h1 className="text-5xl text-center font-poppins-bold mt-6">{display}</h1>
		</div>
	)
}
