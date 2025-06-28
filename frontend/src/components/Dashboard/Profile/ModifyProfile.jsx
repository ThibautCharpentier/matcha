import { API_URL} from "../../../utils/constants";
import { useState, useEffect } from "react";
import Request from "../../../utils/request";

import profile from '../../../assets/images/img_profile.png';

export default function ModifyProfile({myData, setIsModalHobbiesOpen, setIsModalPhotosOpen}) {
    const pathPicture = myData.picture_profile || "";
	const [inputText, setInputText] = useState(myData.bio);
	const [textAreaIsFocused, setTextAreaIsFocused] = useState(false)

	const handleSaveBio = async () => {
		await Request.changeBio(inputText);
	};
	
	useEffect(() => {
		if (inputText !== myData.bio && !textAreaIsFocused)
			setInputText(myData.bio)
	}, [myData.bio])

	return (
		<div className="w-full max-w-[400px] max-h-[550px] aspect-[8/11] sm:w-[400px] sm:h-[550px] bg-gray-700 flex flex-col rounded-3xl">
			<div className="bg-gray-700 rounded-3xl max-h-[185px] aspect-[400/185] sm:h-[185px]">
				<div className="flex flex-row space-x-6 p-4">
					<div 
						className="relative w-[37.5%] flex justify-center items-center"
						onClick={() => setIsModalPhotosOpen(true)}
					>
						{pathPicture != "" ?
							<img src={`${API_URL}/${pathPicture}`} className="border-2 border-white rounded-full" style={{userSelect: 'none'}}/>
						:
							<img src={profile} className="border-2 border-white rounded-full" style={{userSelect: 'none'}}/>
						}
						<div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
							<svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M4 12H20M12 4V20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
							</svg>
						</div>
					</div>
					<div className="flex flex-col items-start justify-center text-white text-sm w-0 flex-grow">
						<div className="break-all whitespace-normal">{myData.firstname} {myData.lastname}</div>
						<div>{myData.age} ans</div>
						{myData.gps && <div>{myData.city}</div>}
						<div className="flex space-x-1 flex-row mt-3">
							<svg className="translate-y-[3px]" height="15px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ec80a8" strokeWidth="0.00016"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.032"></g><g id="SVGRepo_iconCarrier"> <path d="M1.24264 8.24264L8 15L14.7574 8.24264C15.553 7.44699 16 6.36786 16 5.24264V5.05234C16 2.8143 14.1857 1 11.9477 1C10.7166 1 9.55233 1.55959 8.78331 2.52086L8 3.5L7.21669 2.52086C6.44767 1.55959 5.28338 1 4.05234 1C1.8143 1 0 2.8143 0 5.05234V5.24264C0 6.36786 0.44699 7.44699 1.24264 8.24264Z" fill="#ec80a8"></path> </g></svg>
							<p>{Math.round((myData.famerating * 100) * 100) / 100} %</p>
						</div>
						<div className="text-xs mt-3">
							<div className="flex space-x-1 flex-row">
								<svg className="translate-y-[3px]" height="10px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="8" cy="8" r="8" fill="#b5d8ad"></circle> </g></svg>
								<p>en ligne</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="bg-white rounded-3xl flex-grow p-3 overflow-hidden max-h-[365px] aspect-[400/365] sm:h-[365px]">
				<div style={{ overflowY: 'auto'}} className="h-full p-1">
					<div 
						className="text-xs flex flex-wrap gap-1 hover:bg-gray-100 p-2 hover:cursor-pointer"
						onClick={() => setIsModalHobbiesOpen(true)}
					>
						{(!myData.interest || myData.interest.length < 1) && (
							<>
								<svg height="15px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#4b5563"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H20M12 4V20" stroke="#4b5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
								<p className="text-gray-600">Ajoutez des intérêts</p>
							</>
						)}
						{myData.interest && myData.interest.map((tag, index) => (
							<div key={index} className="bg-gray-700 rounded-3xl p-1 text-white">#{tag}</div>
						))}
					</div>
					<div>
						<div className="mt-5 flex flex-row justify-between">
							<h3 className="text-gray-600">A propos de moi</h3>
							{inputText !== myData.bio && (
								<button className="bg-gray-200 border-2 border-gray-200 rounded-md hover:bg-gray-300 hover:border-gray-300" onClick={() => {
									handleSaveBio();
									}}>
									<svg height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M17.0303 8.78039L8.99993 16.8107L5.4696 13.2804L6.53026 12.2197L8.99993 14.6894L15.9696 7.71973L17.0303 8.78039Z" fill="#000000"></path> </g></svg>
								</button>
							)}
						</div>
						<div className="mt-2 text-sm">
							<textarea 
								className="h-36 w-full hover:ring-2 ring-gray-100 focus:outline-none resize-none" 
								maxLength="200"
								value={inputText || ""}
								onChange={(e) => setInputText(e.target.value.replace(/ {2,}/g, ' ').replace(/\n{1,}/g, ''))}
								spellCheck={false}
								onFocus={() => setTextAreaIsFocused(true)}
								onBlur={() => setTextAreaIsFocused(false)}
							>
							</textarea>
							{textAreaIsFocused && (
								<p className="text-xs text-gray-300 justify-self-end">{inputText?.length || 0}/200</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
