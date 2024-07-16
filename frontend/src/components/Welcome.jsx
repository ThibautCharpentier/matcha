import { APP_ROUTES } from "../utils/constants"
import { Link } from "react-router-dom"

export default function Welcome() {
    return (
        <div className="relative">
            <header className="flex flex-row justify-between m-6 items-center">
                <p className="font-poppins-bold text-xl ">SMACK</p>
                <Link className="btn" to={ APP_ROUTES.SIGN_IN } >Connexion</Link>
            </header>
            <div className='mt-36 p-2 pl-20 md:pl-64'>
                <h1 className='text-5xl font-poppins-semibold leading-tight md:text-6xl md:leading-tight'>Rencontrez <br/>Quelqu'un de <br/><span className='text-[--color-pink] font-poppins-bold'>Spécial</span></h1>
                <p className='text-2xl mt-6 font-poppins-light '>Un simple clic suffit</p>
                <Link className='btn mt-6' to={ APP_ROUTES.SIGN_UP }>Commencer</Link>
            </div>
        </div>
    );
}
