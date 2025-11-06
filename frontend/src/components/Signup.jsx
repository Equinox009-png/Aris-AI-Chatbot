import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup({ darkMode, toggleDarkMode }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.post(
        "http://localhost:4002/api/v1/user/signup",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      );
      alert(data.message || "Signup Succeeded");
      navigate("/login");
    } catch (error) {
      const msg = error?.response?.data?.message || "Signup Failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`max-w-md mx-auto p-6 rounded-lg shadow-md ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Dark Mode Toggle */}
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleDarkMode}
          className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Title */}
      <h2
        className={`text-2xl font-bold mb-4 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Sign Up
      </h2>

      {/* Form */}
      <form onSubmit={handleSignup} className="space-y-4">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className={`w-full px-4 py-2 rounded border ${
            darkMode
              ? "border-gray-600 bg-gray-700 text-white"
              : "border-gray-300 bg-gray-100 text-gray-900"
          }`}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className={`w-full px-4 py-2 rounded border ${
            darkMode
              ? "border-gray-600 bg-gray-700 text-white"
              : "border-gray-300 bg-gray-100 text-gray-900"
          }`}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-2 rounded border ${
            darkMode
              ? "border-gray-600 bg-gray-700 text-white"
              : "border-gray-300 bg-gray-100 text-gray-900"
          }`}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className={`w-full px-4 py-2 rounded border ${
            darkMode
              ? "border-gray-600 bg-gray-700 text-white"
              : "border-gray-300 bg-gray-100 text-gray-900"
          }`}
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
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
      <p className={`mt-4 text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        Have an account?{" "}
        <Link to="/login" className="text-cyan-500 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}

export default Signup;
