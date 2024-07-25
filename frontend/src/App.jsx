import './style/App.css'
import { APP_ROUTES } from "./utils/constants"
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
import Welcome from "./components/Welcome/Welcome"
import AnimationBackground from "./components/AnimationBackground"
import SignIn from "./components/Signin/SignIn"
import SignUp from "./components/Signup/SignUp"
import TokenMail from "./components/Token/TokenMail"
import TokenPassword from "./components/Token/TokenPassword"
import NoAuthRoute from './components/NoAuthRoute'
import Dashboard from "./components/Dashboard"
import Navbar from "./components/Navbar/Navbar"
import { AuthProvider } from "./components/AuthContext"

const Layout = ({ children }) => {
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
		<div className="">
			{showNavbar && <Navbar />}
			{children}
			<footer></footer>
		</div>
	);
}

export default function App() {

	return (
		<>
			<AuthProvider>
				<BrowserRouter>
					<AnimationBackground />
					<Layout>
						<Routes>
							<Route exact path={ APP_ROUTES.WELCOME } element={<NoAuthRoute element={<Welcome />} />} />
							<Route exact path={ APP_ROUTES.SIGN_IN } element={<NoAuthRoute element={<SignIn />} />} />
							<Route exact path={ APP_ROUTES.SIGN_UP } element={<NoAuthRoute element={<SignUp />} />} />
							<Route exact path={ APP_ROUTES.TOKEN_MAIL } element={<TokenMail />} />
							<Route exact path={ APP_ROUTES.TOKEN_PASSWORD } element={<TokenPassword />} />
							<Route exact path={ APP_ROUTES.DASHBOARD } element={<Dashboard />} />
						</Routes>
					</Layout>
				</BrowserRouter>
			</AuthProvider>
		</>
	)
}

/* <Route path={ APP_ROUTES.SIGN_IN } element={<SignIn />} />
   <Route path={ APP_ROUTES.SIGN_UP } element={<SignUp />} />
   <Route path={ APP_ROUTES.MENU } element={<Menu />} />
   <Route path={ APP_ROUTES.PARAMETERS } element={<Parameters />} />
   <Route path={ APP_ROUTES.MATCH } element={<Match />} />
   <Route path={ APP_ROUTES.RESEARCH } element={<Research />} />
   <Route path={ APP_ROUTES.CONVERSATION } element={<Conversation />} />
   <Route path={ APP_ROUTES.NOTIFICATION } element={<Notification />} />
   <Route path="*" element={<NotFound />} /> */
