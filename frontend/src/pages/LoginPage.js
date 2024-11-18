import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/userApi";
import { AuthContext } from "../context/AuthContext";


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await loginUser({ email, password });
      console.log(userData.token);
      localStorage.setItem("token", userData.token);
      login(userData);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
  <>
    <div className="flex flex-col justify-center gap-32 items-center  h-[75vh] bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow rounded w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">Login to your account </h1>
        
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-1">
            Email address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gren text-white py-2 rounded"
        >
          Login
        </button>
        <p className="text-md text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-custom-blue hover:underline">
            Signup
          </Link>
        </p>
      </form>
    </div>
    <div className="text-[15px] text-center text-word mt-4 md:mb-0">
          © {new Date().getFullYear()} Todozy. All rights reserved. Empowering you to organize, track, and achieve your goals.
        </div>
    </>
    
  );
};

export default LoginPage;


