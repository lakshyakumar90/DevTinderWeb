import { useState } from "react";
import useEditProfile from "../../utils/hooks/useEditProfile";
import { toast } from "react-hot-toast";

const EditProfile = ({ isOpen, onClose, user }) => {
  if (!isOpen) return null;
  const {
    firstName = "",
    lastName = "",
    age = "",
    experienceLevel = "beginner",
    location = "",
    gender = "male",
    education = "",
    profilePicture = "",
    bio = "",
    socialLinks = {},
    workExperience = "",
    skills = [],
  } = user;

  const [formData, setFormData] = useState({
    firstName,
    lastName,
    age,
    experienceLevel,
    location,
    gender,
    education,
    profilePicture,
    bio,
    socialLinks: {
      instagram: socialLinks?.instagram || "",
      linkedin: socialLinks?.linkedin || "",
      github: socialLinks?.github || "",
      twitter: socialLinks?.twitter || "",
    },
    workExperience,
    skills: skills || [],
  });

  const [newSkill, setNewSkill] = useState("");
  const [error, setError] = useState(null);
  const editProfile = useEditProfile();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formattedSkills = formData.skills.filter(
        (skill) => skill.trim() !== ""
      );
      const updatedFormData = {
        ...formData,
        skills: formattedSkills,
      };
      editProfile(updatedFormData, setError);
      onClose();
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "socialLinks") {
      const socialType = e.target.getAttribute("data-social-type");
      setFormData((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialType]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() !== "") {
      // Check if skill already exists (case insensitive)
      const skillExists = formData.skills.some(
        (skill) => skill.toLowerCase() === newSkill.trim().toLowerCase()
      );

      if (!skillExists) {
        setFormData((prev) => ({
          ...prev,
          skills: [...prev.skills, newSkill.trim()],
        }));
        setNewSkill("");
      } else {
        setError("This skill already exists!");
        setTimeout(() => setError(null), 3000);
      }
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  return (
    <div className="fixed overflow-auto inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 text-gray-100">
      <div className="bg-base-300 p-6 rounded-lg w-full max-w-2xl h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Profile</h2>
          <button
            onClick={onClose}
            className="px-4 py-[10px] rounded-full hover:bg-gray-700 transition-all cursor-pointer text-gray-300 hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        <form className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-100">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-2 mt-1 border border-gray-500 rounded-md focus:outline-none text-gray-300"
                placeholder="John"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-100">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-2 mt-1 border border-gray-500 rounded-md focus:outline-none text-gray-300"
                placeholder="Doe"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-100">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full p-2 mt-1 border border-gray-500 rounded-md focus:outline-none text-gray-300"
                placeholder="25"
                min="1"
                required
              />
            </div>

            <div className="flex-1">
              <label className="block text-gray-100">Experience Level</label>
              <select
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleChange}
                className="w-full p-2 mt-1 border border-gray-500 rounded-md focus:outline-none bg-base-200 text-gray-300"
                required
              >
                <option value="" disabled>
                  Choose Experience Level
                </option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-100">Profile Picture</label>
            <input
              type="text"
              name="profilePicture"
              value={formData.profilePicture}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-500 rounded-md focus:outline-none text-gray-300"
              placeholder="Profile Picture URL"
            />
          </div>

          <div>
            <label className="block text-gray-100">Bio</label>
            <textarea
              rows={7}
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-500 rounded-md focus:outline-none text-gray-300"
              placeholder="Tell us about yourself"
            />
          </div>

          <div>
            <label className="block text-gray-100">Social Links</label>
            <div className="ml-5 mt-2 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <label className="w-24 text-gray-100">Instagram</label>
                <input
                  type="text"
                  name="socialLinks"
                  data-social-type="instagram"
                  value={formData.socialLinks.instagram}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 border border-gray-500 rounded-md focus:outline-none text-gray-300"
                  placeholder="Instagram profile URL"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="w-24 text-gray-100">LinkedIn</label>
                <input
                  type="text"
                  name="socialLinks"
                  data-social-type="linkedin"
                  value={formData.socialLinks.linkedin}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 border border-gray-500 rounded-md focus:outline-none text-gray-300"
                  placeholder="LinkedIn profile URL"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="w-24 text-gray-100">GitHub</label>
                <input
                  type="text"
                  name="socialLinks"
                  data-social-type="github"
                  value={formData.socialLinks.github}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 border border-gray-500 rounded-md focus:outline-none text-gray-300"
                  placeholder="GitHub profile URL"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="w-24 text-gray-100">Twitter</label>
                <input
                  type="text"
                  name="socialLinks"
                  data-social-type="twitter"
                  value={formData.socialLinks.twitter}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 border border-gray-500 rounded-md focus:outline-none text-gray-300"
                  placeholder="Twitter profile URL"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-gray-100">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-500 rounded-md focus:outline-none text-gray-300"
              placeholder="City, Country"
              required
            />
          </div>

          <div>
            <label className="block text-gray-100">Work Experience</label>
            <input
              type="text"
              name="workExperience"
              value={formData.workExperience}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-500 rounded-md focus:outline-none text-gray-300"
              placeholder="Job Title, Company name, etc."
            />
          </div>

          <div>
            <label className="block text-gray-100">Skills</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-700 px-3 py-1 rounded"
                >
                  <span className="text-gray-300">{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="ml-2 text-gray-300 hover:text-gray-200"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="flex-1 p-2 border border-gray-500 rounded-md focus:outline-none text-gray-300"
                placeholder="Add a new skill"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>

          <div>
            <label className="block text-gray-100">Education</label>
            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-500 rounded-md focus:outline-none text-gray-300"
              placeholder="School, College, University, etc."
              required
            />
          </div>

          <div>
            <label className="block text-gray-100">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-500 rounded-md focus:outline-none bg-base-200 text-gray-300"
              required
            >
              <option value="" disabled>
                  Choose Gender
                </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Save Changes
          </button>
        </form>

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
