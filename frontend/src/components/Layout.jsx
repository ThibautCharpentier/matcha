import { useLocation } from "react-router-dom"
import { APP_ROUTES } from "../utils/constants"
import AuthentifiedProvider from "./AuthentifiedContext"

export default function Layout({ children }) {
	const location = useLocation();

	const navbarRoutes = [
		APP_ROUTES.DASHBOARD,
		APP_ROUTES.MATCH,
		APP_ROUTES.CONVERSATION,
		APP_ROUTES.NOTIFICATION,
		APP_ROUTES.PARAMETERS
	];

	const showNavbar = navbarRoutes.includes(location.pathname)

	return (
		<>
			{showNavbar ? 
			<AuthentifiedProvider
				children={children}
			/>
			:
			<div>
				{children}
			</div>}
			<footer></footer>
		</>
	);
}
