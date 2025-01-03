"use client";
import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-transparent w-full overflow-hidden">
      <div className="w-full px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <div className="text-4xl font-bold text-blue-700">SkillShare</div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-10 text-blue-700 font-medium">
          <li>
            <a href="#" className="hover:text-blue-500">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-500">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-500">
              Services
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-500">
              Resources
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-500">
              Contact
            </a>
          </li>
        </ul>

        {/* Buttons */}
        <div className="hidden md:flex space-x-4">
          <button className="px-4 py-2 border text-blue-700 rounded-3xl hover:bg-blue-500 hover:text-white">
            <a href="/login">Login</a>
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-3xl hover:bg-white hover:text-blue-700 hover:border">
            <a href="/signup">Signup</a>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-blue-700 focus:outline-none"
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
        className={`md:hidden fixed top-0 left-0 w-full h-full bg-blue-100 z-50 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <ul className="flex flex-col items-center space-y-4 py-4 text-blue-700 font-medium">
          <li>
            <a href="#" className="hover:text-blue-500">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-500">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-500">
              Services
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-500">
              Resources
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-500">
              Contact
            </a>
          </li>
          <div className="space-y-2 w-3/4">
            <button className="w-full px-4 py-2 border border-blue-700 text-blue-700 rounded-lg hover:bg-blue-700 hover:text-white">
              Login
            </button>
            <button className="w-full px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800">
              Signup
            </button>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
