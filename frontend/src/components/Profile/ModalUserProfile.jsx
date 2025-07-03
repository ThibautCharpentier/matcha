import { useState, useEffect } from "react";
import axios from 'axios';
import { API_ROUTES } from "../../utils/constants";
import PicturesSlider from "./PicturesSlider";
import UserProfile from "./UserProfile";
import ReportButton from "./ReportButton";
import ClipLoader from "react-spinners/ClipLoader";
import BtnUnlikeBlockReport from "../ActionWithUser/BtnUnlikeBlockReport";

export default function ModalUserProfile({isModalProfileUserOpen, setIsModalProfileUserOpen, dataUser, setDataUser}) {
    const [toggleProfile, setToggleProfile] = useState(false);
    const [isLikeState, setIsLikeState] = useState(null)
    const [reload, setReload] = useState(true)

    const switchToggleProfile = () => {
		setToggleProfile((prevState) => !prevState);
	}

    function checkProfile() {
		const obj = {
			target: dataUser[0].id
		}
		axios.post(API_ROUTES.VIEW, obj, {
			withCredentials: true,
		})
		.then((res) => {
			if (res.status != 200)
				throw new Error('Une erreur est survenue');
			switchToggleProfile()
		})
		.catch((err) => {
			console.log(err)
		});
	}

    function unlikeMatch() {
		const obj = {
			target: dataUser[0].id
		}
		axios.post(API_ROUTES.DISLIKE, obj, {
			withCredentials: true,
		})
		.then((res) => {
			if (res.status != 200)
				throw new Error('Une erreur est survenue');
            setReload(!reload)
		})
		.catch((err) => {
			console.log(err)
		});
	}

	function likeMatch() {
		const obj = {
			target: dataUser[0].id
		}
		axios.post(API_ROUTES.LIKE, obj, {
			withCredentials: true,
		})
		.then((res) => {
			if (res.status != 200)
				throw new Error('Une erreur est survenue');
            setReload(!reload)
		})
		.catch((err) => {
			console.log(err)
		});
	}

    useEffect(() => {
		axios.get(`${API_ROUTES.GET_INTERACTION}?id_user=${dataUser[0].id}`, {
			withCredentials: true,
		})
		.then((res) => {
			if (res.status != 200)
				throw new Error('Une erreur est survenue');
            if (res.data.message === null)
                setIsLikeState("nothing")
            else
                setIsLikeState(res.data.message)
		})
		.catch((err) => {
			console.log(err);
		});
    }, [reload])

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-20 ${isModalProfileUserOpen ? 'block' : 'hidden'}`}>
            <div className="bg-gray-800 bg-opacity-50 absolute inset-0" onClick={() => {
                setDataUser(null)
                setIsModalProfileUserOpen(false)
            }}
            ></div>
            {isLikeState == null ?
                <ClipLoader
                    color="#fff"
                    size={70}
                />
            :
                <>
                    {dataUser?.[0] && <div className="relative w-full max-w-[400px] bg-gray-200 flex flex-col rounded-3xl shadow-lg overflow-hidden">
                        <div className="w-full rounded-3xl max-h-[60px] aspect-[20/3]  justify-center flex items-center">
                            <div className="text-gray-500 flex flex-row items-center justify-between sm:w-[60%]">
                                <span className={`${toggleProfile && "text-gray-900"} pr-3`}>Profil</span>
                                <button onClick={() => {
                                    if (!toggleProfile)
                                        checkProfile()
                                    else
                                        switchToggleProfile()
                                }}
                                    className="relative w-24 h-8 bg-[--color-dark-green] rounded-full"
                                >
                                <div
                                    className={`absolute top-1 left-1 w-10 h-6 bg-white rounded-full shadow transition-transform duration-300 ${
                                    toggleProfile ? "translate-x-0" : "translate-x-[calc(100%+0.5rem)]"
                                    }`}
                                ></div>
                                </button>
                                <span className={`${!toggleProfile && "text-gray-900"} pl-3`}>Photos</span>
                            </div>
                            <div className="absolute right-0 flex mx-4">
                                <svg style={{cursor: 'pointer'}} onClick={() => {
                                    setDataUser(null)
                                    setIsModalProfileUserOpen(false)
                                }} fill="#374151" width="15px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M0 14.545L1.455 16 8 9.455 14.545 16 16 14.545 9.455 8 16 1.455 14.545 0 8 6.545 1.455 0 0 1.455 6.545 8z" fillRule="evenodd"></path> </g></svg>
                            </div>
                        </div>
                        <div className="relative w-full max-w-[400px] max-h-[550px] aspect-[8/11] sm:w-[400px] sm:h-[550px] bg-gray-200 flex flex-col rounded-3xl">
                            {(toggleProfile ?
                                <>
                                    <UserProfile
                                        userData={dataUser}
                                        userIndex={0}
                                    />
                                    <div className="absolute right-1 top-4">
                                    <BtnUnlikeBlockReport
                                        isLikeState={isLikeState}
                                        setIsLikeState={setIsLikeState}
                                        idContact={dataUser[0].id}
                                        functionDeleteContact={() => {
                                            setIsModalProfileUserOpen(false)
                                        }}
                                        color="#ffffff"
                                    />
                                    </div>
                                </>
                            :
                                <>
                                    <PicturesSlider
                                        userData={dataUser}
                                        userIndex={0}
                                    />
                                </>
                            )}
                        </div>
                    </div>}
                </>
            }
        </div>
    )
}
