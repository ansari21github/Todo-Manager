
import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProjects } from "../api/projectApi";
import ProjectCard from "../components/ProjectCard";
import { AuthContext } from "../context/AuthContext"; 

const ProjectsPage = () => {
  const { user, logout } = useContext(AuthContext); 
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      if (!user) {
        setProjects([]);
        return;
      }
      try {
        const data = await getProjects(user.token); 
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [user]);

  const handleCreateProjectClick = () => {
    if (!user) {
      navigate("/login"); 
      return;
    }
    navigate("/create-project");
  };

  return (
    <>
      <div className="p-8 bg-gray-100 min-h-[90vh]">
        <h1 className="text-3xl font-bold mb-6">Projects</h1>
        {user ? (
          <>
            <button
              onClick={handleCreateProjectClick}
              className="inline-block bg-gren text-white py-2 px-4 rounded mb-4"
            >
              Create New Project
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          </>
        ) : (
          <p className="text-gren">Please log in to view projects.</p>
        )}
      </div>
      <div className="text-[15px] text-center text-gray-600 mt-5 md:mb-0">
        © {new Date().getFullYear()} Todozy. All rights reserved. Empowering you
        to organize, track, and achieve your goals.
      </div>
    </>
  );
};

export default ProjectsPage;
