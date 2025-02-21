import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../../utils/hooks/useSignup";
import { Toaster } from "react-hot-toast";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Signup = () => {
  const signup = useSignup();
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
    age: "",
    experienceLevel: "",
    location: "",
    gender: "",
    education: "",
    profileSummary: ""
  });
  const [lastName, setLastName] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState(null);

  const handleGoogleSignIn = async() => {
    window.location.href = "http://localhost:3000/googlelogin";
  };

  const handleSubmit = async (e) => {
    setError("");
    e.preventDefault();
    const submitData = {
      ...formData,
      ...(lastName && { lastName })
    };
    signup(submitData, setError);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "lastName") {
      setLastName(value);
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-gray-300">
      <div className="w-full max-w-2xl p-8 rounded-lg shadow-lg bg-base-200 my-24">
        <h2 className="text-2xl font-bold text-center text-gray-200">Sign Up</h2>
        <p className="text-sm text-center mb-4">
          Join our developer community
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-2 mt-1 border border-gray-500 rounded-md focus:outline-none"
                placeholder="John"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={handleChange}
                className="w-full p-2 mt-1 border border-gray-500 rounded-md focus:outline-none"
                placeholder="Doe"
              />
            </div>
          </div>

          <div>
            <label className="block">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-500 rounded-md focus:outline-none"
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="relative">
            <label className="block">Password</label>
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-500 rounded-md focus:outline-none"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 top-7 right-3 flex items-center text-gray-500"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          <div className="flex-1">
            <label className="block">Profile Summary</label>
            <input
              type="text"
              name="profileSummary"
              value={formData.profileSummary}
              onChange={(e) => {
                if (e.target.value.length <= 200) {
                  handleChange(e);
                }
              }}
              className="w-full p-2 mt-1 border border-gray-500 rounded-md focus:outline-none"
              placeholder="About Yourself... (max 200 characters)"
              maxLength={200}
              required
            />
            <div className="text-sm text-gray-500 mt-1">
              {formData.profileSummary?.length || 0}/200 characters
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full p-2 mt-1 border border-gray-500 rounded-md focus:outline-none"
                placeholder="25"
                min="1"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block">Experience Level</label>
              <select
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleChange}
                className="w-full p-2 mt-1 border border-gray-500 rounded-md focus:outline-none bg-base-200"
                required
              >
                <option value="" disabled>
                  Choose Experience Level
                </option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-500 rounded-md focus:outline-none"
              placeholder="City, Country"
              required
            />
          </div>

          <div>
            <label className="block">Education</label>
            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-500 rounded-md focus:outline-none"
              placeholder="School, College, University, etc."
              required
            />
          </div>

          <div>
            <label className="block">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-500 rounded-md focus:outline-none bg-base-200"
              required
            >
              <option value="" disabled>
                Choose Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Create Account
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
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;