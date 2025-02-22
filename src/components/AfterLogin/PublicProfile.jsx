import React, { useEffect, useState } from "react";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import useRequestReview from "../../utils/hooks/useRequestReview";
import { useSelector } from "react-redux";
import useRequests from "../../utils/hooks/useRequests";
import BackRoute from "./BackRoute";

const PublicProfile = () => {
  const locationn = useLocation();
  const [user, setUser] = useState(locationn.state?.user);
  const [showFullBio, setShowFullBio] = useState(false);
  const [requestId, setRequestId] = useState(locationn.state?.requestId);
  const [type, setType] = useState(locationn.state?.type);
  const requestReview = useRequestReview();
  const getRequests = useRequests();
  const requests = useSelector((store) => store.requests);

  const exists =
    requests && requests.some((request) => request._id === requestId);

  if (user === null) return;

  const {
    firstName,
    lastName,
    age,
    location,
    profileSummary,
    gender,
    experienceLevel,
    bio,
    skills,
    socialLinks,
    profilePicture,
    education,
    workExperience,
  } = user;

  const handleClick = (status) => {
    requestReview(requestId, status);
  };

  useEffect(() => {
    getRequests();
    setUser(locationn.state?.user);
    setType(locationn.state?.type);
    setRequestId(locationn.state?.requestId);
  }, [locationn, type, requestId]);

  return (
    user && (
      <div className="max-w-2xl my-24 mx-auto p-6 bg-base-300 shadow-xl rounded-lg border-[0.1px] border-gray-800 select-none">
        <BackRoute />
        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          <img
            src={profilePicture}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full border-4 border-gray-300"
          />
        </div>
        {/* Profile Summary */}
        <div className="mt-6">
          <h1 className="text-2xl font-bold">
            {lastName ? firstName + " " + lastName : firstName}
          </h1>
          <p className="text-gray-400">
            {profileSummary &&
              experienceLevel &&
              profileSummary.charAt(0).toUpperCase() +
                profileSummary.slice(1) +
                " ( " +
                experienceLevel.charAt(0).toUpperCase() +
                experienceLevel.slice(1) +
                " )"}
          </p>
        </div>

        {/* Basic Info */}
        <div className="mt-6">
          {age && (
            <p>
              <strong>Age:</strong> {age}
            </p>
          )}
          {location && (
            <p>
              <strong>Location:</strong> {location}
            </p>
          )}
          {gender && (
            <p>
              <strong>Gender:</strong>{" "}
              {gender.charAt(0).toUpperCase() + gender.slice(1)}
            </p>
          )}
        </div>

        {/* Bio Section */}
        {bio && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Bio</h3>
            <div>
              {showFullBio ? (
                <p className="text-gray-400">
                  {bio}
                  <button
                    onClick={() => setShowFullBio(false)}
                    className="text-blue-500 hover:underline ml-2 cursor-pointer"
                  >
                    Show less
                  </button>
                </p>
              ) : (
                <p className="text-gray-400">
                  {bio.length > 200 ? bio.substring(0, 200) + "..." : bio}
                  {bio.length > 200 && (
                    <button
                      onClick={() => setShowFullBio(true)}
                      className="text-blue-500 hover:underline ml-2 cursor-pointer"
                    >
                      Read more
                    </button>
                  )}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Skills Section */}
        {skills && skills.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold py-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-600 font-semibold text-gray-200 rounded-lg text-sm select-none"
                >
                  {skill.charAt(0).toUpperCase() + skill.slice(1)}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Education Section */}
        {education && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Education</h3>
            <p className="text-gray-400">{education}</p>
          </div>
        )}

        {/* Work Experience Section */}
        {workExperience && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Work Experience</h3>
            <p className="text-gray-400">{workExperience}</p>
          </div>
        )}

        {/* Social Links */}
        {socialLinks && Object.keys(socialLinks).length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold py-3">Social Links</h3>
            <div className="flex gap-4">
              {Object.values(socialLinks).every(
                (link) => !link || link === "" || link === " "
              ) && <p className="text-gray-400">No social links provided</p>}
              {socialLinks.github && (
                <a
                  target="_blank"
                  href={socialLinks.github}
                  className="text-gray-400 hover:text-gray-100 transition-all text-xl hover:underline"
                >
                  <FaGithub />
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  target="_blank"
                  href={socialLinks.linkedin}
                  className="text-gray-400 hover:text-gray-100 transition-all text-xl hover:underline"
                >
                  <FaLinkedinIn />
                </a>
              )}
              {socialLinks.twitter && (
                <a
                  target="_blank"
                  href={socialLinks.twitter}
                  className="text-gray-400 hover:text-gray-100 transition-all text-xl hover:underline"
                >
                  <FaXTwitter />
                </a>
              )}
              {socialLinks.instagram && (
                <a
                  target="_blank"
                  href={socialLinks.instagram}
                  className="text-gray-400 hover:text-gray-100 transition-all text-xl hover:underline"
                >
                  <FaInstagram />
                </a>
              )}
            </div>
          </div>
        )}

        {type === "request" && exists && (
          <div className="mt-4">
            <h1 className="text-md font-semibold py-2">Request</h1>
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
          </div>
        )}
      </div>
    )
  );
};
export default PublicProfile;
