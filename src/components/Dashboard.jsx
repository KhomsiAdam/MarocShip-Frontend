import { Link, Route, Routes, useLocation } from 'react-router-dom';
import Deliveries from './Deliveries';
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
      case 'Supervisor':
        return (
          <Routes>
            <Route
              path="deliveries"
              element={<Deliveries endpoint="/supervisor/deliveries" />}
            />
          </Routes>
        );
      case 'Driver':
        return (
          <Routes>
            <Route
              path="deliveries"
              element={<Deliveries endpoint="/driver/deliveries" />}
            />
            <Route
              path="claimed"
              element={<Deliveries endpoint="/driver/claimed" />}
            />
            <Route
              path="delivered"
              element={<Deliveries endpoint="/driver/delivered" />}
            />
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
