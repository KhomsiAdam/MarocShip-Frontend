import { axiosPrivate } from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axiosPrivate.post('/refresh');
    setAuth((prev) => {
      console.log(prev);
      console.log(response.data.token);
      return { ...prev, accessToken: response.data.token };
    });
    return response.data.token;
  };
  return refresh;
};

export default useRefreshToken;
