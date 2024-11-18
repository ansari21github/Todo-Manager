import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/userApi";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ name, email, password });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <>
    <div className="flex flex-col justify-center items-center gap-20 h-[75vh] bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow rounded w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">Create your account</h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full border px-3 py-2 rounded"
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
            placeholder="Enter your password"
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gren text-white py-2 rounded"
        >
          Signup
        </button>
        <p className="text-md text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-gren hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
    <div className="text-[15px] text-center text-word mt-4 md:mb-0">
          {/* © Workable Technology Limited 2012-2024 */}
          © {new Date().getFullYear()} Todozy. All rights reserved. Empowering you to organize, track, and achieve your goals.
        </div>
    </>
  );
};

export default SignupPage;
