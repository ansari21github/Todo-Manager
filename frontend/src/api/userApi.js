import axios from "axios";

export const loginUser = async (credentials) => {
  const { data } = await axios.post("https://todozy-backend.onrender.com/api/users/login", credentials);
  return data;
};

export const registerUser = async (userData) => {
  const { data } = await axios.post("https://todozy-backend.onrender.com/api/users/register", userData);
  return data;
};
