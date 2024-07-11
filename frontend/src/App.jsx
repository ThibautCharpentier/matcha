import { useState } from 'react'
import './App.css'
import { APP_ROUTES } from "./utils/constants"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Welcome from "./components/Welcome"
import Navbar from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoute"
import { AuthProvider } from "./components/AuthContext"

function App() {

	return (
    	<>
    		<AuthProvider>
    			<Navbar />
    			<BrowserRouter>
    				<Routes>
    			    	<Route path={ APP_ROUTES.WELCOME } element={<Welcome />} />
    			    	{/* <ProtectedRoute path={ APP_ROUTES.MENU } element={<Menu />} /> */}
    				</Routes>
    			</BrowserRouter>
    			<footer></footer>
    		</AuthProvider>
    	</>
	)
}

export default App


/* <Route path={ APP_ROUTES.SIGN_IN } element={<SignIn />} />
   <Route path={ APP_ROUTES.SIGN_UP } element={<SignUp />} />
   <Route path={ APP_ROUTES.MENU } element={<Menu />} />
   <Route path={ APP_ROUTES.PARAMETERS } element={<Parameters />} />
   <Route path={ APP_ROUTES.MATCH } element={<Match />} />
   <Route path={ APP_ROUTES.RESEARCH } element={<Research />} />
   <Route path={ APP_ROUTES.CONVERSATION } element={<Conversation />} />
   <Route path={ APP_ROUTES.NOTIFICATION } element={<Notification />} />
   <Route path="*" element={<NotFound />} /> */