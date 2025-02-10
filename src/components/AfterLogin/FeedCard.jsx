import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removePost } from "../../utils/store/feedSlice";
import {
  FaMapMarkerAlt,
  FaUserGraduate,
  FaBriefcase,
  FaGlobe,
} from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";
import useSendRequest from "../../utils/hooks/useSendRequest";

const FeedCard = ({ profile }) => {
  const dispatch = useDispatch();
  const[error, setError] = useState(null);
  const {
    firstName,
    lastName,
    gender,
    experienceLevel,
    location,
    bio,
    skills,
    socialLinks,
    profilePicture,
    education,
    workExperience,
  } = profile;
  const sendRequest = useSendRequest();

  const handleAction = (profileId, status) => {
    sendRequest(profileId, status, setError);
    dispatch(removePost(profileId));
  };

  return (
    profile && (
      <div className="w-full max-w-md bg-zinc-400 shadow-xl rounded-lg overflow-hidden select-none">
        <div className="px-6 py-4">
          {profilePicture && (
            <div className="flex justify-center">
              <img
                src={profilePicture}
                alt={firstName}
                className="w-24 h-24 rounded-full border-2 border-primary"
              />
            </div>
          )}
          <div className="text-center mt-2">
            {firstName && (
              <h3 className="text-xl font-semibold text-gray-800">
                {lastName ? `${firstName} ${lastName}` : firstName}
              </h3>
            )}
            {experienceLevel && (
              <p className="text-gray-600 text-sm">
                {experienceLevel.charAt(0).toUpperCase() +
                  experienceLevel.slice(1)}
              </p>
            )}
          </div>
        </div>
        <div className="px-6 py-3 bg-gray-100">
          {location && (
            <p className="text-gray-700 text-sm flex items-center mb-1">
              <FaMapMarkerAlt className="mr-2" /> {location}
            </p>
          )}
          {gender && (
            <p className="text-gray-700 text-sm flex items-center mb-1">
              <FaUserGraduate className="mr-2" />{" "}
              {gender.charAt(0).toUpperCase() + gender.slice(1)}
            </p>
          )}
          {bio && (
            <p className="text-gray-700 text-sm mb-2">
              <CiCircleInfo className="inline mr-1" />
              {" " + bio.slice(0, 100)}...
            </p>
          )}
          {skills && skills.length > 0 && (
            <div className="mb-2">
              <p className="text-gray-700 text-sm font-semibold">Skills:</p>
              <ul className="list-disc list-inside text-gray-700 text-sm">
                <ul className="flex flex-wrap gap-2">
                  {skills.length > 4 ? (
                    <>
                      {skills.slice(0, 4).map((skill, index) => (
                        <li key={index} className="inline-block">
                          {skill},
                        </li>
                      ))}
                      <li className="inline-block opacity-50">and more</li>
                    </>
                  ) : (
                    skills.map((skill, index) => (
                      <li key={index} className="inline-block">
                        {skill}
                      </li>
                    ))
                  )}
                </ul>
              </ul>
            </div>
          )}
          {education && (
            <p className="text-gray-700 text-sm flex items-center mb-1">
              <FaUserGraduate className="mr-2 " /> Education: {education}
            </p>
          )}
          {workExperience && (
            <p className="text-gray-700 text-sm flex items-center mb-1">
              <FaBriefcase className="mr-2 " /> Experience: {workExperience}
            </p>
          )}
          {socialLinks && Object.keys(socialLinks).length > 0 && (
            <div className="flex gap-2 mt-2">
              {Object.entries(socialLinks).map(([key, value]) => (
                <a
                  key={key}
                  href={value}
                  className="text-primary hover:underline text-sm flex items-center"
                >
                  <FaGlobe className="mr-1" />{" "}
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </a>
              ))}
            </div>
          )}
        </div>
        <div className="px-6 py-4 bg-gray-100 border-t border-gray-200 flex justify-center gap-3">
          <button
            onClick={() => handleAction(profile._id, "interested")}
            className="btn btn-tertiary btn-sm rounded-full"
          >
            Connect
          </button>
          <button
            onClick={() => handleAction(profile._id, "ignored")}
            className="btn btn-primary btn-sm rounded-full"
          >
            Ignore
          </button>
        </div>
      </div>
    )
  );
};

export default FeedCard;
