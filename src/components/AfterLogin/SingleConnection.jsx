import React from "react";
import { Link, useNavigate } from "react-router-dom";

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
    <div className="flex items-center space-x-4 select-none py-5 px-5 rounded-xl hover:bg-base-200">
      <img
        onClick={handleProfileClick}
        src={profilePicture}
        alt={firstName}
        className="w-12 h-12 rounded-full cursor-pointer"
      />
      <div className="flex items-center justify-between w-full">
        <div
          className="flex flex-col cursor-pointer"
          onClick={handleProfileClick}
        >
          <h3 className="text-md font-semibold">
            {lastName ? firstName + " " + lastName : firstName}
          </h3>
          <p className="text-gray-400 text-sm">
            {profileSummary.length > 50
              ? profileSummary.slice(0, 50) + "..."
              : profileSummary.charAt(0).toUpperCase() +
                profileSummary.slice(1)}
            <br />({" "}
            {experienceLevel.charAt(0).toUpperCase() + experienceLevel.slice(1)}{" "}
            )
          </p>
        </div>
        <Link to={`/chat/${_id}`}>
          <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-slate-700 rounded-md">
            Message
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SingleConnection;
