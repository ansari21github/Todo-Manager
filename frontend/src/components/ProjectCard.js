
import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  const completedTodos = project.todos.filter((todo) => todo.status === "completed").length;
  const totalTodos = project.todos.length;

  const formattedDate = new Date(project.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  return (
    <div className="flex flex-col space-y-4 bg-gray-100 p-4 rounded shadow">
      <div>
      <h2 className="text-xl font-semibold">{project.title}</h2>
      </div>
      <div>
      <p className="text-gray-600">{project.description}</p>
      <p className="text-gray-500 font-sm">
        Progress: {completedTodos}/{totalTodos} todos completed
      </p>
      <p className="text-gray-500 text-sm">
        Created: {formattedDate}
      </p>
      <Link
        to={`/projects/${project._id}`}
        className="text-gren hover:underline"
      >
        View 
      </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
