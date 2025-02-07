import React from "react";
import { Code } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const isAuthPath =
    location.pathname.includes("/login") ||
    location.pathname.includes("/signup");

  return (
    <div className="navbar bg-base-300 shadow-sm fixed top-0 z-50">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-xl">
          <Code size={32} />
          DevTinder
        </Link>
      </div>
      {!isAuthPath &&
        (user ? (
          <div className="flex gap-2 mr-10 ">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-300">
                Hey! {user.firstName}
              </span>
            </div>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="avatar" src={user.profilePicture} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex gap-2 mr-10">
            <Link to={"/signup"}>
              <button className="btn btn-ghost">Sign Up</button>
            </Link>
            <Link to={"/login"}>
              <button className="btn btn-primary">Log In</button>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Navbar;
