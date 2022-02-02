import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import axios from '../api/axios';
import Nav from './Nav';

function Header({ route }) {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    setAuth({});
    const response = await axios.get('/logout', {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });
    console.log(response.data);
    navigate('/login');
  };
  return (
    <header className="z-10 py-4 bg-gray-900 fixed w-full">
      <nav className="hidden m768:flex items-center justify-between h-full container px-10 mx-auto text-indigo-900">
        <ul className="py-1 flex items-center justify-between text-gray-500 dark:text-gray-400">
          <Nav route={route} />
        </ul>
        <button
          type="button"
          onClick={logout}
          className="flex items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-gray-800 border border-transparent rounded-lg active:bg-green-600 hover:bg-green-600 focus:outline-none focus:shadow-outline-yellow"
        >
          Logout
        </button>
      </nav>

      <div className="flex m768:hidden items-center justify-between h-full container px-10 mx-auto text-indigo-900">
        <button
          type="button"
          className="m768:hidden bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          aria-controls="mobile-menu"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="block h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            className="hidden h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <nav
        id="mobile-nav"
        className="hidden flex-col m768:hidden items-center justify-between h-full container px-10 mx-auto text-indigo-900"
      >
        <ul className="py-1 flex items-center justify-between text-gray-500 dark:text-gray-400">
          <Nav route={route} />
        </ul>
        <button
          type="button"
          onClick={logout}
          className="flex items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-gray-800 border border-transparent rounded-lg active:bg-green-600 hover:bg-green-600 focus:outline-none focus:shadow-outline-yellow"
        >
          Logout
        </button>
      </nav>
    </header>
  );
}

export default Header;
