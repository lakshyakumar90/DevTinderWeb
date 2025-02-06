import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Body from './components/Body'
import LandingPage from './components/beforeLogin/LandingPage'
import Login from './components/Login & Signup/Login'
import Signup from './components/Login & Signup/Signup'
import TermsOfService from './components/policy/TermsOfService'
import PrivacyPolicy from './components/policy/PrivacyPolicy'
import ContactUs from './components/policy/ContactUs'
import Home from './components/AfterLogin/Home'

const App = () => {
  const user = false;
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/" element={user ? <Home /> : <LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact-us" element={<ContactUs />} />

          
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
