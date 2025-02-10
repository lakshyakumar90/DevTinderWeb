import { useDispatch } from "react-redux";
import { setConnections } from "../store/connectionsSlice";
import axios from "axios";
import { BASE_URL } from "../constants/constants";

const useConnections = (setError) => {
  const dispatch = useDispatch();

  const getConnections = async () => {
    try{
      const response = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(setConnections(response?.data?.data));
    } catch(err){
      setError(err?.response?.data || err.message);
    }
  };
  return getConnections;
};

export default useConnections;
