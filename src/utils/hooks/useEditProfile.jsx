import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { useCallback } from "react";
import { BASE_URL } from "../constants/constants";
import { useNavigate } from "react-router-dom";

const useEditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const editProfile = useCallback(
    async (formData, setError) => {
      try {
        console.log(formData);
        const res = await axios.patch(BASE_URL + "/profile/edit", formData, {
          withCredentials: true,
        });
        console.log(res);
          dispatch(setUser(res?.data?.data));
          navigate('/profile');
      } catch (error) {
        setError(error?.response?.data || error.message);
      }
    },
    [dispatch]
  );

  return editProfile;
};
export default useEditProfile;
