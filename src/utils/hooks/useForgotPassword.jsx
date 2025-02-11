import axios from "axios";
import { BASE_URL } from "../constants/constants";
import { useNavigate } from "react-router-dom";

const useForgotPassword = () => {
  const navigate = useNavigate();
  const forgotPassword = async (email, oldPassword, newPassword) => {
    try{
      const res = await axios.post(
        BASE_URL + "/forgot-password",
        {
          email: email,
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
      );
      navigate("/login");
    } catch(err){
      console.log(err.response.data.message)
      throw err.response.data.message;
    }
  };
  return forgotPassword;
};

export default useForgotPassword;
