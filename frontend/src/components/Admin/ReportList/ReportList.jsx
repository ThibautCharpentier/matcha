import { useState, useEffect } from "react";
import axios from 'axios';
import PicturesSlider from "../../Profile/PicturesSlider";
import UserProfile from "../../Profile/UserProfile";
import { API_ROUTES } from "../../../utils/constants";
import ReportListButtons from "./ReportListButtons";
import ClipLoader from "react-spinners/ClipLoader";

export default function ReportList({ token }) {
    const [reportState, setReportState] = useState(null);
    const [reportIndexState, setReportIndexState] = useState(0);
    const [toggleProfile, setToggleProfile] = useState(false);

    const switchToggleProfile = () => {
		setToggleProfile((prevState) => !prevState);
	}

    useEffect(() => {
        axios.get(`${API_ROUTES.GET_ALL_REPORTS}?adminToken=${token}`, {
			withCredentials: true,
		})
		.then((res) => {
			if (res.status != 200)
				throw new Error('Une erreur est survenue');
			setReportState(res.data.message);
			setReportIndexState(0);
		})
		.catch((err) => {
			console.log(err)
		});
    }, []);

    return (
        <>
            {reportState != null ?
                <div className="flex justify-center">
                    <div className="flex flex-col p-2 mt-6 bg-gray-400 rounded-2xl">
                        {(reportState && !reportState[reportIndexState] && <h1 className="text-xl text-center font-poppins-bold text-gray-50">Pas de compte signalé pour le moment</h1>)}
                        {(reportState && reportState[reportIndexState] && 
                            <>
                                <h1 className="text-xl text-center font-poppins-bold text-gray-50">Voici la liste des comptes signalés :</h1>
                                <span className="mt-6 text-center font-poppins-bold text-gray-50">Ce compte a été signalé <span className="font-bold">{reportState[reportIndexState].nb_report}</span> fois</span>
                                <div className="relative w-full max-w-[400px] max-h-[610px] aspect-[40/61] sm:w-[400px] sm:h-[610px] bg-gray-200 flex flex-col rounded-3xl">
                                    {(toggleProfile ?
                                        <>
                                            <UserProfile
                                                userData={reportState}
                                                userIndex={reportIndexState}
                                            />
                                            <ReportListButtons
                                                token={token}
                                                toggleProfile={toggleProfile}
                                                switchToggleProfile={switchToggleProfile}
                                                reportState={reportState}
                                                reportIndexState={reportIndexState}
                                                setReportIndexState={setReportIndexState}
                                            />
                                        </>
                                    :
                                        <>
                                            <PicturesSlider
                                                userData={reportState}
                                                userIndex={reportIndexState}
                                            />
                                            <ReportListButtons
                                                token={token}
                                                toggleProfile={toggleProfile}
                                                switchToggleProfile={switchToggleProfile}
                                                reportState={reportState}
                                                reportIndexState={reportIndexState}
                                                setReportIndexState={setReportIndexState}
                                            />
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            :
                <div className="w-full h-screen flex justify-center items-center">
                    <ClipLoader
                        color="#000"
                        size={70}
                    />
                </div>
            }
        </>
    )
}
