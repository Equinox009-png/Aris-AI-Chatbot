import React, { useState } from "react";
import { Bot, Globe, Paperclip, ArrowRight, ArrowUp } from "lucide-react";

function Prompt() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi, I’m Aris! How can I assist you today?" },
    { role: "user", content: "Tell me about quantum computing." }
  ]);


  const handleSend=async()=>{
    if(!inputValue.trim()) return;
    const userMessage = inputValue;
    setInputValue("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    try {
      const response = await fetch('http://localhost:4002/api/v1/prompt/prompty', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ content: userMessage }),
      });
      const data = await response.json();
      if (data.success) {
        setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        console.error('Error:', data.message);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
  const handleKeyDown=(e)=>{
    if(e.key==="Enter" ){
      handleSend();
    }
  }
  return (
    <div className="flex flex-col h-full w-full">
      {/* Greeting */}
      <div className="text-center py-10">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">
          Welcome to Aris AI
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
          Your intelligent assistant for all things AI-powered.
        </p>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-6 space-y-4">
        {messages.map((msg, index) => (
          msg.role === "assistant" ? (
            <div key={index} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-pink-500 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-xl max-w-md text-sm text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 shadow-sm">
                {msg.content}
              </div>
            </div>
          ) : (
            <div key={index} className="flex justify-end">
              <div className="bg-blue-600 text-white p-3 rounded-xl max-w-md text-sm shadow-sm">
                {msg.content}
              </div>
            </div>
          )
        ))}
      </div>

      {/* Input Bar */}
      <div className="p-4 border-t border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex items-center gap-2 w-full max-w-6xl mx-auto">
          <input
            type="text"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
          <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
            <Paperclip className="w-5 h-5 text-gray-700 dark:text-gray-200" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
            <Globe className="w-5 h-5 text-gray-700 dark:text-gray-200" />
          </button>
          {/* Neon Gradient Arrow Button */}
          <button onClick={handleSend} className="p-2 rounded-full bg-gradient-to-r from-cyan-400 to-pink-500 hover:from-pink-500 hover:to-cyan-400 text-white shadow-lg transition">
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Prompt;
