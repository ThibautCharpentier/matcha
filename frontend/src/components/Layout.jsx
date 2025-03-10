import AuthentifiedProvider from "./AuthentifiedContext"
import { useAuth } from "./AuthContext";

export default function Layout({ children }) {
	const { isAuthenticated } = useAuth();

	return (
		<>
			{isAuthenticated ? 
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
