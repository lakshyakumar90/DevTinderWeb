import React, { useState } from 'react';
import { BASE_URL } from '../../utils/constants/constants';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const OTPVerification = () => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/forgot-password/otp`, {
        email: email,
      });
      toast.success(response.data.message);
      setOtpSent(true);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/forgot-password/otp-verify`, {
        email: email,
        otp: otp,
        newPassword: newPassword,
      });
      toast.success(response.data.message);
      navigate('/login');
      // Optionally redirect or clear the form
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex flex-col space-y-4 max-w-3xl mx-auto my-24">
      <div>
        <label htmlFor="email" className="block text-gray-200 text-sm font-bold mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={otpSent}
        />
      </div>

      {!otpSent ? (
        <button
          onClick={handleSendOTP}
          disabled={loading}
          className={`bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-wait' : ''}`}
        >
          {loading ? 'Sending OTP...' : 'Send OTP'}
        </button>
      ) : (
        <>
          <div>
            <label htmlFor="otp" className="block text-gray-300 text-sm font-bold mb-2">
              OTP
            </label>
            <input
              type="text"
              id="otp"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="block text-gray-300 text-sm font-bold mb-2">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <button
            onClick={handleVerifyOTP}
            disabled={loading}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-wait' : ''}`}
          >
            {loading ? 'Verifying...' : 'Verify OTP and Change Password'}
          </button>
        </>
      )}
    </div>
  );
};

export default OTPVerification;