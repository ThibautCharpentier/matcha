import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_ROUTES, API_URL } from "../../../utils/constants";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import ClipLoader from "react-spinners/ClipLoader";

import default_picture from '../../../assets/images/img_profile.png';

export default function MyRecentsViews({ getProfileUser }) {
    const [listProfiles, setListProfiles] = useState([])
	const [hasFetched, setHasFetched] = useState(false)

    useEffect(() => {
		axios.get(`${API_ROUTES.GET_RECENTS_VIEWS}`, {
			withCredentials: true,
		})
		.then((res) => {
			if (res.status != 200)
				throw new Error('Une erreur est survenue');
            setListProfiles(res.data.message)
			setHasFetched(true)
		})
		.catch((err) => {
			console.log(err);
		});
    }, [])

    return (
        <div className='w-full flex flex-col mt-6 justify-center align-center items-center'>
			<span className='w-full sm:w-[80vw] lg:w-[75vw] font-poppins-medium mb-2 pl-2 text-xl'>Profils vus récemment</span>
			{hasFetched ?
				<>
					{listProfiles && listProfiles.length > 0 ?
						<div className="w-full sm:w-[80vw] lg:w-[75vw]">
							<AliceCarousel
								mouseTracking
								items={listProfiles.map((profile, index) => (
									<div key={index} className="flex justify-center">
										<div className="relative flex justify-center border-white border-2 rounded-full">
											{profile.picture_profile ?
												<img
													src={`${API_URL}/${profile.picture_profile}`}
													alt={`profile-${index}`}
													className="rounded-full w-36"
													draggable={false}
													style={{ userSelect: 'none' }}
												/>
											:
												<img
													src={default_picture}
													alt={`profile-${index}`}
													className="rounded-full w-36"
													draggable={false}
													style={{ userSelect: 'none' }}
												/>
											}
											<div onClick={() => getProfileUser(profile.id_user)} className="w-36 absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
											</div>
										</div>
									</div>
								))}
								responsive={{
									0: { items: 1 },
									400: { items: 2 },
									550: { items: 3 },
									850: { items: 4 },
									1100: { items: 5 },
									1350: { items: 6 },
									1600: { items: 7 },
									1850: { items: 8 },
									2100: { items: 9}
								}}
								renderPrevButton={({ isDisabled }) => (
									<button
									className={`absolute left-0 top-20 -translate-y-1/2 text-black p-2 sm:p-0 ${
										isDisabled ? 'opacity-30' : ''
									}`}
									>
									◀
									</button>
								)}
								renderNextButton={({ isDisabled }) => (
									<button
									className={`absolute right-0 top-20 -translate-y-1/2 text-black p-2 sm:p-0 ${
										isDisabled ? 'opacity-30' : ''
									}`}
									>
									▶
									</button>
								)}
								disableDotsControls
								infinite={false}
							/>
						</div>
					:
						<p className='text-center mt-1'>Aucun profil vu récemment</p>
					}
				</>
			:
				<div className="">
					<ClipLoader
						color="#fff"
						size={70}
					/>
				</div>
			}
        </div>
    )
}
