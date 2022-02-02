import { Link, Route, Routes, useLocation } from 'react-router-dom';
import Drivers from './Drivers';
import Header from './Header';
import Managers from './Managers';
import Supervisors from './Supervisors';

function Dashboard({ userRole }) {
  const location = useLocation();
  const from = location.pathname;
  const homeRoute = `/${userRole.toLowerCase()}`;
  const nestedRoutes = (role) => {
    switch (role) {
      case 'Admin':
        return (
          <Routes>
            <Route path="managers" element={<Managers />} />
          </Routes>
        );
      case 'Manager':
        return (
          <Routes>
            <Route path="supervisors" element={<Supervisors />} />
            <Route path="drivers" element={<Drivers />} />
          </Routes>
        );
      default:
        break;
    }
  };
  return (
    <>
      <Header route={userRole.toLowerCase()} />
      {from === homeRoute ? (
        <section>
          <h1 className="pt-20">{userRole}s Page</h1>
          <br />
          <p>You have a {userRole} role.</p>
          <div className="flex flex-grow">
            <Link to="/">Home</Link>
          </div>
        </section>
      ) : (
        ''
      )}
      {nestedRoutes(userRole)}
    </>
  );
}

export default Dashboard;
