import { APP_ROUTES } from "../../utils/constants";
import { NavLink } from "react-router-dom"

export default function ValidateSignup({mailUser}) {
    return (
        <div className="flex flex-col mt-20 justify-center items-center">
            <h1 className="text-3xl text-center font-poppins-bold ">Confirmer l'adresse e-mail</h1>
            <div className="w-72 text-justify mt-10">
                <p className="text-xl">Un <span className='text-[--color-pink]'>e-mail de confirmation</span> a été envoyé à l'adresse : <br /> <span className="font-poppins-semibold" >{mailUser}</span></p>
                <p className="my-5">Consultez votre boîte de réception et suivez les instructions pour finaliser l'inscription</p>
                <div className="flex justify-center">
                    <NavLink to={APP_ROUTES.SIGN_IN} className="btn">E-mail validé</NavLink>
                </div>
            </div>
        </div>
    )
}