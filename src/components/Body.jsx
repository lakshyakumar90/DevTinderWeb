import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const Body = () => {
  const location = useLocation();
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
