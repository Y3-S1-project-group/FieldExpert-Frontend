import { useState } from 'react'
import logo from '../assets/logo.png'
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom"

const Navbar = () => {

  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    // <nav className="fixed top-0 left-0 right-0 mx-auto bg-white">
    //   <div className="flex flex-wrap items-center justify-between px-10">
    //     <div>
    //       <Link className="flex flex-wrap items-center text-4xl font-bold text-black">FieldExpert
    //         <img src={logo} alt="logo" style={{ width: 100, height: 100 }} />
    //       </Link>
    //     </div>
    //     <div className='block md:hidden mobile-menu'>
    //     { !navbarOpen ? (
    //         <button onClick={() => setNavbarOpen(true)} className='flex items-center border-black border-rounded'>
    //         <Bars3Icon className='w-5 h-5'/>
    //       </button>

    //       ) : (
    //         <button onClick={() => setNavbarOpen(true)} className='flex items-center border-black border-rounded'>
    //         <XMarkIcon className='w-5 h-5'/>
    //       </button>
    //       )}
    //     </div>
    //     <div className='hidden md:block md:w-auto' id='navbar'>
    //       <ul className="flex text-black md:flex-wrap md:space-x-10 md:text-2xl">
    //         <li>Services</li>
    //         <li><button>Sign In</button></li>
    //       </ul>
    //     </div>
    //   </div>
    //   {navbarOpen ? <MenuOverlay/> : null}
    // </nav>
    <nav className="fixed top-0 left-0 right-0 z-10 mx-auto bg-white bg-opacity-100 border">
      <div className="container flex flex-wrap items-center justify-between px-10 py-2 mx-auto lg:py-4">
        <Link className="flex flex-wrap items-center text-4xl font-bold text-black">FieldExpert
          <img src={logo} alt="logo" style={{ width: 100, height: 100 }} />
        </Link>
        <div className="block mobile-menu md:hidden">
          {!navbarOpen ? (
            <button
              onClick={() => setNavbarOpen(true)}
              className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
            >
              <Bars3Icon className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => setNavbarOpen(false)}
              className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          )}
        </div>
        <div className="hidden menu md:block md:w-auto" id="navbar">
          <ul className="flex text-black md:flex-wrap md:space-x-10 md:text-xl">
            <li>Services</li>
            <li><button>Sign In</button></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar