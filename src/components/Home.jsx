import { useNavigate, Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import axios from '../api/axios';

function Home() {
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
    <section>
      <h1>Testing routes</h1>
      <br />
      <p>Logged in!</p>
      <br />
      <Link to="/admin">Go to the Admin page</Link>
      <br />
      <Link to="/manager">Go to the Manager page</Link>
      <br />
      <Link to="/supervisor">Go to the Supervisor pqge</Link>
      <br />
      <Link to="/driver">Go to the Driver page</Link>
      <div className="flex">
        <button type="submit" onClick={logout}>
          Logout
        </button>
      </div>
    </section>
  );
}

export default Home;
