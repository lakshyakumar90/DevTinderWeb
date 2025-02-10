import React from "react";

const SingleConnection = ({ user }) => {
  const {
    firstName,
    lastName,
    gender,
    experienceLevel,
    profilePicture,
    profileSummary,
    education,
  } = user.user;
  return (
    <div className="flex items-center space-x-4 select-none my-5">
      <img
        src={profilePicture}
        alt={firstName}
        className="w-12 h-12 rounded-full"
      />
      <div className="flex flex-col">
        <h3 className="text-md font-semibold">{firstName + " " + lastName}</h3>
        <p className="text-gray-400 text-sm">
        {profileSummary.charAt(0).toUpperCase() + profileSummary.slice(1) + " ( " + experienceLevel.charAt(0).toUpperCase() + experienceLevel.slice(1) + " )"} 
          </p>
        {education && <p className="text-gray-400 text-sm">{education}</p>}
      </div>
    </div>
  );
};

export default SingleConnection;
