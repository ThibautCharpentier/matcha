import './style/App.css'
import { useState } from 'react'
import { APP_ROUTES } from "./utils/constants"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Welcome from "./components/Welcome"
import AnimationBackground from "./components/AnimationBackground"
import SignIn from "./components/Signin/SignIn"
import SignUp from "./components/Signup/SignUp"
import TokenMail from "./components/Token/TokenMail"
import TokenPassword from "./components/Token/TokenPassword"
import ProtectedRoute from "./components/ProtectedRoute"
import { AuthProvider } from "./components/AuthContext"

export default function App() {

	return (
    	<>
    		<AuthProvider>
    			{/* <Navbar /> */}
    			<BrowserRouter>
					<AnimationBackground />
    				<Routes>
    			    	<Route exact path={ APP_ROUTES.WELCOME } element={<Welcome />} />
						<Route exact path={ APP_ROUTES.SIGN_IN } element={<SignIn />} />
   						<Route exact path={ APP_ROUTES.SIGN_UP } element={<SignUp />} />
						<Route exact path={ APP_ROUTES.TOKEN_MAIL } element={<TokenMail />} />
						<Route exact path={ APP_ROUTES.TOKEN_PASSWORD } element={<TokenPassword />} />
    			    	{/* <ProtectedRoute path={ APP_ROUTES.MENU } element={<Menu />} /> */}
    				</Routes>
    			</BrowserRouter>
    			<footer></footer>
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
