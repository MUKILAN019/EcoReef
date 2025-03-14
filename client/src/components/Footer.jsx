import React, { useState, useEffect } from "react";

const Footer = () => {
  const [footer, setFooter] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setFooter(true);
    }
  }, []);

  return (
    <footer className="bg-gray-800 from-white to-ocean-50 pt-20 pb-10 px-6 relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Brand Section */}
          <div>
            <a href="#" className="flex items-center gap-2 mb-6">
              <div className="h-10 w-10 from-coral-400 via-ocean-400 to-sunset-400 flex items-center justify-center text-blue-400 font-bold text-lg shadow-lg border-3 border-blue-600">
                E
              </div>
              <span className="text-xl font-semibold text-gray-400">EcoReef</span>
            </a>
            <p className="text-gray-300 mb-6">
              Exploring the beauty and wonder of coral reefs through immersive technology.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-400 mb-6">Navigation</h3>
            <ul className="space-y-3">
              {footer ? (
                <>
                  <li>
                    <a href="/create" className="text-gray-600 hover:text-blue-500 transition-colors">
                      Create
                    </a>
                  </li>
                  <li>
                    <a href="/store" className="text-gray-600 hover:text-blue-500 transition-colors">
                      Store
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <a href="/signup" className="text-gray-600 hover:text-blue-500 transition-colors">
                      Signup
                    </a>
                  </li>
                  <li>
                    <a href="/login" className="text-gray-600 hover:text-blue-500 transition-colors">
                      Login
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-400 mb-6">Contact Us</h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                📍 Kalasalingam Academy of Research and Education, Krishnankoil, Srivilliputhur, Tamil Nadu
              </li>
              <li className="flex items-start gap-3">
                📞 +91 6382767198
              </li>
              <li className="flex items-start gap-3">
                ✉️ Dhanush@coralreef.com
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} EcoReef. All rights reserved.
          </p>
          <div className="flex space-x-6">
            {["Privacy Policy", "Terms of Service", "Cookies"].map((item, i) => (
              <a key={i} href="#" className="text-gray-300 text-sm hover:text-gray-700 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
