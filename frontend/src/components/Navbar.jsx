import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {

  return (
    <div className="h-screen w-64 bg-gray-800 text-white fixed">
    	<div className="flex items-center justify-center h-16 border-b border-gray-700">
    		<h1 className="text-xl font-semibold">Smack</h1>
    	</div>
    	<nav className="mt-10">
    	  <ul>
    	  	<li>
    	  		<NavLink
    	  		  to="/"
    	  		  className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
    	  		  activeClassName="bg-gray-700 text-white"
    	  		>
    	  		  Tableau de Bord
    	  		</NavLink>
    	  	</li>
    	  	<li>
    	  		<NavLink
    	  		  to="/profile"
    	  		  className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
    	  		  activeClassName="bg-gray-700 text-white"
    	  		>
    	  		  Matchs
    	  		</NavLink>
    	  	</li>
    	  	<li>	
				<NavLink
				to="/settings"
				className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
				activeClassName="bg-gray-700 text-white"
				>
				Messagerie
				</NavLink>
    	  	</li>
			<li>
				<NavLink
				to="/settings"
				className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
				activeClassName="bg-gray-700 text-white"
				>
				Norifications
				</NavLink>
			</li>
			<li>
				<NavLink
				to="/settings"
				className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
				activeClassName="bg-gray-700 text-white"
				>
				Paramètres
				</NavLink>
			</li>
			<li>
    	  		<button>Déconnexion</button>
			</li>
    	  </ul>
    	</nav>
    	{/* <ul>
    	  {isLoggedIn ? (
    	    <>
    	      <li><button onClick={logout}>Logout</button></li>
    	    </>
    	  ) : (
    	    <>
    	      <li><button  onClick={login}>Login</button></li>
    	      <li><button>Sign Up</button></li>
    	    </>
    	  )}
    	</ul> */}
    </div>
  );
};

export default Navbar;
