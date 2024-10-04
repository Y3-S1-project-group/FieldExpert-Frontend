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
              className="flex items-center px-3 py-2 text-slate-500 hover:text-black focus:outline-none">
              <Bars3Icon className="w-6 h-6" />
            </button>
          ) : (
            <button
              onClick={() => setNavbarOpen(false)}
              className="flex items-center px-3 py-2 text-slate-500 hover:text-black focus:outline-none">
              <XMarkIcon className="w-6 h-6" />
            </button>
          )}
        </div>
        <div className="hidden menu md:block md:w-auto" id="navbar">
          <ul className="flex text-black md:flex-wrap md:space-x-10 md:text-xl">
          <li><Link to="/sales">සේවාවන්</Link></li>
          <li><Link to="/allSale">විකුණුම්</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
