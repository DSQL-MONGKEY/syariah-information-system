import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../assets"; // Ganti dengan path logo yang sesuai

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Cek apakah ada token JWT di localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    // Menghapus token dari localStorage
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login"); // Redirect ke halaman login setelah logout
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-300 sticky top-0 z-20">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo di sebelah kiri */}
        <div className="flex items-center space-x-4">
          <Link to="/">
            <img src={Logo} alt="Logo" className="w-12 h-auto" />
          </Link>

          {/* Menu Navigasi di kiri */}
          <div className="hidden md:flex space-x-6">
            <Link
              to="/dashboard"
              className="text-gray-800 font-medium hover:text-blue-600 transition duration-300">
              Dashboard
            </Link>
            <Link
              to="/dps"
              className="text-gray-800 font-medium hover:text-blue-600 transition duration-300">
              DPS
            </Link>
            <Link
              to="/lrsa"
              className="text-gray-800 font-medium hover:text-blue-600 transition duration-300">
              LRSA
            </Link>
            <Link
              to="/regulasi"
              className="text-gray-800 font-medium hover:text-blue-600 transition duration-300">
              Regulasi
            </Link>
            <Link
              to="/riset"
              className="text-gray-800 font-medium hover:text-blue-600 transition duration-300">
              Riset
            </Link>
            <Link
              to="/buletin"
              className="text-gray-800 font-medium hover:text-blue-600 transition duration-300">
              Buletin
            </Link>
          </div>
        </div>

        {/* Menu kanan (About, Profile, Login, Logout) */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/about"
            className="text-gray-800 font-medium hover:text-blue-600 transition duration-300">
            About
          </Link>
          <Link
            to="/profile"
            className="text-gray-800 font-medium hover:text-blue-600 transition duration-300">
            Profile
          </Link>
          {/* Jika sudah login, tampilkan tombol logout */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-gray-800 font-medium hover:text-blue-600 transition duration-300">
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="text-gray-800 font-medium hover:text-blue-600 transition duration-300">
              Login
            </Link>
          )}
        </div>

        {/* Hamburger Menu untuk Mobile */}
        <div className="md:hidden flex items-center" onClick={toggleMenu}>
          <button className="text-gray-800 text-2xl">&#9776;</button>
        </div>
      </div>

      {/* Menu dropdown saat mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md flex flex-col space-y-4 py-4 px-6">
          <Link
            to="/dashboard"
            className="text-gray-800 font-medium hover:text-blue-600 transition duration-300">
            Dashboard
          </Link>
          <Link
            to="/dps"
            className="text-gray-800 font-medium hover:text-blue-600 transition duration-300">
            DPS
          </Link>
          <Link
            to="/lrsa"
            className="text-gray-800 font-medium hover:text-blue-600 transition duration-300">
            LRSA
          </Link>
          <Link
            to="/regulasi"
            className="text-gray-800 font-medium hover:text-blue-600 transition duration-300">
            Regulasi
          </Link>
          <Link
            to="/riset"
            className="text-gray-800 font-medium hover:text-blue-600 transition duration-300">
            Riset
          </Link>
          <Link
            to="/buletin"
            className="text-gray-800 font-medium hover:text-blue-600 transition duration-300">
            Buletin
          </Link>
          {/* Jika sudah login, tampilkan tombol logout */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-gray-800 font-medium hover:text-blue-600 transition duration-300">
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="text-gray-800 font-medium hover:text-blue-600 transition duration-300">
              Login
            </Link>
          )}
          <Link
            to="/profile"
            className="text-gray-800 font-medium hover:text-blue-600 transition duration-300">
            Profile
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
