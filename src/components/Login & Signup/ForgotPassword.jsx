import { useState } from "react";
import useForgotPassword from "../../utils/hooks/useForgotPassword";
import { Eye, EyeOff } from "lucide-react";
import BackRoute from "../AfterLogin/BackRoute";
import { toast, Toaster } from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState(null);
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmNewPasswordVisible, setConfirmNewPasswordVisible] =
    useState(false);

  const forgotPassword = useForgotPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setError("New passwords do not match.");
      return;
    }
    setError("");
    try {
      await forgotPassword(email, oldPassword, newPassword);
      toast.success("Password Updated successfully");
    } catch (error) {
      const errorMessage = error || "Something went wrong";
      toast.error(errorMessage);
      setError(errorMessage);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="my-24 max-w-3xl flex flex-col gap-5 mx-auto p-6 bg-base-300 shadow-xl rounded-lg border-[0.1px] border-gray-800 select-none"
    >
      <BackRoute />
      <Toaster position="top-center" />
      <h1 className="text-2xl font-semibold ">Forgot Password:</h1>
      <div>
        <label className="block">Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mt-1 border border-gray-500 rounded-md focus:outline-none outline-none"
          placeholder="Enter your email address"
          required
        />
      </div>
      <div className="mb-4 relative">
        <label className="block">Old Password</label>
        <input
          type={oldPasswordVisible ? "text" : "password"}
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full p-2 mt-1 border border-gray-500 rounded-md focus:outline-none outline-none"
          placeholder="Enter your old password"
          required
        />
        <button
          type="button"
          className="absolute inset-y-0 top-7 cursor-pointer right-3 flex items-center text-gray-500"
          onClick={() => setOldPasswordVisible(!oldPasswordVisible)}
        >
          {oldPasswordVisible ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
      <div className="mb-4 relative">
        <label className="block">New Password</label>
        <input
          type={newPasswordVisible ? "text" : "password"}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 mt-1 border border-gray-500 rounded-md focus:outline-none outline-none"
          placeholder="Enter your new password"
          required
        />
        <button
          type="button"
          className="absolute inset-y-0 top-7 cursor-pointer right-3 flex items-center text-gray-500"
          onClick={() => setNewPasswordVisible(!newPasswordVisible)}
        >
          {newPasswordVisible ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
      <div className="mb-4 relative">
        <label className="block">Confirm New Password</label>
        <input
          type={confirmNewPasswordVisible ? "text" : "password"}
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          className="w-full p-2 mt-1 border border-gray-500 rounded-md focus:outline-none outline-none"
          placeholder="Confirm your new password"
          required
        />
        <button
          type="button"
          className="absolute inset-y-0 top-7 cursor-pointer right-3 flex items-center text-gray-500"
          onClick={() =>
            setConfirmNewPasswordVisible(!confirmNewPasswordVisible)
          }
        >
          {confirmNewPasswordVisible ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
      {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md cursor-pointer hover:bg-blue-600 transition duration-200"
      >
        Change Password
      </button>
    </form>
  );
};

export default ForgotPassword;
