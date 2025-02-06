import React from "react";
import { Code } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Code size={24} />
            <span className="text-xl font-bold">devTinder</span>
          </div>
          <nav className="flex space-x-4 mb-4 md:mb-0">
            <Link to={"/privacy-policy"} className="hover:text-blue-400 transition">
              Privacy Policy
            </Link>
            <Link to={"/terms-of-service"} className="hover:text-blue-400 transition">
              Terms of Service
            </Link>
            <Link to={"/contact-us"} className="hover:text-blue-400 transition">
              Contact Us
            </Link>
          </nav>
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} devTinder. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
