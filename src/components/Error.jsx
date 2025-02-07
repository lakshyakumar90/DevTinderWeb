import React from 'react';
import { Link } from 'react-router-dom';

const Error = ({
  errorCode = 404,
  title = "Oops! Page Not Found",
  message = "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.",
  showHomeButton = true
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-lg text-center">
        {/* Error Code */}
        <h1 className="text-6xl md:text-9xl font-bold text-red-400 mb-4">
          {errorCode}
        </h1>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-500 mb-4">
          {title}
        </h2>

        {/* Message */}
        <p className="text-gray-600 md:text-lg mb-8 leading-relaxed">
          {message}
        </p>

        {/* Action Button */}
        {showHomeButton && (
          <Link 
            to="/"
            className="inline-block px-6 py-3 bg-red-500 text-gray-100 font-medium rounded-lg hover:bg-red-600 transition-colors duration-200"
          >
            Return to Homepage
          </Link>
        )}
      </div>
    </div>
  );
};

export default Error;