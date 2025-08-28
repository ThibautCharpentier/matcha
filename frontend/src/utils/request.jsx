import { API_ROUTES } from "./constants";
import DOMPurify from 'dompurify';
import axios from 'axios';

import { showErrorServer, showErrorData, showSuccess } from "./toastUtils";

const Request = {
    updatePhotos : async (photos) => {
        const formData = new FormData();

        const blobsOnly = [];
        const pathsOrNulls = photos.map(photo => {
            if (photo instanceof Blob) {
                blobsOnly.push(photo);
                return null;
            }
            return photo;
        });

        blobsOnly.forEach(blob => {
            formData.append('pictures', blob);
        });

        formData.append('pictureRefs', JSON.stringify(pathsOrNulls));
    
        return axios.patch(`${API_ROUTES.UPDATE_PICTURES}`, formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((res) => {
            if (res.status != 200) {
                const error = new Error('une erreur est survenue')
                error.status = res.status;
                throw error;
            }
            else {
                showSuccess("Les modifications de ton profil ont été enregistrées.")
                return {success: true}
            }
        })
        .catch((err) => {
            console.log(err);
            if (err.status === 500)
                showErrorServer();
            else
                showErrorData();
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
            if (res.status != 200) {
                const error = new Error('une erreur est survenue')
                error.status = res.status;
                throw error;
            }
            else {
                showSuccess("Les modifications de ton profil ont été enregistrées.")
                return {success: true}
            }
        })
        .catch((err) => {
            console.log(err);
            if (err.status === 500)
                showErrorServer();
            else
                showErrorData();
            return {success: false}
        })
    },
    changeBio : async (newBio) => {
        const obj = {
            bio: DOMPurify.sanitize(newBio.trim()),
        }

        return axios.patch(`${API_ROUTES.UPDATE_BIO}`, obj, {
            withCredentials: true,
        })
        .then((res) => {
            if (res.status != 200) {
                const error = new Error('une erreur est survenue')
                error.status = res.status;
                throw error;
            }
            else {
                showSuccess("Les modifications de ton profil ont été enregistrées.")
                return {success: true}
            }
        })
        .catch((err) => {
            console.log(err);
            if (err.status === 500)
                showErrorServer();
            else
                showErrorData();
            return {success: false}
        })
    },
    sendNewMessage : async (newMessage, room_id, receiver_id) => {
        const obj = {
            newMessage: DOMPurify.sanitize(newMessage.trim()),
            receiver_id: receiver_id,
            room_id: room_id
        }

        return axios.post(`${API_ROUTES.SEND_MESSAGE}`, obj, {
            withCredentials: true,
        })
        .then((res) => {
            if (res.status != 200) {
                const error = new Error('une erreur est survenue')
                error.status = res.status;
                throw error;
            }
            else {
                return {success: true}
            }
        })
        .catch((err) => {
            console.log(err);
            if (err.status === 500)
                showErrorServer();
            else
                showErrorData();
            return {success: false}
        })
    },
    sendMessageView : async (room_id) => {
        const obj = {
            room_id: room_id,
        }

        return axios.patch(`${API_ROUTES.SEND_MESSAGE_VIEW}`, obj, {
            withCredentials: true,
        })
        .then((res) => {
            if (res.status != 200) {
                const error = new Error('une erreur est survenue')
                error.status = res.status;
                throw error;
            }
            else {
                return {success: true}
            }
        })
        .catch((err) => {
            console.log(err);
            if (err.status === 500)
                showErrorServer();
            else
                showErrorData();
            return {success: false}
        })
    },
    unlikeMatch: async (id_contact) => {
        const obj = {
            target: id_contact,
        }

        return axios.post(`${API_ROUTES.DISLIKE}`, obj, {
            withCredentials: true,
        })
        .then((res) => {
            if (res.status != 200) {
                const error = new Error('une erreur est survenue')
                error.status = res.status;
                throw error;
            }
            else {
                showSuccess("Le like a été retiré.")
                return {success: true}
            }
        })
        .catch((err) => {
            console.log(err);
            if (err.status === 500)
                showErrorServer();
            return {success: false}
        })
    },
    blockMatch: async (id_contact) => {
        const obj = {
            target: id_contact,
        }

        return axios.post(`${API_ROUTES.BLOCK}`, obj, {
            withCredentials: true,
        })
        .then((res) => {
            if (res.status != 200) {
                const error = new Error('une erreur est survenue')
                error.status = res.status;
                throw error;
            }
            else {
                showSuccess("Le profil a été bloqué.")
                return {success: true}
            }
        })
        .catch((err) => {
            console.log(err);
            if (err.status === 500)
                showErrorServer();
            return {success: false}
        })
    },
    reportMatch: async (id_contact) => {
        const obj = {
            target: id_contact,
        }
    
        return axios.post(`${API_ROUTES.REPORT}`, obj, {
            withCredentials: true,
        })
        .then((res) => {
            if (res.status != 200) {
                const error = new Error('une erreur est survenue')
                error.status = res.status;
                throw error;
            }
            else {
                showSuccess("Le profil a été signalé.")
                return {success: true}
            }
        })
        .catch((err) => {
            console.log(err);
            if (err.status === 500)
                showErrorServer();
            return {success: false}
        })
    }
}

export default Request;
