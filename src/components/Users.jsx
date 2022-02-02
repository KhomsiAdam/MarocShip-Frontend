/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-unused-expressions */
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

function Users({ endpoint }) {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get(endpoint, {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setUsers(response.data);
      } catch (err) {
        console.error(err);
        navigate('/login', { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <>
      {users?.length ? (
        <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
          {users.map((user) => {
            return (
              <tr key={user?._id} className="text-gray-700 dark:text-gray-400">
                <td className="px-4 py-3">
                  <div className="flex items-center text-sm">
                    <p className="font-semibold">{user?._id}</p>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">{user?.email}</td>
                <td className="px-4 py-3 text-sm">{user?.createdAt}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center space-x-4 text-sm">
                    <button
                      type="button"
                      value={user?._id}
                      className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                      aria-label="Edit"
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      ) : (
        <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
          <tr className="text-gray-700 dark:text-gray-400">
            <td className="px-4 py-3">No users...</td>
          </tr>
        </tbody>
      )}
    </>
  );
}

export default Users;
