import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';
import { useCallback } from 'react';
import { BASE_URL } from '../constants/constants';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = useCallback(async (email, password, setError) => {
    try {
      const res = await axios.post(BASE_URL + "/login", {
        email,
        password
      }, {
        withCredentials: true
      });
      dispatch(setUser(res?.data?.data));
      navigate('/');
    } catch (error) {
      setError(error?.response?.data || error.message);
      console.error(error);
    }
  }, [dispatch]);

  return login;
};
export default useLogin;