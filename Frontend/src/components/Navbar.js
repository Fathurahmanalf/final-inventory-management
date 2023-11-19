import { Link } from "react-router-dom";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/index.css";
import { GoHomeFill } from "react-icons/go";
import { FaDatabase } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";
import { IoLogOut } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";

const Navbar = () => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    // Navbar
    <nav>
      <div className="drawer">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle"/>
        <div className="drawer-content m-7 ">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-outline text-white text-lg font-semibold"
          >
            <IoMdMenu />
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content text-lg font-semibold">
            {/* Sidebar content here */}
            <li><Link to="/dashboard" className="text-black my-3 border-solid border-2 border-sky-800"> <GoHomeFill /> Home </Link></li>
            <li><Link to="/product" className="text-black my-3 border-solid border-2 border-sky-800"> <FaDatabase /> Products </Link></li>
            <li><a href="https://kelompok-sipaling.vercel.app/" className="text-black my-3 border-solid border-2 border-sky-800"> <RiTeamFill /> Team </a></li>
            <li><a href="#" className="text-black my-3 border-solid border-2 border-sky-800" onClick={handleLogout}> <IoLogOut /> Logout</a></li>
          </ul>
        </div>
      </div>
    </nav>

    // <nav className="bg-transparent p-4">
    //   <div className="container mx-auto flex justify-between items-center">
    //     {/* Logo */}
    //     <div className="flex items-center">
    //       <img src="/logo.png" alt="Logo" className="w-20 h-10 mr-2" />
    //     </div>

    //     {/* Navigation Links */}
    //     <ul className="flex space-x-4 justify-center">
    //       <li><Link to="/dashboard" className="text-white">Home</Link></li>
    //       <li><Link to="/product" className="text-white">Products</Link></li>
    //       <li><a href="#" className="text-white">About</a></li>
    //       <li><a href="#" className="text-white">Contact</a></li>
    //       <li><a href="https://kelompok-sipaling.vercel.app/" className="text-white">Team</a></li>
    //     </ul>

    //     {/* Logout Link */}
    //     <ul className="flex space-x-4">
    //       <li><a href="#" className="text-white" onClick={handleLogout}>Logout</a></li>
    //     </ul>
    //   </div>
    // </nav>
  );
};

export default Navbar;
