import React, { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";


export function cn(...classes) {
  return twMerge(classes.filter(Boolean).join(" "));
}

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-10",
        scrolled ? "backdrop-blur-lg shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <div className="h-10 w-10 from-coral-400 via-ocean-400 to-sunset-400 flex items-center justify-center text-blue-400 font-bold text-lg shadow-lg border-3 border-blue-600">
              E
            </div>
            <span className="text-lg font-medium text-blue-700">EcoReef</span>
          </a>
          <div className="flex items-center gap-8">
          {/* Navigation */}
          <button className="btn btn-info">Login</button>

          {/* CTA Button */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md transition hover:bg-blue-700"
            >
              Get Started
            </a>
          </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
