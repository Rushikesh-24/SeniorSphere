
import Link from 'next/link';
import React from 'react';
import { FaTimes } from 'react-icons/fa';

const SideNav = ({ isOpen, toggleSideNav }) => {
  return (
    <div className={`sidenav fixed w-full -mt-2 h-full bg-gray-400 text-white transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="close-btn text-2xl p-4 cursor-pointer" onClick={toggleSideNav}>
        <FaTimes />
      </div>
      {/* Add your navigation links here */}
      <a href="/" className="block px-4 py-2 hover:bg-gray-500">Home</a>
      <a href="/about" className="block px-4 py-2 hover:bg-gray-500">About</a>
      <Link href="/Contact" className="block px-4 py-2 hover:bg-gray-500">Contact</Link>
    </div>
  );
};

export default SideNav;



