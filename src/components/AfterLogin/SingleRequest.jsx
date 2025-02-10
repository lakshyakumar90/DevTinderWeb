import React, { useState } from "react";
import useRequestReview from "../../utils/hooks/useRequestReview";

const SingleRequest = ({ request }) => {
  const [error, setError] = useState(null);
  const {
    firstName,
    lastName,
    gender,
    experienceLevel,
    profilePicture,
    profileSummary,
    education,
  } = request.fromUserId;
  const requestReview = useRequestReview();

  const handleClick = (status) => {
    requestReview(request._id, status, setError);
  };

  return (
    <div className="flex items-center justify-between space-x-4 select-none my-5">
      <div className="flex items-center space-x-4">
        <img
          src={profilePicture}
          alt={firstName}
          className="w-12 h-12 rounded-full"
        />
        <div className="flex flex-col">
          <h3 className="text-md font-semibold">
            {lastName ? firstName + " " + lastName : firstName}
          </h3>
          <p className="text-gray-400 text-sm">
            {profileSummary.charAt(0).toUpperCase() +
              profileSummary.slice(1) +
              " ( " +
              experienceLevel.charAt(0).toUpperCase() +
              experienceLevel.slice(1) +
              " )"}
          </p>
          {education && <p className="text-gray-400 text-sm">{education}</p>}
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => handleClick("accepted")}
          className="cursor-pointer px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-700 transition"
        >
          Accept
        </button>
        <button
          onClick={() => handleClick("rejected")}
          className="cursor-pointer px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition"
        >
          Reject
        </button>
      </div>
        {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default SingleRequest;
