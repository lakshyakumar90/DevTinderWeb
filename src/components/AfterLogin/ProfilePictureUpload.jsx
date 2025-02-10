import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constants/constants";
import { useDispatch } from "react-redux";
import { setUser } from "../../utils/store/userSlice";
import { toast, Toaster } from "react-hot-toast";

const ProfilePictureUpload = ({ user }) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image)); // Show preview before upload
  };

  const handleUpload = async () => {
    if (!file) return setError("Please select an image");
    setIsUploading(true);

    const formData = new FormData();
    formData.append("profilePic", file);
    formData.append("userId", user._id);

    try {
      const response = await axios.post(BASE_URL + "/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      console.log(response);

      // Update Redux store with new profile picture URL
      dispatch(
        setUser({
          ...user,
          profilePicture: response.data.user.profilePicture,
        })
      );

      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
      setError("Upload failed!");
      toast.error("Failed to upload profile picture");
    } finally {
      setIsUploading(false);
      setPreview(null);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Toaster position="top-center" />
      <div className="relative">
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-32 h-32 rounded-full object-cover"
          />
        ) : (
          <img
            src={user.profilePicture}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
        )}
        {!preview && (
          <div className="absolute -bottom-10 right-5 flex gap-2">
            <button
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to delete your profile picture?"
                  )
                ) {
                  // Handle delete logic here
                  dispatch(
                    setUser({
                      ...user,
                      profilePicture:
                        "https://t3.ftcdn.net/jpg/06/33/54/78/360_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.jpg",
                    })
                  );
                  toast.error("Profile picture removed successfully");
                }
              }}
              className="bg-red-600 p-2 rounded-full cursor-pointer hover:bg-red-700 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <label
              htmlFor="profile-upload"
              className="bg-gray-800 p-2 rounded-full cursor-pointer hover:bg-gray-700 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </label>
          </div>
        )}
        <input
          id="profile-upload"
          type="file"
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
        />
      </div>
      <p className="text-red-500 mt-2">{error}</p>
      {preview && (
        <button
          onClick={handleUpload}
          disabled={isUploading}
          className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors ${
            isUploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isUploading ? "Uploading..." : "Upload"}
        </button>
      )}
    </div>
  );
};

export default ProfilePictureUpload;
