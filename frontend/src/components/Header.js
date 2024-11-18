import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  console.log(user);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-custom-blue p-6 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <Link to="/"><span className="text-custom-blue bg-white text-2xl border-4 px-2 py-1 border-gray-300 rounded-lg hover:text-white hover:bg-custom-blue" >Todozy</span></Link>
      </h1>
      <nav className="flex gap-4">
        {user ? (
          <>
            <span className="text-lg font-medium">{user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline text-lg">
              Login
            </Link>
            <Link to="/signup" className="hover:underline text-lg">
              Signup
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
