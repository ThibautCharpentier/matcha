import { API_ROUTES } from "../../utils/constants";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function TokenMail() {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
	const [display, setDisplay] = useState("");

	useEffect(() => {
		axios.get(`${API_ROUTES.VERIFY_EMAIL}?token=${token}`, {
			withCredentials: true,
		})
		.then((res) => {
			if (res.status != 200)
				throw new Error('Une erreur est survenue');
			else
				setDisplay("Votre adresse mail a été vérifiée avec succès !");
		})
		.catch((err) => {
			setDisplay("Le lien a expiré !");
		});
    }, []);

	return (
		<div className="flex justify-center">
			<div className="w-80 flex flex-col p-2 mt-6">
				{display != "" && <p className="text-center text-xl mt-4">{display}<br /> <span className="font-poppins-semibold" >Veuillez fermer cette page.</span></p>}
			</div>
		</div>
	)
}
