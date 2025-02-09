import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants/constants";
import { setUser } from "../utils/store/userSlice";

const Body = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);

  const fetchUsers = async () => {
    try {
      if (document.cookie) {
        const res = await axios.get(BASE_URL + "/profile/view", {
          withCredentials: true,
        });
        dispatch(setUser(res.data));
      }
    } catch (e) {
      if (e.status === 401) {
        return navigate("/login");
      }
      navigate("/error");
    }
  };

  useEffect(() => {
    !userData && fetchUsers();
  }, []);

  const hideNavbar =
    location.pathname.includes("/terms-of-service") ||
    location.pathname.includes("/privacy-policy") ||
    location.pathname.includes("/contact-us");

  return (
    <div className="theme-[black]">
      {!hideNavbar && <Navbar />}
      <Outlet />
    </div>
  );
};

export default Body;
