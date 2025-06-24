import { useState } from "react";
import { API_ROUTES } from "../../../utils/constants";
import DOMPurify from 'dompurify';
import axios from 'axios';
import BeatLoader from "react-spinners/BeatLoader";

export default function CodeForm({ setToken, idAdmin }) {
    const [inputState, setInputState] = useState("")
    const [hasSubmit, setHasSubmit] = useState(false);
    const [errState, setErrState] = useState("");

    async function handleSubmit(e) {
        e.preventDefault()

        if (validationCheck()) {
			setHasSubmit(true)
			const obj = {
                id: idAdmin.current,
				code: DOMPurify.sanitize(inputState),
			}

            try {
                const res = await axios.post(API_ROUTES.ADMIN_AUTH_CODE, obj, { withCredentials: true });
                if (res.status !== 200)
					throw new Error('Une erreur est survenue');
                setToken(res.data.message)
            } catch (err) {
                if (err.response?.data?.message === "Invalid code")
                    setErrState("Code invalide");
                else
					setErrState("Formulaire invalide");
            } finally {
				setHasSubmit(false)
			}
        }
    }

	function validationCheck() {
		if (inputState.length != 6) {
			setErrState("Ce champ doit contenir exactement 6 chiffres")
			return false;
		}
		else {
			setErrState("")
			return true;
		}
	}

    return (
        <form onSubmit={handleSubmit} action="" className="flex flex-col mt-6">
            <label className="font-poppins-medium text-gray-50" htmlFor="mail">Code reçu par mail</label>
            <input className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none"
            placeholder="Entrez votre code à 6 chiffres"
            type="text"
            inputMode="numeric"
            maxLength={6}
            name="code"
            id="code"
            value={inputState}
            onChange={(e) => {
                setInputState(e.target.value.replace(/\D/g, ""))
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
