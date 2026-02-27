import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const footerLinks = {
    "Shop": ["All Products", "New Arrivals", "Best Sellers", "On Sale"],
    "Categories": ["Electronics", "Fashion", "Home & Garden", "Sports"],
    "Company": ["About Us", "Careers", "Press", "Blog"],
    "Support": ["Help Center", "Contact Us", "Shipping", "Returns"],
    "Legal": ["Privacy", "Terms", "Security", "Cookies"]
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">SC</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">SmartCart</h2>
                <p className="text-sm text-blue-400 font-medium">Elevate Your Shopping</p>
              </div>
            </div>
            <p className="text-gray-400 mb-8 max-w-md leading-relaxed">
              Experience the future of online shopping with AI-powered recommendations, 
              seamless checkout, and premium quality products curated just for you.
            </p>
            
            {/* Newsletter */}
            <div className="mb-8">
              <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-grow px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 backdrop-blur-sm"
                />
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 whitespace-nowrap shadow-md">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-white font-semibold text-lg mb-6 relative inline-block">
                {section}
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></span>
              </h3>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link}>
                    {link === "Contact Us" ? (
                      <Link
                        to="/contact"
                        className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center group"
                      >
                        <span className="w-0 group-hover:w-2 h-0.5 bg-blue-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                        {link}
                      </Link>
                    ) : (
                      <span className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center group cursor-pointer">
                        <span className="w-0 group-hover:w-2 h-0.5 bg-blue-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                        {link}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social & Payment */}
        <div className="mt-16 pt-10 border-t border-gray-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            
            {/* Social Icons */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400">Follow us:</span>
              <div className="flex space-x-3">
                {["f", "𝕏", "📷", "in", "📺"].map((icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-10 h-10 bg-gray-800/50 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-all duration-300 backdrop-blur-sm"
                  >
                    <span className="text-lg">{icon}</span>
                  </a>
                ))}
              </div>
            </div>
            
            {/* Payment Methods */}
            <div className="flex items-center space-x-6">
              <span className="text-gray-400">We accept:</span>
              <div className="flex space-x-2">
                {["💳", "🏦", "💰", "💎"].map((icon, index) => (
                  <span
                    key={index}
                    className="text-xl opacity-80 hover:opacity-100 transition-opacity"
                  >
                    {icon}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800/30">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <p className="text-gray-500 text-center md:text-left">
              © 2026 SmartCart Technologies. All rights reserved.
            </p>
            
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-500 hover:text-blue-400 transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
            </div>
            
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-500">System Status: All Operational</span>
            </div>
          </div>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 mt-6 pt-6 border-t border-gray-800/20">
            {["🔒 SSL Secure", "⭐ 4.9/5 Rating", "🚚 Free Shipping", "⏱️ 24/7 Support"].map((badge) => (
              <span
                key={badge}
                className="px-3 py-1.5 bg-gray-800/30 text-gray-400 text-xs rounded-full border border-gray-700/50"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;