import { Code, Menu } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Code size={32} />
          <span className="text-2xl font-bold">devTinder</span>
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link to="/login">
            <button className="btn btn-outline btn-primary">LogIn</button>
          </Link>
          <Link to="/signup">
          <button className="btn btn-outline btn-primary">SignUp</button>
          </Link>
        </nav>
        <button className="md:hidden">
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;
