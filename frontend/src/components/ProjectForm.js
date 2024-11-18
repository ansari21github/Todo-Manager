import React, { useState } from "react";
import { createProject } from "../api/projectApi";
import { useNavigate } from "react-router-dom";

const ProjectForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const projectData = { title, description };
      await createProject(projectData); 
      navigate("/project-page"); 
    } catch (err) {
      setError(err.response?.data?.message || "Project creation failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Create New Project</h2>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 mb-2">
            Project Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 mb-2">
            Project Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gren text-white py-2 rounded"
        >
          Create Project
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
