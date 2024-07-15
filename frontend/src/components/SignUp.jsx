import { Link } from "react-router-dom"
import { APP_ROUTES } from "../utils/constants"

export default function SignUp() {
  return (
    <div className="flex justify-center">
        <div className="w-80 flex flex-col bg-red-400 p-12 mt-12">
          <h1 className="text-5xl font-poppins-bold">Créer un compte</h1>
          <p className="font-poppins-regular">Vous avez déjà un compte ? <Link className="" to={ APP_ROUTES.SIGN_IN } >Se connecter</Link></p>
          <form action="" className="flex flex-col">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input type="text" name="username" id="username" />
            <label htmlFor="name">Prénom</label>
            <input type="text" name="name" id="name" />
            <label htmlFor="lastname">Nom</label>
            <input type="text" name="lastname" id="lastname"/>
            <label htmlFor="mail">Mail</label>
            <input type="text" name="mail" id="mail" />
            <label htmlFor="password">Mot de passe</label>
            <input type="text" name="password" id="password" />
            <label htmlFor="confirmpassword">Confirmer mot de passe</label>
            <input type="text" name="confirmpassword" id="confirmpassword" />
          </form>
          <button className="btn mt-6">Créer un compte</button>
        </div>
    </div>
  )
}