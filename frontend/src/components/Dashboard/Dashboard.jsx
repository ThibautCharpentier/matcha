import React, { useState } from 'react';
import axios from 'axios';
import { API_ROUTES } from "../../utils/constants";
import MyProfile from './Profile/MyProfile';
import MyRecentsViews from './RecentsViews/MyRecentsViews'
import ModalUserProfile from "../Profile/ModalUserProfile";

export default function Dashboard() {
    const [isModalProfileUserOpen, setIsModalProfileUserOpen] = useState(false);
	const [dataUser, setDataUser] = useState(null)

    const getProfileUser = async(id_user) => {
		axios.get(`${API_ROUTES.GET_PROFILE_USER}?id_user=${id_user}`, {
			withCredentials: true,
		})
		.then((res) => {
			if (res.status != 200)
				throw new Error('Une erreur est survenue');
			setDataUser(res.data.message)
			setIsModalProfileUserOpen(true)
		})
		.catch((err) => {
			console.log(err);
		});
	}

    return (
        <div className='w-full'>
            <div className='w-full flex flex-col justify-center align-center items-center mb-[4em] sm:mb-0 sm:p-2'>
                <MyProfile/>
                <MyRecentsViews getProfileUser={getProfileUser} />
            </div>
            {isModalProfileUserOpen && <ModalUserProfile
                isModalProfileUserOpen={isModalProfileUserOpen}
                setIsModalProfileUserOpen={setIsModalProfileUserOpen}
                dataUser={dataUser}
                setDataUser={setDataUser}
            />}
        </div>
    )
}
