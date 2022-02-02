import { Link } from 'react-router-dom';

function Nav({ route }) {
  const renderNav = (param) => {
    switch (param) {
      case 'admin':
        return (
          <>
            <li className="relative px-2">
              <Link
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 text-gray-300 hover:bg-green-600 hover:text-white px-3 py-2 rounded-md"
                to={`/${param}`}
              >
                Dashboard
              </Link>
            </li>
            <li className="relative px-2">
              <Link
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 text-gray-300 hover:bg-green-600 hover:text-white px-3 py-2 rounded-md"
                to={`/${param}/managers`}
              >
                Managers
              </Link>
            </li>
          </>
        );
      case 'manager':
        return (
          <>
            <li className="relative px-2">
              <Link
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 text-gray-300 hover:bg-green-600 hover:text-white px-3 py-2 rounded-md"
                to={`/${param}`}
              >
                Dashboard
              </Link>
            </li>
            <li className="relative px-2">
              <Link
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 text-gray-300 hover:bg-green-600 hover:text-white px-3 py-2 rounded-md"
                to={`/${param}/supervisors`}
              >
                Supervisors
              </Link>
            </li>
            <li className="relative px-2">
              <Link
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 text-gray-300 hover:bg-green-600 hover:text-white px-3 py-2 rounded-md"
                to={`/${param}/drivers`}
              >
                Drivers
              </Link>
            </li>
          </>
        );
      case 'supervisor':
        return (
          <>
            <li className="relative px-2">
              <Link
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 text-gray-300 hover:bg-green-600 hover:text-white px-3 py-2 rounded-md"
                to={`/${param}`}
              >
                Dashboard
              </Link>
            </li>
            <li className="relative px-2">
              <Link
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 text-gray-300 hover:bg-green-600 hover:text-white px-3 py-2 rounded-md"
                to={`/${param}/deliveries`}
              >
                Deliveries
              </Link>
            </li>
          </>
        );
      case 'driver':
        return (
          <>
            <li className="relative px-2">
              <Link
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 text-gray-300 hover:bg-green-600 hover:text-white px-3 py-2 rounded-md"
                to={`/${param}`}
              >
                Dashboard
              </Link>
            </li>
            <li className="relative px-2">
              <Link
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 text-gray-300 hover:bg-green-600 hover:text-white px-3 py-2 rounded-md"
                to={`/${param}/deliveries`}
              >
                Deliveries
              </Link>
            </li>
          </>
        );
      default:
        return '';
    }
  };
  return renderNav(route);
}

export default Nav;
