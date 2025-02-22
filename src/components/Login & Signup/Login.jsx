import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../utils/hooks/useLogin";
import { Toaster } from "react-hot-toast";
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState(null);
  const login = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();
    login(email, password, setError);
  };

  const handleGoogleSignIn = async() => {
    window.location.href = "http://localhost:3000/googlelogin";
  };

  return (
    <div className="flex items-center justify-center h-[100dvh] text-gray-400">
      <h1>YUIOYUII</h1>
      <Toaster position="top-center" />
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-base-200">
        <h2 className="text-2xl font-bold text-center text-gray-200">Login</h2>
        <p className="text-sm text-center mb-4">
          Connect with developers around the world
        </p>
        <form onSubmit={handleLogin} className="space-y-4">
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
          <div className="mb-4 relative">
            <label className="block">Password</label>
            <input
              type={passwordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-500 rounded-md focus:outline-none outline-none "
              placeholder="Enter your password"
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
          <Link
            to={"/edit/password"}
            className="text-sm mb-2 inline-block hover:underline"
          >
            Forgot Password
          </Link>
          {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md cursor-pointer hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full bg-slate-200 text-gray-900 py-2 rounded-md cursor-pointer hover:bg-white transition duration-200 flex items-center justify-center border border-gray-300"
          >
            {FaGoogle && <FaGoogle className="h-5 w-5 mr-2" />}
          </button>
          <button
            type="button"
            disabled
            onClick={handleGoogleSignIn}
            className="w-full bg-slate-200 text-gray-900 py-2 rounded-md transition duration-200 flex items-center justify-center border border-gray-300 opacity-50 cursor-not-allowed hover:bg-slate-200"
          >
            {FaGithub && <FaGithub className="h-5 w-5 mr-2" />}
          </button>
          <button
            type="button"
            disabled
            onClick={handleGoogleSignIn}
            className="w-full bg-slate-200 text-gray-900 py-2 rounded-md transition duration-200 flex items-center justify-center border border-gray-300 opacity-50 cursor-not-allowed hover:bg-slate-200"
          >
            {FaXTwitter && <FaXTwitter className="h-5 w-5 mr-2" />}
          </button>
          <button
            type="button"
            disabled
            onClick={handleGoogleSignIn}
            className="w-full bg-slate-200 text-gray-900 py-2 rounded-md transition duration-200 flex items-center justify-center border border-gray-300 opacity-50 cursor-not-allowed hover:bg-slate-200"
          >
            {FaFacebook && <FaFacebook className="h-5 w-5 mr-2" />}
          </button>
        </div>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
