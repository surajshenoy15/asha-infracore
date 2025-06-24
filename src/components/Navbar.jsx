// components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-[#FF3600] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                    <img src="/logo asha.png" alt="Asha Infracore Logo" className="w-full h-full object-contain" />
                </div>

              <img src="/logo text.png" alt="Asha Infracore" className="h-5 w-auto" />

            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="hover:bg-red-700 px-3 py-2 rounded-md text-xl font-medium transition-colors">
                Home
              </Link>
              <div className="relative group">
                <button className="hover:bg-red-700 px-3 py-2 rounded-md text-xl font-medium transition-colors">
                  Machinery 
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link to="/loaders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Loaders</Link>
                </div>
              </div>
              <Link to="/attachments" className="hover:bg-red-700 px-3 py-2 rounded-md text-xl font-medium transition-colors">
                Attachments
              </Link>
              <Link to="/contact" className="hover:bg-red-700 px-3 py-2 rounded-md text-xl font-medium transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
              GET QUOTE
            </button>
            <Link to="/contact" className="bg-white text-red-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors">
              CONTACT US
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-red-700 focus:outline-none"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-red-700">
            <Link to="/" className="hover:bg-red-800 block px-3 py-2 rounded-md text-base font-medium">Home</Link>
            <Link to="/loaders" className="hover:bg-red-800 block px-3 py-2 rounded-md text-base font-medium">Loaders</Link>
            <Link to="/attachments" className="hover:bg-red-800 block px-3 py-2 rounded-md text-base font-medium">Attachments</Link>
            <Link to="/contact" className="hover:bg-red-800 block px-3 py-2 rounded-md text-base font-medium">Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;