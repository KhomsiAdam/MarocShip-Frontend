import { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';
import NotFound from './components/NotFound';
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth';
import useAuth from './hooks/useAuth';
import { axiosPrivate } from './api/axios';
import Dashboard from './components/Dashboard';

const ROLES = {
  Admin: 'Admin',
  Manager: 'Manager',
  Supervisor: 'Supervisor',
  Driver: 'Driver',
};

export function App() {
  const [firstRender, setFirstRender] = useState(false);
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // const from = location.state?.from?.pathname || '/';
  const from = location.pathname || '/';
  useEffect(async () => {
    if (!firstRender) {
      console.log('page refreshed');
      const response = await axiosPrivate.post('/refresh');
      console.log(response);
      const accessToken = response?.data?.token;
      const roles = response?.data?.role;
      setAuth({
        roles,
        accessToken,
      });
      navigate(from, { replace: true });
      setFirstRender(true);
    }
  }, [firstRender]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* protected routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin/*" element={<Dashboard userRole="Admin" />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.Manager]} />}>
          <Route path="manager/*" element={<Dashboard userRole="Manager" />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.Supervisor]} />}>
          <Route
            path="supervisor/*"
            element={<Dashboard userRole="Supervisor" />}
          />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.Driver]} />}>
          <Route path="driver/*" element={<Dashboard userRole="Driver" />} />
        </Route>

        {/* not found */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
