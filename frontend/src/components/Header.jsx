import React, { useState } from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
const Header = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <>
      <div className="w-full  text-gray-900 bg-gradient-to-br from-transparent to-yellow-100">
        <nav className="flex justify-between items-center py-8 px-6 mx-auto max-w-screen-xl md:px-12 lg:px-16 xl:px-24">
          <button onClick={toggleMenu} className="sidebar-open block md:hidden relative z-30 focus:outline-none transform  -translate-x-1/2 -translate-y-1/2 active:scale-75 transition-transform">
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
          <a to=" " className="text-3xl md:text-4xl font-bold tracking-wide">
            Book<span className="text-yellow-500">Art</span>
          </a>
          <div className={`${isOpen ?"hidden": "block"} menu-resposive fixed flex inset-0 transition-all bg-white/70 backdrop-blur-xl z-20 md:static md:bg-transparent md:flex items-center justify-center space-y-8 md:space-y-0 flex-col md:flex-row md:space-x-8 -mt-56 md:mt-0 `}>
            <ul className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6 lg:md:-x-8">
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
              <li className="text-lg md:text-base lg:text-lg font-medium group">
                <NavLink to="/login">Login</NavLink>
                <div className="h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out"></div>
              </li>
              <li className="text-lg md:text-base lg:text-lg font-medium group">
                <NavLink to="/signup">Signup</NavLink>
                <div className="h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out"></div>
              </li>
            </ul>
          </div>
          <button
            onClick={toggleSearch}
            className="search-menu flex justify-center items-center h-12 px-5 font-medium text-gray-100 bg-yellow-500 whitespace-nowrap hover:bg-yellow-600 hover:text-white
    rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </nav>
        <div
          className={`${isSearchOpen ? "hidden" : "block"} search-form  flex items-center space-x-4 px-6 mx-auto max-w-screen-xl md:px-12 lg:px-16 xl:px-24 
  transform duration-500 transition-all`}
        >
          <div className="flex bg-gray-200 p-2 w-full space-x-2 rounded-lg items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 opacity-75 ml-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              className="w-full bg-gray-50 outline-none border-transparent focus:border-transparent focus:ring-0 rounded-lg text-sm sm:text-base"
              type="text"
              placeholder="Book name or keyword..."
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
