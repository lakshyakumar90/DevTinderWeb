import React from "react";
import { useNavigate } from "react-router-dom";

const SingleConnection = ({ user }) => {
  const navigate = useNavigate();
  const {
    _id,
    firstName,
    lastName,
    age,
    location,
    gender,
    experienceLevel,
    bio,
    skills,
    socialLinks,
    profilePicture,
    profileSummary,
    education,
  } = user.user;

  const handleProfileClick = () => {
    navigate(`/profile/${_id}`, {
      state: { user: user.user, type: "connection" },
    });
  };

  return (
    <div
      onClick={handleProfileClick}
      className="flex items-center space-x-4 select-none py-5 px-5 rounded-xl cursor-pointer hover:bg-base-200"
    >
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
          {profileSummary.length > 50
            ? profileSummary.slice(0, 50) + "..."
            : profileSummary.charAt(0).toUpperCase() + profileSummary.slice(1)}
          <br />({" "}
          {experienceLevel.charAt(0).toUpperCase() + experienceLevel.slice(1)} )
        </p>
        {education && <p className="text-gray-400 text-sm">{education}</p>}
      </div>
    </div>
  );
};

export default SingleConnection;
