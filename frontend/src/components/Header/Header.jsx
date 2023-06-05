import React, { useContext, useState } from "react";
import "./Header.css";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { ProductContext } from "../../ProductContext";
import axios from "axios";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(true);
  const [query, setQuery] = useState("");

  // console.log(searchedBooks);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const {
    username,
    setUserName,
    userEmail,
    setUserEmail,
    type,
    setType,
    userId,
    setUserId,
    role
  } = React.useContext(UserContext);
  return (
    <>
      <div className="w-full text-gray-900 bg-gradient-to-br from-transparent to-yellow-100">
        <nav className="flex justify-between p-5 items-center mx-auto max-w-screen-xl">
          <button
            onClick={toggleMenu}
            className="sidebar-open block md:hidden relative z-30 focus:outline-none transform  -translate-x-1/2 -translate-y-1/2 active:scale-75 transition-transform"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="btn-open h-5 w-5 transform transition duration-500 ease-in-out"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="btn-close hidden h-5 w-5 transform transition duration-500 ease-in-out"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 7a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 13a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <Link to=" " className="text-3xl md:text-4xl font-bold tracking-wide">
            Book<span className="text-yellow-500">Art</span>
          </Link>
          <div className="flex items-center justify-center">
            <form className="flex border-2 rounded">
              <input
                type="text"
                className="px-4 py-2 w-80"
                placeholder="Search..."
              />
              <button
                type="submit"
                className="flex items-center justify-center px-4 border-l"
              >
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                </svg>
              </button>
            </form>
          </div>
          <div
            className={`${
              isOpen ? "hidden" : "block"
            } menu-responsive fixed flex inset-0 transition-all bg-white/70 backdrop-blur-xl z-20 md:static md:bg-transparent md:flex items-center justify-center space-y-8 md:space-y-0 flex-col md:flex-row md:space-x-8 -mt-56 md:mt-0 `}
          >
            <ul className="flex flex-row md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6 lg:md:-x-8">
              <li className="text-lg md:text-base lg:text-lg font-medium group text-yellow-500">
                <NavLink to="/">Home</NavLink>
                <div className="h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out"></div>
              </li>
              <li className="text-lg md:text-base lg:text-lg font-medium group">
                <NavLink to="/book">Books</NavLink>
                <div className="h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out"></div>
              </li>
              <li className="text-lg md:text-base lg:text-lg font-medium group">
                <NavLink to="/about">About Us</NavLink>
                <div className="h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out"></div>
              </li>
              {!userId && (
                <>
                  <li className="text-lg md:text-base lg:text-lg font-medium group">
                    <NavLink to="/login">Login</NavLink>
                    <div className="h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out"></div>
                  </li>
                  <li className="text-lg md:text-base lg:text-lg font-medium group">
                    <NavLink to="/signup">Signup</NavLink>
                    <div className="h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out"></div>
                  </li>
                </>
              )}
              {userId && role=="seller" && (
                <li className="text-lg md:text-base lg:text-lg font-medium group">
                  <NavLink to="/addBook">Add Book</NavLink>
                  <div className="h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out"></div>
                </li>
              )}
              {userId && role=="seller" &&(
                <li className="text-lg md:text-base lg:text-lg font-medium group">
                  <NavLink to="/profile">Profile</NavLink>
                  <div className="h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out"></div>
                </li>
              )}
              {userId && role=="buyer" && (
                <li className="text-lg md:text-base lg:text-lg font-medium group">
                  <NavLink to="/mycart">MyCart</NavLink>
                  <div className="h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out"></div>
                </li>
              )}
              {userId && role=="admin" && (
                <li className="text-lg md:text-base lg:text-lg font-medium group">
                  <NavLink to="/users">Users</NavLink>
                  <div className="h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out"></div>
                </li>
              )}
             
             {userId && (
                <li className="text-lg md:text-base lg:text-lg font-medium group">
                  <NavLink to="/logout">Logout</NavLink>
                  <div className="h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out"></div>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
