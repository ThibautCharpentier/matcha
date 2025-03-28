import { API_ROUTES } from "./constants";
import DOMPurify from 'dompurify';
import axios from 'axios';

const Request = {
    updateInterests : async (interests) => {
        const obj = {
            tabInterests: interests
        }

        return axios.patch(`${API_ROUTES.UPDATE_INTERESTS}`, obj, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((res) => {
            if (res.status != 200)
                throw new Error('une erreur est survenue')
            else {
                return {success: true}
            }
        })
        .catch((err) => {
            console.log(err)
            return {success: false}
        })
    },
    changeBio : async (newBio) => {
        const obj = {
            bio: DOMPurify.sanitize(newBio),
        }

        return axios.patch(`${API_ROUTES.UPDATE_BIO}`, obj, {
            withCredentials: true,
        })
        .then((res) => {
            if (res.status != 200)
                throw new Error('une erreur est survenue')
            else {
                return {success: true}
            }
        })
        .catch((err) => {
            console.log(err)
            return {success: false}
        })
    }
}

export default Request;