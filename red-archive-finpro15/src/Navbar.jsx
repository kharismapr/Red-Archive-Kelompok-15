import { Link } from 'react-router-dom';
import { useState } from 'react';
import Logo from './assets/Logo.svg';
import Account from './assets/account.svg';
import Button from './assets/hambutton.svg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const name = "User"; // Ganti sesuai data pengguna

  return (
    <nav className="bg-[#BE3C44] text-white sticky top-0 z-50 px-8 py-3 flex items-center justify-between shadow-md border-b border-white font-semibold">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img src={Logo} alt="RedArchive Logo" className="h-10 w-auto" />
      </div>

      {/* Search Bar */}
      <div className="flex-grow flex items-center justify-center">
        <form className="w-full max-w-sm">
          <input
            type="text"
            placeholder="Search on RedArchive"
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 w-full text-black"
          />
        </form>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 items-center">
        <Link to="/home" className="hover:underline">Film</Link>
        <Link to="/home" className="hover:underline">Forum</Link>
        <Link to="/profile" className="flex items-center space-x-2 hover:underline group">
          <img src={Account} alt="User Profile" className="h-6 w-6 cursor-pointer" />
          <span>{name}</span>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          className="focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        > <img src={Button} alt="Hamburger Button" className="w-6 h-6 cursor-pointer ml-4" />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#BE3C44] text-white px-4 py-2 space-y-4 shadow-md absolute top-full left-0 w-full font-bold">
          <Link to="/home" className="block hover:text-gray-300">Film</Link>
          <Link to="/home" className="block hover:text-gray-300">Forum</Link>
          <div className="flex items-center space-x-2">
            <img src={Account} alt="User Profile" className="h-6 w-6" />
            <span>{name}</span>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;