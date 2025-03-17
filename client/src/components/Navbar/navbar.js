"use client";
import React, { useState } from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={`bg-[#a4abb4] w-full overflow-hidden text-black ${montserrat.className}`}
    >
      <div className="w-full px-12 py-10 flex items-center justify-between">
        {/* Logo */}
        <div className="text-4xl font-semibold">SkillShare</div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-10 font-medium">
          <li>
            <a href="#" className="hover:text-gray-400">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-400">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-400">
              Services
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-400">
              Resources
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-400">
              Contact
            </a>
          </li>
        </ul>

        {/* Buttons */}
        <div className="hidden md:flex space-x-4 text-black">
          <button className="px-4 py-2 border border-black text-black rounded-3xl ">
            <a href="/login">Login</a>
          </button>
          <button className="px-4 py-2 border border-black text-black rounded-3xl ">
            <a href="/signup">Signup</a>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-300 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <span className="text-2xl">✖️</span>
          ) : (
            <span className="text-2xl">☰</span>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-full bg-[#1f1f1f] z-50 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <ul className="flex flex-col items-center space-y-4 py-4 text-gray-300 font-medium">
          <li>
            <a href="#" className="hover:text-gray-400">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-400">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-400">
              Services
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-400">
              Resources
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-400">
              Contact
            </a>
          </li>
          <div className="space-y-2 w-3/4 text-black">
            <button className="w-full px-4 py-2 border border-black text-black rounded-lg hover:bg-gray-500 hover:text-white">
              login
            </button>
            <button className="w-full px-4 py-2 bg-black text-black rounded-lg hover:bg-gray-600">
              Signup
            </button>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
