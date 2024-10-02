import { useState } from 'react';
import logo from '../assets/logo.png';
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 right-0 bg-white bg-opacity-100 border md:fixed">
      <div className="container flex flex-wrap items-center justify-between px-4 py-2 mx-auto lg:py-4 md:px-10">
        {/* Logo */}
        <Link to="/" className="flex items-center text-2xl font-bold text-black md:text-4xl">
          <img src={logo} alt="logo" className="w-12 h-12 md:w-20 md:h-20" />
          <span className="ml-2">FieldExpert</span>
        </Link>

        {/* Mobile Menu Button */}
        <div className="block md:hidden">
          {!navbarOpen ? (
            <button
              onClick={() => setNavbarOpen(true)}
              className="flex items-center px-3 py-2 text-slate-500 hover:text-black focus:outline-none"
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
          ) : (
            <button
              onClick={() => setNavbarOpen(false)}
              className="flex items-center px-3 py-2 text-slate-500 hover:text-black focus:outline-none"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Menu Links for Larger Screens */}
        <div className={`w-full md:flex md:items-center md:w-auto ${navbarOpen ? "block" : "hidden"}`}>
          <ul className="flex flex-col items-center mt-4 space-y-4 text-black md:space-y-0 md:mt-0 md:flex-row md:space-x-8">
            <li><Link to="/services" className="hover:text-blue-500">සේවාවන්</Link></li>
            <li>
              <button className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-500">පිවිසෙන්න</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
