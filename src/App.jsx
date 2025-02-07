import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Body from "./components/Body";
import LandingPage from "./components/beforeLogin/LandingPage";
import Login from "./components/Login & Signup/Login";
import Signup from "./components/Login & Signup/Signup";
import TermsOfService from "./components/policy/TermsOfService";
import PrivacyPolicy from "./components/policy/PrivacyPolicy";
import ContactUs from "./components/policy/ContactUs";
import Feed from "./components/AfterLogin/Feed";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.user);
  return (
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={user ? <Feed /> : <LandingPage />} />
            <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
            <Route path="/signup" element={user ? <Navigate to="/" replace /> : <Signup />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="*" element={user ? <Feed /> : <LandingPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
};

export default App;
