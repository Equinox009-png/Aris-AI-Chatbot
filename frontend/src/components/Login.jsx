import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ darkMode, toggleDarkMode }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.post(
        "http://localhost:4002/api/v1/user/login",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      );
      alert(data.message || "Login Succeeded");
      navigate("/");
    } catch (error) {
      const msg = error?.response?.data?.message || "Login Failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`max-w-md mx-auto p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleDarkMode}
          className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
      <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-2 rounded border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-gray-100 text-gray-900'}`}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className={`w-full px-4 py-2 rounded border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-gray-100 text-gray-900'}`}
          required
        />

        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-gradient-to-r from-cyan-400 to-pink-500 hover:from-pink-500 hover:to-cyan-400 text-white py-2 rounded font-semibold shadow ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Logging In..." : "Login"}
        </button>
      </form>
      <p className={`mt-4 text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        Don't have an account?{" "}
        <Link to="/signup" className="text-cyan-500 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default Login;
