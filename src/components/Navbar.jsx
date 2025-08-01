import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Lock } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    setIsLoggedIn(!!adminToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
  };

  return (
    <nav className="bg-[#FF3600] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img src="/logo-asha.png" alt="Asha Logo" className="w-full h-full object-contain" />
            </div>
            <img src="/logo-text.png" alt="Asha Infracore" className="h-5 w-auto" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 ml-10">
            <Link to="/" className="hover:bg-red-700 px-3 py-2 rounded-md text-lg font-medium transition">
              Home
            </Link>

            {/* Machinery Dropdown */}
            <div className="relative z-50 group">
              <button
                className="px-3 py-2 rounded-md text-lg font-medium transition-all duration-300 ease-in-out hover:bg-red-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white"
              >
                Machinery
              </button>
              <div className="absolute left-0 mt-2 w-56 bg-white text-black rounded-xl shadow-xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 group-hover:visible invisible transition-all duration-300 ease-out origin-top-left ring-1 ring-black/10">
                <Link to="/loaders" className="block px-5 py-3 text-sm hover:bg-orange-100 hover:text-[#FF3600] transition-colors duration-200 rounded-t-xl">
                  Loaders
                </Link>
                <Link to="/attachments" className="block px-5 py-3 text-sm hover:bg-orange-100 hover:text-[#FF3600] transition-colors duration-200">
                  Attachments
                </Link>
                <Link to="/mini-excavators" className="block px-5 py-3 text-sm hover:bg-orange-100 hover:text-[#FF3600] transition-colors duration-200 rounded-b-xl">
                  Mini Excavators
                </Link>
              </div>
            </div>

            {/* Parts Dropdown */}
            <div className="relative z-50 group">
              <button
                className="px-3 py-2 rounded-md text-lg font-medium transition-all duration-300 ease-in-out hover:bg-red-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white"
              >
                Parts
              </button>
              <div className="absolute left-0 mt-2 w-56 bg-white text-black rounded-xl shadow-xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 group-hover:visible invisible transition-all duration-300 ease-out origin-top-left ring-1 ring-black/10">
                <Link to="/parts/tires" className="block px-5 py-3 text-sm hover:bg-orange-100 hover:text-[#FF3600] transition-colors duration-200 rounded-t-xl">
                  Tires
                </Link>
                <Link to="/parts/tracks" className="block px-5 py-3 text-sm hover:bg-orange-100 hover:text-[#FF3600] transition-colors duration-200">
                  Tracks
                </Link>
                <Link to="/parts/batteries" className="block px-5 py-3 text-sm hover:bg-orange-100 hover:text-[#FF3600] transition-colors duration-200">
                  Batteries
                </Link>
                <Link to="/parts/fluids" className="block px-5 py-3 text-sm hover:bg-orange-100 hover:text-[#FF3600] transition-colors duration-200 rounded-b-xl">
                  Fluids
                </Link>
              </div>
            </div>

            <Link to="/services" className="hover:bg-red-700 px-3 py-2 rounded-md text-lg font-medium transition">
              Services
            </Link>
          </div>

          {/* Right CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/get-quote" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 text-sm">
              GET QUOTE
            </Link>
            <Link to="/contact" className="bg-white text-[#FF3600] px-4 py-2 rounded hover:bg-gray-100 text-sm font-medium">
              CONTACT US
            </Link>
            {isLoggedIn ? (
              <>
                <Link to="/admin" className="bg-yellow-400 px-4 py-2 rounded text-black font-medium flex items-center">
                  <User size={16} className="mr-1" />
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="bg-gray-700 px-3 py-2 rounded text-white text-sm hover:bg-gray-800">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/admin-login" className="bg-gray-800 text-white px-4 py-2 rounded flex items-center hover:bg-gray-700 text-sm">
                <Lock size={16} className="mr-1" />
                Admin
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white hover:text-gray-200">
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#FF3600] text-white px-4 pb-4 space-y-2">
          <Link to="/" className="block px-2 py-2 rounded hover:bg-red-700">Home</Link>

          {/* Machinery Mobile */}
          <details className="group">
            <summary className="cursor-pointer px-2 py-2 rounded hover:bg-red-700">Machinery</summary>
            <div className="ml-4">
              <Link to="/loaders" className="block px-2 py-1 text-sm hover:bg-red-800">Loaders</Link>
              <Link to="/attachments" className="block px-2 py-1 text-sm hover:bg-red-800">Attachments</Link>
              <Link to="/mini-excavators" className="block px-2 py-1 text-sm hover:bg-red-800">Mini Excavators</Link>
            </div>
          </details>

          {/* Parts Mobile */}
          <details className="group">
            <summary className="cursor-pointer px-2 py-2 rounded hover:bg-red-700">Parts</summary>
            <div className="ml-4">
              <Link to="/parts/tires" className="block px-2 py-1 text-sm hover:bg-red-800">Tires</Link>
              <Link to="/parts/tracks" className="block px-2 py-1 text-sm hover:bg-red-800">Tracks</Link>
              <Link to="/parts/batteries" className="block px-2 py-1 text-sm hover:bg-red-800">Batteries</Link>
              <Link to="/parts/fluids" className="block px-2 py-1 text-sm hover:bg-red-800">Fluids</Link>
            </div>
          </details>

          <Link to="/services" className="block px-2 py-2 rounded hover:bg-red-700">Services</Link>
          <Link to="/contact" className="block px-2 py-2 rounded hover:bg-red-700">Contact</Link>

          {isLoggedIn ? (
            <>
              <Link to="/admin" className="block px-2 py-2 rounded bg-yellow-500 text-black">
                Admin Dashboard
              </Link>
              <button onClick={handleLogout} className="block w-full text-left px-2 py-2 hover:bg-red-700">
                Logout
              </button>
            </>
          ) : (
            <Link to="/admin-login" className="block px-2 py-2 rounded bg-gray-700 text-white hover:bg-gray-800">
              Admin Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
