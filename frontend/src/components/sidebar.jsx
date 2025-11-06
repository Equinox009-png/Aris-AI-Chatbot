import React from "react";
import {  LogOut, Sun, Moon } from "lucide-react";
import logo from "../assets/aris_logo_cropped (1).png";
import rogo from "../assets/zoro.png";




function Sidebar({ darkMode, setDarkMode }) {
  return (
    <div className="h-full w-72 flex flex-col bg-white dark:bg-[#1F1F23] text-gray-900 dark:text-white shadow-lg transition-colors duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Aris AI Logo" className="w-9 h-9 rounded-md" />
          <span
            className={`text-2xl font-extrabold ${
              darkMode
                ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500"
                : "text-gray-900"
            }`}
          >
            Aris AI
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Dark/Light Toggle Button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-800" />
            )}
          </button>

          {/* Close Button */}
          <button className="hover:bg-gray-200 dark:hover:bg-gray-700 p-1 rounded-md transition">
          
          </button>
        </div>
      </div>

      {/* History / Main Content */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        <button
          className={`w-full py-2 px-4 rounded-lg font-semibold transition shadow-md hover:shadow-lg ${
            darkMode
              ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-indigo-500 hover:to-purple-500"
              : "bg-gray-900 text-white hover:bg-gray-800"
          }`}
        >
          + New Chat
        </button>

        <div className="text-gray-400 text-center mt-10 text-sm">
          No Chat History yet
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-300 dark:border-gray-700">
        <div className="flex flex-col gap-3">
          <div
            className={`flex items-center gap-3 cursor-pointer p-2 rounded-md transition ${
              darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
            }`}
          >
            <img className="rounded-full w-10 h-10" src={rogo} alt="Profile" />
            <span className="font-medium">{darkMode ? "My Profile" : "My Profile"}</span>
          </div>
          <button
            className={`flex items-center gap-2 justify-center py-2 px-4 rounded-lg font-semibold transition shadow-md hover:shadow-lg ${
              darkMode
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-gray-900 hover:bg-gray-800 text-white"
            }`}
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
