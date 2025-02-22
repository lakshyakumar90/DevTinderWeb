import React, { useState } from "react";
import useRequestReview from "../../utils/hooks/useRequestReview";
import { useNavigate } from "react-router-dom";

const SingleRequest = ({ request }) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const handleProfileClick = () => {
    navigate(`/profile/${request.fromUserId._id}`, {
      state: {
        user: request.fromUserId,
        type: "request",
        requestId: request._id,
      },
    });
  };

  return (
    <div className="flex items-center justify-between space-x-4 select-none py-5 px-5 rounded-xl cursor-pointer hover:bg-base-200">
      <div className="flex items-center space-x-4">
        {profilePicture && (
          <img
            onClick={handleProfileClick}
            src={profilePicture}
            alt={firstName}
            className="w-12 h-12 rounded-full"
          />
        )}
        <div className="flex flex-col" onClick={handleProfileClick}>
          <h3 className="text-md font-semibold">
            {lastName ? firstName + " " + lastName : firstName}
          </h3>
          <p className="text-gray-400 text-sm">
            {profileSummary &&
              (profileSummary.length > 50
                ? profileSummary.slice(0, 50) + "..."
                : profileSummary.charAt(0).toUpperCase() +
                  profileSummary.slice(1))}
            <br />({" "}
            {experienceLevel &&
              experienceLevel.charAt(0).toUpperCase() +
                experienceLevel.slice(1)}{" "}
            )
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
