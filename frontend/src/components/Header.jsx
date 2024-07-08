import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const { isLoggedIn, login, logout } = useContext(AuthContext);
  console.log(isLoggedIn);

  return (
    <div className="h-screen w-64 bg-gray-800 text-white fixed">
      <div className="flex items-center justify-center h-16 border-b border-gray-700">
        <h1 className="text-xl font-semibold">Smack</h1>
      </div>
      <nav className="mt-10">
        <a
          to="/"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
          activeClassName="bg-gray-700 text-white"
        >
          Matchs
        </a>
        <a
          to="/profile"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
          activeClassName="bg-gray-700 text-white"
        >
          Recherche
        </a>
        <a
          to="/settings"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
          activeClassName="bg-gray-700 text-white"
        >
          Messages
        </a>
        <a
          to="/settings"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
          activeClassName="bg-gray-700 text-white"
        >
          Norifications
        </a>
        <a
          to="/settings"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
          activeClassName="bg-gray-700 text-white"
        >
          Profil
        </a>
        {/* Ajoutez plus de liens ici */}
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

export default Header;
