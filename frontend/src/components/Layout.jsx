import AuthentifiedProvider from "./AuthentifiedContext"
import { useAuth } from "./AuthContext";
import { ToastContainer } from 'react-toastify';

export default function Layout({ children }) {
	const { isAuthenticated } = useAuth();

	return (
		<>
			{isAuthenticated ?
			<>
				<AuthentifiedProvider
					children={children}
				/>
				<ToastContainer
					position="top-right"
					autoClose={5000}
					hideProgressBar={false}
					closeOnClick
					pauseOnHover
					draggable
					theme="colored"
				/>
			</>	
			:
			<>
				<header></header>
				<main>
					{children}
				</main>
			</>
			}
			<footer></footer>
		</>
	);
}
