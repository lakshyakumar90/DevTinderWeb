import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants/constants";
import { setUser } from "../utils/store/userSlice";

const Body = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const fetchUsers = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(setUser(res.data));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const hideNavbar =
    location.pathname.includes("/terms-of-service") ||
    location.pathname.includes("/privacy-policy") ||
    location.pathname.includes("/contact-us");

  return (
    <div>
      {!hideNavbar && <Navbar />}
      <Outlet />
    </div>
  );
};

export default Body;
