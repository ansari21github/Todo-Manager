
import axios from "axios";

export const exportGist = async (title, todos) => {
  try {
    // const response = await axios.post("http://localhost:5000/api/export-gist", {
    const response = await axios.post("https://todozy-backend.onrender.com/api/export-gist", {
      title,
      todos,
    });
    console.log("Gist exported successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error exporting Gist:", error.response?.data || error.message);
    throw error;
  }
};
