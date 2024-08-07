const API_URL = "http://" + window.location.hostname + ":8000";
const WS_URL = "ws://" + window.location.hostname + ":8000";

export const API_ROUTES = {
	SIGN_UP: 					`${API_URL}/auth/signup`,
	VERIFY_EMAIL: 				`${API_URL}/auth/verifyemail`,
	SIGN_IN: 					`${API_URL}/auth/signin`,
	FORGOT_PASSWORD: 			`${API_URL}/auth/forgotpassword`,
	FORGOT_USERNAME: 			`${API_URL}/auth/forgotusername`,
	CHANGE_PASSWORD: 			`${API_URL}/auth/changepassword`,
	SIGN_OUT: 					`${API_URL}/auth/signout`,
	REFRESH: 					`${API_URL}/auth/refresh`,
	IS_CONNECTED: 				`${API_URL}/auth/isconnected`,
	GET_MY_PROFILE: 			`${API_URL}/profile/getmyprofile`,
	GET_OTHER_PROFILE: 			`${API_URL}/profile/getotherprofile`,
	//UPDATE_FIRSTNAME:			`${API_URL}/profile/updatefirstname`,
	//UPDATE_LASTNAME: 			`${API_URL}/profile/updatelastname`,
	//UPDATE_GENDER:            	`${API_URL}/profile/updategender`,
	UPDATE_PREFERENCES:			`${API_URL}/profile/updatepreferences`,
	UPDATE_BIO:           		`${API_URL}/profile/updatebio`,
	//UPDATE_AGE:           		`${API_URL}/profile/updateage`,
	UPDATE_PICTURES:      		`${API_URL}/profile/updatepictures`,
	UPDATE_INTEREST:      		`${API_URL}/profile/updateinterest`,
	UPDATE_PASSWORD:      		`${API_URL}/profile/updatepassword`,
	UPDATE_EMAIL:         		`${API_URL}/profile/updateemail`,
	UPDATE_USERNAME:      		`${API_URL}/profile/updateusername`,
	UPDATE_GPS:					`${API_URL}/profile/updategps`,
	UPDATE_CITY:				`${API_URL}/profile/updatecity`,
	LIKE:                 		`${API_URL}/interaction/like`,
	DISLIKE:              		`${API_URL}/interaction/dislike`,
	BLOCK:                		`${API_URL}/interaction/block`,
	VIEW:                 		`${API_URL}/interaction/view`,
	REPORT:               		`${API_URL}/interaction/report`,
	GET_MY_CONVERSATIONS: 		`${API_URL}/interaction/getmyconversations`,
	GET_MESSAGES:         		`${API_URL}/interaction/getmessages`,
};

export const WS_ROUTES = {
	TOKEN:	`${WS_URL}/ws/token`,
}

export const APP_ROUTES = {
    WELCOME: "/",
    SIGN_UP: "/signup",
    SIGN_IN: "/signin",
    TOKEN_MAIL: "/token_mail",
    TOKEN_PASSWORD: "/token_password",
    PARAMETERS: "/parameters",
    DASHBOARD: "/dashboard",
    MATCH: "/match",
    CONVERSATION: "/conversation",
    NOTIFICATION: "/notification",
};
