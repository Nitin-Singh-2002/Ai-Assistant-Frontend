import React from "react";
import BotIcon from "../assets/ChatBotIcon"
import { useState, useRef, useEffect } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import ChatMessage from "./ChatMessage";



const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    inputRef.current?.focus();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { text: userMessage, isAi: false }]);
    setIsLoading(true);

    try {
      const response = await fetch('https://ai-assistant-backend-xilq.onrender.com/api-bot/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { text: data.message, isAi: true }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { text: 'Sorry, there was an error processing your request.', isAi: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <div className='flex flex-col h-screen bg-gradient-to-b from-gray-50 to-white'>
      <div className='w-full bg-white border-b border-gray-200 shadow-sm' style={{ background: 'linear-gradient(#f4f0ff, #dacdff)' }}>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5'>
            <h1 className='text-3xl font-bold text-gray-900 flex items-center gap-2'>
              <BotIcon width="50px" height="50px" fill="#6D4FC2"/> <span className='text-purple-600'>AI</span> Assistant
            </h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-purple-50">
        {messages.length === 0 ? (
          <div className="flex flex-col  items-center justify-center h-full text-center text-gray-500">
            <BotIcon width="120px" height="120px" fill="gray"/>
            <p className="text-xl font-medium">How May I Help You!!</p>
            <p className="mt-2">Ask me anything!</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <ChatMessage key={index} message={message.text} isAi={message.isAi} />
          ))
        )}
        {isLoading && (
          <div className="flex items-center justify-center space-x-2 p-4">
            <div className="animate-bounce h-2 w-2 bg-purple-600 rounded-full"></div>
            <div className="animate-bounce h-2 w-2 bg-purple-600 rounded-full delay-100"></div>
            <div className="animate-bounce h-2 w-2 bg-purple-600 rounded-full delay-200"></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

       <div className="flex-none p-6 bg-white border-t border-gray-200 shadow-lg" style={{ background: 'linear-gradient(#f4f0ff, #dacdff)' }}>
        <form onSubmit={handleSubmit} className="max-w-7xl  mx-auto w-full">
          <div className="flex flex-col space-y-3">
            <div className="relative flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 min-h-[60px] w-full rounded-2xl border-2 border-gray-300 px-6 py-4 text-base focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 transition-all duration-200 pr-16"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="absolute right-2 inline-flex items-center justify-center w-12 h-12 rounded-xl text-white bg-purple-600 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <PaperAirplaneIcon className="h-6 w-6 rotate-270" />
              </button>
            </div>
            <p className="text-xs text-gray-500 text-center">
              Press Enter to send your message
            </p>
          </div>
        </form>
      </div>

      </div>
    </>
  )
}

export default Chat;
