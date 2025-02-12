import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/constants/constants";
import { Eye, EyeOff } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/reset-password/${token}`, { newPassword });
      toast.success(res.data.message);
      navigate("/login"); // Redirect after successful reset
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-gray-400">
      <Toaster position="top-center" />
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-base-200">
        <h2 className="text-2xl font-bold text-center text-gray-200 mb-3">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4 relative">
            <label className="block">New Password</label>
            <input
              type={passwordVisible ? "text" : "password"}
              value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 mt-1 border border-gray-500 rounded-md focus:outline-none outline-none"
                placeholder="Enter your new password"
                required
            />
             <button
              type="button"
              className="absolute inset-y-0 top-7 cursor-pointer right-3 flex items-center text-gray-500"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
