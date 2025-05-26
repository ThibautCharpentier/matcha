import { useState, useEffect } from "react";
import axios from 'axios';
import { API_ROUTES } from "../../utils/constants";
import PicturesSlider from "./PicturesSlider";
import UserProfile from "./UserProfile";
import ReportButton from "./ReportButton";
import ClipLoader from "react-spinners/ClipLoader";

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
            if (res.data.message == "like")
                setIsLikeState("like")
            else
                setIsLikeState("unlike")
		})
		.catch((err) => {
			console.log(err);
		});
    }, [reload])

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${isModalProfileUserOpen ? 'block' : 'hidden'}`}>
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
                    {dataUser?.[0] && <div className="relative w-full max-w-[400px] max-h-[650px] aspect-[40/65] sm:w-[400px] sm:h-[650px] bg-gray-200 flex flex-col rounded-3xl shadow-lg overflow-hidden">
                        <div className="flex w-full justify-between items-center max-h-[40px] aspect-[10] sm:h-[40px]">
                            <div className="flex mx-4 mt-1">
                                {isLikeState == "like" ?
                                    <button onClick={unlikeMatch} className="btn-match shadow-xs flex justify-center items-center w-9 h-9 p-2">
                                    <svg height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M5.62436 4.4241C3.96537 5.18243 2.75 6.98614 2.75 9.13701C2.75 11.3344 3.64922 13.0281 4.93829 14.4797C6.00072 15.676 7.28684 16.6675 8.54113 17.6345C8.83904 17.8642 9.13515 18.0925 9.42605 18.3218C9.95208 18.7365 10.4213 19.1004 10.8736 19.3647C11.0805 19.4856 11.2689 19.5765 11.442 19.6395L12.1694 16.73L10.4697 15.0302C10.1926 14.7531 10.1755 14.3094 10.4306 14.0118L12.8973 11.1339L10.0641 9.11021C9.76374 8.89569 9.66412 8.49455 9.82921 8.16445L11.0849 5.65354C9.14155 3.86228 7.13852 3.73198 5.62436 4.4241ZM12.6186 5.94032L11.4575 8.26214L14.4359 10.3896C14.6072 10.5119 14.7191 10.7005 14.7445 10.9094C14.7699 11.1183 14.7064 11.3282 14.5694 11.488L12.0214 14.4607L13.5303 15.9696C13.7166 16.1559 13.7915 16.4262 13.7276 16.6818L13.0453 19.4111C13.072 19.3962 13.099 19.3807 13.1264 19.3647C13.5787 19.1004 14.0479 18.7365 14.574 18.3218C14.8649 18.0925 15.161 17.8642 15.4589 17.6345C16.7132 16.6675 17.9993 15.676 19.0617 14.4797C20.3508 13.0281 21.25 11.3344 21.25 9.13701C21.25 6.98614 20.0346 5.18243 18.3756 4.4241C16.7843 3.69672 14.6531 3.87769 12.6186 5.94032ZM12 4.45873C9.68795 2.39015 7.09896 2.10078 5.00076 3.05987C2.78471 4.07283 1.25 6.42494 1.25 9.13701C1.25 11.8025 2.3605 13.836 3.81672 15.4757C4.98287 16.7888 6.41022 17.8879 7.67083 18.8585C7.95659 19.0785 8.23378 19.292 8.49742 19.4998C9.00965 19.9036 9.55955 20.3342 10.1168 20.6598C10.6739 20.9853 11.3096 21.2499 12 21.2499C12.6904 21.2499 13.3261 20.9853 13.8832 20.6598C14.4405 20.3342 14.9903 19.9036 15.5026 19.4998C15.7662 19.292 16.0434 19.0785 16.3292 18.8585C17.5898 17.8879 19.0171 16.7888 20.1833 15.4757C21.6395 13.836 22.75 11.8025 22.75 9.13701C22.75 6.42494 21.2153 4.07283 18.9992 3.05987C16.901 2.10078 14.3121 2.39015 12 4.45873Z" fill="#d81159"></path> </g></svg>
                                    </button>
                                :
                                    <button onClick={likeMatch} className="btn-match shadow-xs flex justify-center items-center w-9 h-9 p-2">
                                    <svg height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M5.62436 4.4241C3.96537 5.18243 2.75 6.98614 2.75 9.13701C2.75 11.3344 3.64922 13.0281 4.93829 14.4797C6.00072 15.676 7.28684 16.6675 8.54113 17.6345C8.83904 17.8642 9.13515 18.0925 9.42605 18.3218C9.95208 18.7365 10.4213 19.1004 10.8736 19.3647C11.3261 19.6292 11.6904 19.7499 12 19.7499C12.3096 19.7499 12.6739 19.6292 13.1264 19.3647C13.5787 19.1004 14.0479 18.7365 14.574 18.3218C14.8649 18.0925 15.161 17.8642 15.4589 17.6345C16.7132 16.6675 17.9993 15.676 19.0617 14.4797C20.3508 13.0281 21.25 11.3344 21.25 9.13701C21.25 6.98614 20.0346 5.18243 18.3756 4.4241C16.7639 3.68739 14.5983 3.88249 12.5404 6.02065C12.399 6.16754 12.2039 6.25054 12 6.25054C11.7961 6.25054 11.601 6.16754 11.4596 6.02065C9.40166 3.88249 7.23607 3.68739 5.62436 4.4241ZM12 4.45873C9.68795 2.39015 7.09896 2.10078 5.00076 3.05987C2.78471 4.07283 1.25 6.42494 1.25 9.13701C1.25 11.8025 2.3605 13.836 3.81672 15.4757C4.98287 16.7888 6.41022 17.8879 7.67083 18.8585C7.95659 19.0785 8.23378 19.292 8.49742 19.4998C9.00965 19.9036 9.55954 20.3342 10.1168 20.6598C10.6739 20.9853 11.3096 21.2499 12 21.2499C12.6904 21.2499 13.3261 20.9853 13.8832 20.6598C14.4405 20.3342 14.9903 19.9036 15.5026 19.4998C15.7662 19.292 16.0434 19.0785 16.3292 18.8585C17.5898 17.8879 19.0171 16.7888 20.1833 15.4757C21.6395 13.836 22.75 11.8025 22.75 9.13701C22.75 6.42494 21.2153 4.07283 18.9992 3.05987C16.901 2.10078 14.3121 2.39015 12 4.45873Z" fill="#d81159"></path> </g></svg>
                                    </button>
                                }
                            </div>
                            <div className="flex mx-4">
                                <svg style={{cursor: 'pointer'}} onClick={() => {
                                    setDataUser(null)
                                    setIsModalProfileUserOpen(false)
                                }} fill="#374151" width="15px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M0 14.545L1.455 16 8 9.455 14.545 16 16 14.545 9.455 8 16 1.455 14.545 0 8 6.545 1.455 0 0 1.455 6.545 8z" fillRule="evenodd"></path> </g></svg>
                            </div>
                        </div>
                        <div className="w-full rounded-3xl max-h-[60px] aspect-[20/3] sm:h-[60px] justify-center flex items-center">
                            <div className="text-gray-500 flex flex-row items-center justify-between sm:w-[60%]">
                                <span className={`${toggleProfile && "text-gray-900"} pr-3`}>Profil</span>
                                <button onClick={() => {
                                    if (!toggleProfile)
                                        checkProfile()
                                    else
                                        switchToggleProfile()
                                }}
                                    className="relative w-24 h-8 bg-pink-600 rounded-full"
                                >
                                <div
                                    className={`absolute top-1 left-1 w-10 h-6 bg-white rounded-full shadow transition-transform duration-300 ${
                                    toggleProfile ? "translate-x-0" : "translate-x-[calc(100%+0.5rem)]"
                                    }`}
                                ></div>
                                </button>
                                <span className={`${!toggleProfile && "text-gray-900"} pl-3`}>Photos</span>
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
                                        <ReportButton
                                            toggleProfile={toggleProfile}
                                            switchToggleProfile={switchToggleProfile}
                                            userData={dataUser}
                                            userIndex={0}
                                            functionInterface={() => {
                                                setIsModalProfileUserOpen(false)
                                                setDataUser(null)
                                            }}
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
