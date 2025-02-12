import { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { BASE_URL } from "../../utils/constants/constants";

const ForgotPasswordUsingEmail = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/forgot-password/email`, {
        email,
      });
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div>
      <Toaster position="top-center" />
      <div className="flex items-center justify-center min-h-screen text-gray-400">
        <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-base-200">
          <h1 className="text-3xl font-bold">Forgot Password</h1>
          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            <div>
              <label className="block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 mt-1 border border-gray-500 rounded-md focus:outline-none outline-none "
                placeholder="Enter your email"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordUsingEmail;
