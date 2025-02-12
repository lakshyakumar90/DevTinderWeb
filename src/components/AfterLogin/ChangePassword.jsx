import axios from "axios";
import { Hand, Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { BASE_URL } from "../../utils/constants/constants";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import BackRoute from "./BackRoute";

const ChangePassword = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    setError("");
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit/password`,
        {
          oldPassword,
          newPassword,
        },
        { withCredentials: true }
      );
      toast.success(res.data.message);
      onClose();
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50 text-gray-100">
        <BackRoute />
      <div className="bg-base-300 p-6 rounded-lg w-full max-w-2xl h-[80vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Change Password</h2>
          <button
            onClick={onClose}
            className="px-4 py-[10px] rounded-full hover:bg-gray-700 transition-all cursor-pointer text-gray-300 hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="relative">
            <label className="block">Old Password</label>
            <input
              type={oldPasswordVisible ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              className="w-full p-2 mt-1 border border-gray-500 rounded-md focus:outline-none outline-none"
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
          <div className="relative">
            <label className="block">New Password</label>
            <input
              type={newPasswordVisible ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full p-2 mt-1 border border-gray-500 rounded-md focus:outline-none outline-none"
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
          <div className="relative">
            <label className="block">Confirm Password</label>
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-2 mt-1 border border-gray-500 rounded-md focus:outline-none outline-none"
            />
            <button
              type="button"
              className="absolute inset-y-0 top-7 cursor-pointer right-3 flex items-center text-gray-500"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            >
              {confirmPasswordVisible ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {error && (
            <div className="flex items-center gap-2 text-red-500">
              <Hand className="h-6 w-6" />
              <p>{error}</p>
            </div>
          )}
          <div className="flex justify-between">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-all cursor-pointer"
            >
              Save changes
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
          <Link to="/forgot-password">
            <button
              type="button"
              className="w-full mt-2 bg-gray-500 text-white py-2 rounded-md cursor-pointer hover:bg-gray-600 transition duration-200"
            >
              Try using email
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
