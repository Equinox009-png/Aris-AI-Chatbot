import React from "react";
import Sidebar from "./sidebar";
import Prompt from "./Prompt";

function Home({ darkMode, setDarkMode }) {
  return (
<div className="flex h-full flex-row bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-white transition-colors duration-300">
  <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
  {/*Prompt*/}
  <div className="flex-1 flex items-center justify-center px-6">
    <Prompt />
  </div>
</div>
  )
}

export default Home;