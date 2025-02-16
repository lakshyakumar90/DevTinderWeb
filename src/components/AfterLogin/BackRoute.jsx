import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const BackRoute = () => {
  const navigate = useNavigate();
  return (
    <div className="select-none my-3" onClick={() => navigate(-1)}>
      <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">
        <IoIosArrowBack />
        Back
      </button>
    </div>
  );
};

export default BackRoute;
