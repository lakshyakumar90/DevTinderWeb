import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { useCallback } from "react";
import { BASE_URL } from "../constants/constants";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signup = useCallback(
    async (formData, setError) => {
      try {
        console.log(formData);
        const res = await axios.post(BASE_URL + "/signup", formData, {
          withCredentials: true,
        });
          dispatch(setUser(res?.data?.data));
          navigate('/');
      } catch (error) {
        setError(error?.response?.data || error.message);
      }
    },
    [dispatch]
  );

  return signup;
};
export default useSignup;
