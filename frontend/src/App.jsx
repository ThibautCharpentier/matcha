import './style/App.css'
import './style/BackgroundPattern.css'
import { APP_ROUTES } from "./utils/constants"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Welcome from "./components/Welcome/Welcome"
import AnimationBackground from "./components/AnimationBackground"
import SignIn from "./components/Signin/SignIn"
import SignUp from "./components/Signup/SignUp"
import TokenMail from "./components/Token/TokenMail"
import TokenNewMail from "./components/Token/TokenNewMail"
import TokenPassword from "./components/Token/TokenPassword"
import NoAuthRoute from './components/NoAuthRoute'
import AuthRoute from './components/AuthRoute'
import CompleteProfileRoute from './components/CompleteProfileRoute'
import Dashboard from "./components/Dashboard"
import Match from "./components/Match/Match"
import Layout from "./components/Layout"
import Notification from "./components/Notification/Notification"
import Parameters from "./components/Parameters/Parameters"
import CompleteProfile from "./components/CompleteProfil/CompleteProfil"
import { AuthProvider } from "./components/AuthContext"

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
							<Route exact path={ APP_ROUTES.TOKEN_NEWMAIL } element={<TokenNewMail />} />
							<Route exact path={ APP_ROUTES.DASHBOARD } element={<AuthRoute element={Dashboard} />} />
							<Route exact path={ APP_ROUTES.MATCH } element={<AuthRoute element={Match} />} />
							<Route exact path={ APP_ROUTES.NOTIFICATION } element={<AuthRoute element={Notification} />} />
							<Route exact path={APP_ROUTES.COMPLETE_PROFILE} element={<CompleteProfileRoute element={<CompleteProfile />} />} />
							<Route exact path={ APP_ROUTES.PARAMETERS } element={<AuthRoute element={Parameters} />} />
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
