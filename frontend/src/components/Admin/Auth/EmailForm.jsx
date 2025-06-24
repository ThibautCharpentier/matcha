import { useState } from "react";
import { API_ROUTES } from "../../../utils/constants";
import DOMPurify from 'dompurify';
import axios from 'axios';
import BeatLoader from "react-spinners/BeatLoader";

export default function EmailForm({ setAuthStep, idAdmin }) {
    const [inputState, setInputState] = useState("")
    const [hasSubmit, setHasSubmit] = useState(false);
    const [errState, setErrState] = useState("");

    async function handleSubmit(e) {
        e.preventDefault()

        if (validationCheck()) {
			setHasSubmit(true)
			const obj = {
				email: DOMPurify.sanitize(inputState),
			}

            try {
                const res = await axios.post(API_ROUTES.ADMIN_AUTH_EMAIL, obj, { withCredentials: true });
                if (res.status !== 200)
					throw new Error('Une erreur est survenue');
                idAdmin.current = res.data.message
                setAuthStep("code")
            } catch (err) {
                if (err.response?.data?.message === "Invalid email")
                    setErrState("Email invalide");
                else
					setErrState("Formulaire invalide");
            } finally {
				setHasSubmit(false)
			}
        }
    }

	function validationCheck() {
		if (inputState.length == 0) {
			setErrState("Ce champ ne peut pas être vide")
			return false;
		}
		else {
			setErrState("")
			return true;
		}
	}

    return (
        <form onSubmit={handleSubmit} action="" className="flex flex-col mt-6">
            <label className="font-poppins-medium text-gray-50" htmlFor="mail">Adresse e-mail</label>
            <input className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none"
            placeholder="Entrez une adresse mail"
            type="text"
            name="mail"
            id="mail"
            autoComplete="email"
            value={inputState}
            onChange={(e) => {
                setInputState(e.target.value)
            }}
            />
            {errState != "" && (
            <p className=" text-red-600 text-sm ">{errState}</p>
            )}
            {hasSubmit ?
                <button className="btn mt-6 hover:bg-white" disabled>
                    <BeatLoader
                        color="#000"
                        size={9}
                    />
                </button>
            :
                <button className="btn mt-6 hover:bg-white hover:text-black">Envoyer</button>
            }
        </form>
    )
}
