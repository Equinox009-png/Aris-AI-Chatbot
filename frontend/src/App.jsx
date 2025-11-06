import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import Sidebar from "./components/sidebar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Apply dark class to <html> for Tailwind
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar is moved inside Home, so removed here */}

      {/* Main Content */}
      <div className="flex-1 p-6 text-gray-900 dark:text-gray-100">
        <Routes>
          <Route
            path="/"
            element={<Home darkMode={darkMode} setDarkMode={setDarkMode} />}
          />
          <Route
            path="/login"
            element={<Login darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
          />
          <Route
            path="/signup"
            element={<Signup darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
