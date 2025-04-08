import { API_ROUTES } from "./constants";
import DOMPurify from 'dompurify';
import axios from 'axios';

const Request = {
    updatePhotos : async (photos) => {
        const formData = new FormData();

        const blobsOnly = [];
        const pathsOrNulls = photos.map(photo => {
            if (photo instanceof Blob) {
                blobsOnly.push(photo);
                return null;
            }
            return photo; // c'est une string
        });

        blobsOnly.forEach(blob => {
            formData.append('pictures', blob);
        });
    
        // Ajouter le tableau pathsOrNulls au FormData (en tant que JSON)
        formData.append('pictureRefs', JSON.stringify(pathsOrNulls));
    
        return axios.patch(`${API_ROUTES.UPDATE_PICTURES}`, formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
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