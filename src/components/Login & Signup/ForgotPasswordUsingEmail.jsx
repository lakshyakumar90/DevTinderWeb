import { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { BASE_URL } from "../../utils/constants/constants";

const ForgotPasswordUsingEmail = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await axios.post(`${BASE_URL}/forgot-password/email`, {
        email,
      });
      toast.success(res.data.message);

      setCountdown(30);
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(timer);
            setIsSubmitting(false);
            return 0;
          } else {
            return prevCountdown - 1;
          }
        });
      }, 1000);


    } catch (err) {
      toast.error(err.response.data.message);
      setIsSubmitting(false);
      setCountdown(0);
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
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 cursor-pointer disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? (countdown > 0 ? `Resend in ${countdown} seconds` : "Wait...") : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordUsingEmail;
