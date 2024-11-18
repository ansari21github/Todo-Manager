
import React, { useEffect, useState } from "react";
import { GoProjectSymlink } from "react-icons/go";
import { LuListTodo } from "react-icons/lu";
import { LuGithub } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("user");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100); 
    return () => clearTimeout(timer); 
  }, []);

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate("/project-page"); 
    } else {
      navigate("/login"); 
    }
  };

  return (
    <>
      <div className="landing-page h-[85vh] flex flex-col items-center justify-between p-6 bg-gray-100">
        <div
          className={`hero flex flex-col items-center text-center py-16 transition duration-1000 ease-out transform ${
            isVisible ? "opacity-100 translate-y-0 delay-[0ms]" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-4xl text-custom-blue font-bold mb-4">
            Simplify Your Workflow, Organize Your Life
          </h1>
          <p className="text-lg mb-6 text-gray-500">
            Manage your projects, track tasks, and integrate seamlessly with GitHub.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-gren text-lg font-semibold text-white px-6 py-2 rounded shadow hover:bg-white hover:text-gren transition"
          >
            Get Started
          </button>
        </div>

        <div className="features hidden md:grid grid-cols-1 md:grid-cols-3 gap-7 mb-48 w-full max-w-4xl">
          <div
            className={`feature-item flex flex-col items-center text-center p-4 bg-white rounded shadow transition duration-1000 ease-out transform ${
              isVisible
                ? "opacity-100 translate-y-0 delay-[200ms]"
                : "opacity-0 translate-y-10"
            }`}
          >
            <GoProjectSymlink className="text-5xl text-blue-600 mb-4 bg-gray-100 p-2 border rounded-full" />
            <h3 className="text-xl font-semibold mb-2">Organize Projects</h3>
            <p className="text-gray-500">
              Stay on top of your projects with simple yet powerful organization tools.
            </p>
          </div>
          <div
            className={`feature-item flex flex-col items-center text-center p-4 bg-white rounded shadow transition duration-1000 ease-out transform ${
              isVisible
                ? "opacity-100 translate-y-0 delay-[400ms]"
                : "opacity-0 translate-y-10"
            }`}
          >
            <LuListTodo className="text-5xl text-green-500 mb-4 bg-gray-100 p-2 border rounded-full" />
            <h3 className="text-xl font-semibold mb-2">Track Todos</h3>
            <p className="text-gray-500">
              Never miss a task with easy-to-manage to-do tracking.
            </p>
          </div>
          <div
            className={`feature-item flex flex-col items-center text-center p-4 bg-white rounded shadow transition duration-1000 ease-out transform ${
              isVisible
                ? "opacity-100 translate-y-0 delay-[600ms]"
                : "opacity-0 translate-y-10"
            }`}
          >
            <LuGithub className="text-5xl text-purple-500 mb-4 bg-gray-100 p-2 border rounded-full" />
            <h3 className="text-xl font-semibold mb-2">Export to GitHub</h3>
            <p className="text-gray-500">
              Create private gists for project summaries. Easily share updates or securely back up your work.
            </p>
          </div>
        </div>
        <div
          className={`flex md:hidden justify-between gap-6 mt-4 transition duration-1000 ease-out transform ${
            isVisible
              ? "opacity-100 translate-y-0 delay-[700ms]"
              : "opacity-0 translate-y-10"
          }`}
        >
          <GoProjectSymlink className="text-5xl text-blue-600 bg-white p-2 border-2 rounded-full border-gray-200" />
          <LuListTodo className="text-5xl text-green-500 bg-white p-2 border-2 rounded-full border-gray-200" />
          <LuGithub className="text-5xl text-purple-500 bg-white p-2 border-2 rounded-full border-gray-200" />
        </div>
      </div>
      <div
        className={`text-[15px] text-center mt-5 text-gray-600 mb-3 md:mb-0 transition duration-1000 ease-out transform ${
          isVisible ? "opacity-100 translate-y-0 delay-[1000ms]" : "opacity-0 translate-y-10"
        }`}
      >
        © {new Date().getFullYear()} Todozy. All rights reserved. Empowering you
        to organize, track, and achieve your goals.
      </div>
    </>
  );
}

export default Home;
