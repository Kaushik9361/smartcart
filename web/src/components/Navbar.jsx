import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  const navItems = ["Home", "Products", "Categories", "Deals", "Contact"];

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    checkAuth(); // check on mount
  }, []);

  useEffect(() => {
    checkAuth(); // check on route change
  }, [location]);

  return (
    <header className="sticky top-0 z-50 bg-white shadow border-b">
      <nav className="relative max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">

          {/* Left - Brand */}
          <Link to="/" className="font-bold text-xl text-blue-600">
            SmartCart
          </Link>

          {/* Center - Nav Links */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-8">
            {navItems.map((item) => (
              <Link
                key={item}
                to={`/${item === "Home" ? "" : item.toLowerCase()}`}
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Right - Login */}
          <div className="hidden md:block">
            {!isLoggedIn && (
              <Link
                to="/login"
                className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item}
                to={`/${item === "Home" ? "" : item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="block text-gray-700"
              >
                {item}
              </Link>
            ))}

            {!isLoggedIn && (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block text-center bg-blue-600 text-white py-2 rounded"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
