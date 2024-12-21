"use client";
import React from "react";

const Navbar = () => {
    const navItems = [
        { name: 'Schedule Meets', path: '/' },
        { name: 'Upload Videos', path: '/about' },
        { name: 'Community Post', path: '/services' },
        { name: 'Login', path: '/projects' },
        { name: 'Logout', path: '/contact' },
      ];
  return (
    <aside className="w-72 h-screen bg-gray-1000 text-white fixed top-0 left-0">
    <div className="p-6 text-4xl font-bold border-b border-gray-700 text-center">
      SkillShare
    </div>
    <nav className="mt-4 text-2xl text-center">
      <ul>
        {navItems.map((item, index) => (
          <li key={index} className="mb-2">
            <a 
              href={item.path} 
              className="block p-4 rounded-lg hover:bg-gray-700 transition duration-300"
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  </aside>
  );
};

export default Navbar;