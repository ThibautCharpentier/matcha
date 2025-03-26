import { API_URL} from "../../utils/constants";
import { useEffect } from "react";

export default function ModifyProfile({myData, setIsModalHobbiesOpen}) {
    const pathPicture = API_URL + "/" + myData.picture_profile;
    const txtBio = "Bonjour à tous \nBienvenue sur mon profil"

	const openModalHobbies = () => {

	}

	useEffect(() => {
        console.log("myData a changé :", myData);
    }, [myData]);

	console.log(myData)
	return (
		<div className="w-[95vw] max-w-[400px] max-h-[550px] aspect-[8/11] sm:w-[400px] sm:h-[550px] bg-gray-700 flex flex-col rounded-3xl">
			<div className="bg-gray-700 rounded-3xl">
				<div className="flex flex-row space-x-3">
					<img src={pathPicture} className="w-[37.5%] h-auto m-4 border-2 border-white rounded-full" style={{userSelect: 'none'}}/>
					<div className="flex flex-col items-start justify-center text-white text-sm">
						<div>{myData.firstname} {myData.lastname}</div>
						<div>{myData.age} ans</div>
						<div>{myData.city}</div>
						<div className="flex space-x-1 flex-row mt-3">
							<svg className="translate-y-[3px]" height="15px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#d81159" strokeWidth="0.00016"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.032"></g><g id="SVGRepo_iconCarrier"> <path d="M1.24264 8.24264L8 15L14.7574 8.24264C15.553 7.44699 16 6.36786 16 5.24264V5.05234C16 2.8143 14.1857 1 11.9477 1C10.7166 1 9.55233 1.55959 8.78331 2.52086L8 3.5L7.21669 2.52086C6.44767 1.55959 5.28338 1 4.05234 1C1.8143 1 0 2.8143 0 5.05234V5.24264C0 6.36786 0.44699 7.44699 1.24264 8.24264Z" fill="#d81159"></path> </g></svg>
							<p>{Math.round((myData.famerating * 100) * 100) / 100} %</p>
						</div>
						<div className="text-xs mt-3">
							{myData.status == "online" ?
							<div className="flex space-x-1 flex-row">
								<svg className="translate-y-[3px]" height="10px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="8" cy="8" r="8" fill="#00cc00"></circle> </g></svg>
								<p>en ligne</p>
							</div>
							:
							<div className="flex space-x-1 flex-row">
								<p>dernière connexion il y a {findLastConnection()}</p>
							</div>}
						</div>
					</div>
				</div>
			</div>
			<div className="bg-white rounded-3xl flex-grow p-4" style={{overflowY: 'auto'}}>
				<div 
					className="text-xs flex flex-wrap gap-1 hover:bg-gray-100 p-2 hover:cursor-pointer"
					onClick={() => setIsModalHobbiesOpen(true)}
				>
					{myData.tags && myData.tags.map((tag, index) => (
						<div key={index} className="bg-gray-700 rounded-3xl p-1 text-white">#{tag}</div>
					))}
				</div>
                <div>
                    <h3 className="text-gray-600 mt-5">A propos de moi</h3>
                    <div className="mt-2">
                        <textarea 
                            className="h-36 w-full border-2 border-[--color-light-green] resize-none" 
                            maxLength="200"
                            placeholder={myData.bio}
                        >
                        </textarea>
                    </div>

                </div>
			</div>
		</div>
	)
}
