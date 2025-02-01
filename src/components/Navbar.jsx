import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import "./Navbar.css";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <Link to="/">Nudio</Link>
      </h1>
      <div className="space-x-4">
        {user ? (
          <>
            <span className="text-gray-600">Welcome, {user.email}!</span>
            <button onClick={logout} className="text-red-500">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-orangered-500 hover:underline">
              Login
            </Link>
            <Link to="/register" className="text-orangered-500 hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
