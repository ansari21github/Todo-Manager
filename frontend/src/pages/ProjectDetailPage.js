
import React, { useEffect, useState } from "react";
import { useParams , Link} from "react-router-dom";
import {
  getProjectDetails,
  createTodo,
  updateTodo,
  deleteTodo,
  updateProjectTitle,
} from "../api/projectApi";
import { exportGist } from "../api/githubGist";
import TodoForm from "../components/TodoForm";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IoArrowBackOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [todoToEdit, setTodoToEdit] = useState(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const [exportModal, setExportModal] = useState(false);
  const [gistData, setGistData] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getProjectDetails(projectId);
        setProject(data);
        setNewTitle(data.title);
        setLoading(false);
      } catch (err) {
        setError("Failed to load project details.");
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  const handleAddTodo = async (newTodo) => {
    try {
      const createdTodo = await createTodo(projectId, newTodo);
      setProject((prevProject) => ({
        ...prevProject,
        todos: [...prevProject.todos, createdTodo],
      }));
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  const handleUpdateTodo = async (todoId, updatedData) => {
    try {
      const updatedTodo = await updateTodo(projectId, todoId, updatedData);
      setProject((prevProject) => ({
        ...prevProject,
        todos: prevProject.todos.map((todo) =>
          todo._id === todoId ? updatedTodo : todo
        ),
      }));
      setTodoToEdit(null);
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      await deleteTodo(projectId, todoId);
      setProject((prevProject) => ({
        ...prevProject,
        todos: prevProject.todos.filter((todo) => todo._id !== todoId),
      }));
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  const handleEditTitle = () => {
    setIsEditingTitle(true);
  };

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleSaveTitle = async () => {
    try {
      if (!newTitle || newTitle.trim() === "") {
        throw new Error("Title cannot be empty");
      }

      const updatedProject = await updateProjectTitle(projectId, newTitle);
      setProject((prev) => ({
        ...prev,
        title: updatedProject.project.title,
      }));
      setIsEditingTitle(false);
    } catch (error) {
      console.error("Failed to update project title:", error);
      alert("Failed to update project title. Please try again.");
    }
  };

  const handleExportGist = async () => {
    setIsExporting(true);
    try {
      if (!project || !project.title || !Array.isArray(project.todos)) {
        alert("Project data is incomplete. Cannot export Gist.");
        setIsExporting(false);
        return;
      }
      if (project.todos.length === 0) {
        alert("No todos available to export.");
        setIsExporting(false);
        return;
      }
      const { url } = await exportGist(project.title, project.todos);
      setGistData({ url });
      setExportModal(true);
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Failed to export Gist. Please try again.";
      alert(errorMessage);
    } finally {
      setIsExporting(false);
    }
  };

  const closeModal = () => {
    setExportModal(false);
    setGistData(null);
  };

  if (loading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  return (
    <>
      <div className=" p-8 bg-gray-100 min-h-screen">
        <div>
          <Link to="/project-page"><IoArrowBackOutline className="text-4xl mb-2 bg-white border-2 rounded-full border-gray-200" /></Link>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {isEditingTitle ? (
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newTitle}
                onChange={handleTitleChange}
                className="border p-2 rounded w-full max-w-md"
              />
              <button
                onClick={handleSaveTitle}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          ) : (
            <h1 className="text-3xl font-bold">
              {project.title}
              <button onClick={handleEditTitle} className="ml-4 text-blue-500">
                <MdOutlineModeEdit />
              </button>
            </h1>
          )}
          <button
            onClick={handleExportGist}
            disabled={isExporting}
            className={`bg-green-500 text-white px-4 py-2 rounded ${
              isExporting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isExporting ? "Exporting..." : "Export Gist"}
          </button>
        </div>
        <TodoForm
          onSubmit={handleAddTodo}
          todoToEdit={todoToEdit}
          onUpdate={handleUpdateTodo}
        />
        <h1 className="text-2xl font-bold mt-5">Todos</h1>
        <ul className="mt-6">
          {project.todos.map((todo) => (
            <li
              key={todo._id}
              className={`p-4 rounded shadow mb-2 ${
                todo.status === "completed" ? "bg-green-100" : "bg-gray-100"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={todo.status === "completed"}
                    onChange={() =>
                      handleUpdateTodo(todo._id, {
                        status:
                          todo.status === "completed" ? "pending" : "completed",
                      })
                    }
                  />
                  <span
                    className={`ml-2 ${
                      todo.status === "completed" ? "line-through" : ""
                    }`}
                  >
                    {todo.description}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="text-blue-500 text-[21px]"
                    onClick={() => setTodoToEdit(todo)}
                  >
                    <MdOutlineModeEdit />
                  </button>
                  <button
                    className="text-red-500 text-[21px]"
                    onClick={() => handleDeleteTodo(todo._id)}
                  >
                    <MdOutlineDeleteOutline />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="text-[15px] text-center text-gray-600 mt-5 md:mb-0">
        © {new Date().getFullYear()} Todozy. All rights reserved. Empowering you
        to organize, track, and achieve your goals.
      </div>
      {/* Modal */}
{exportModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="relative bg-white p-6 rounded shadow-md text-center w-96">
      <button
        onClick={closeModal}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
      >
        <IoClose />
      </button>
      <h2 className="text-xl font-bold mb-4">Gist Exported Successfully</h2>
      <p className="mb-4">Your project has been exported as a Gist. You can view it or download it as Markdown.</p>
      <div className="flex justify-center space-x-4">
        <a
          href={gistData.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          View Gist
        </a>
        <a
          href={`${gistData.url}/download`}
          download
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Download as Markdown
        </a>
      </div>
    </div>
  </div>
)}

    </>
  );
};

export default ProjectDetailPage;
