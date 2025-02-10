import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../constants/constants";
import { setRequests } from "../store/requestsSlice";

const useRequests = (setError) => {
  const dispatch = useDispatch();

  const getRequests = async () => {
    try{
      const response = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(setRequests(response?.data?.data));
    } catch(err){
      setError(err?.response?.data || err.message);
    }
  };
  return getRequests;
};

export default useRequests;
