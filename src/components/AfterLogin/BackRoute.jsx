import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const BackRoute = () => {
  const navigate = useNavigate();
  return (
    <div
      className="flex items-center justify-between space-x-4 select-none my-5"
      onClick={() => navigate(-1)}
    >
      <div className="flex items-center hover:text-gray-500 cursor-pointer">
        <IoIosArrowBack />
        <button className="text-md font-semibold cursor-pointer">Back</button>
      </div>
    </div>
  );
};

export default BackRoute;
