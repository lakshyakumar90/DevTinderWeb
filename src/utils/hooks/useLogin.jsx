import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';
import { useCallback } from 'react';
import { BASE_URL } from '../constants/constants';

const useLogin = () => {
  const dispatch = useDispatch();

  const login = useCallback(async (email, password) => {
    try {
      const res = await axios.post(BASE_URL + "/login", {
        email,
        password
      }, {
        withCredentials: true
      });
      dispatch(setUser(res?.data?.data));
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
    }
  }, [dispatch]);

  return login;
};
export default useLogin;