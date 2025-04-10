import React, { useContext } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { APP_ROUTES, API_ROUTES } from "../../utils/constants"
import { useAuth } from "../AuthContext";
import MyProfil from './MyProfil';

export default function Dashboard() {
    return (
        <div className='w-full flex justify-center align-center'>
            <MyProfil/>
        </div>
    )
}