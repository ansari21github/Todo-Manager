import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./components/Header";
import { AuthProvider } from "./context/AuthContext";
import ProjectForm from "./components/ProjectForm";
import Home from "./pages/Home";
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="bg-gray-50 min-h-screen">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
            <Route path="/" element={<Home/>} />
              <Route path="/project-page" element={<ProjectsPage />} />
              <Route path="/create-project" element={<ProjectForm />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
