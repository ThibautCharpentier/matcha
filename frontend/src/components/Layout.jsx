import AuthentifiedProvider from "./AuthentifiedContext"
import { useAuth } from "./AuthContext";
import { ToastContainer } from 'react-toastify';

export default function Layout({ children }) {
	const { isAuthenticated } = useAuth();

	const contextClass = {
		success: "bg-[--color-dark-green]",
		error: "bg-[--color-pink]",
		default: "bg-[--color-dark-green]",
	};

	return (
		<>
			{isAuthenticated ?
			<>
				<AuthentifiedProvider
					children={children}
				/>
				<ToastContainer
					position="top-right"
					// autoClose={5000}
					hideProgressBar={false}
					closeOnClick
					pauseOnHover
					draggable
					theme="colored"
					toastClassName={(context) =>
						contextClass[context?.type || "default"] +
						" relative flex p-3 max-w-72 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
					}
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
