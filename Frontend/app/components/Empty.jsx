"use client"
import React, { useState } from 'react';

const ChatComponent = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSendMessage = () => {
    if (message.trim() === '') {
      return; // Don't send empty messages
    }

    setMessages([...messages, { text: message, sender: { name: 'User', profilePicture: '' } }]);
    setMessage('');
  };

  // Dummy data for the sender information if no messages received
  const defaultSender = { name: 'ChatBot', profilePicture: '/Assets/pp.png' };

  return (
    <div className="flex flex-col h-screen w-screen">
       <div className="flex items-center p-4 bg-gray-200">
        <img
          src={messages.length > 0 ? messages[messages.length - 1].sender.profilePicture : defaultSender.profilePicture}
          alt="Profile"
          className="w-10 h-10 rounded-full mr-2"
        />
        <div>
          <div className="font-semibold">
            {messages.length > 0 ? messages[messages.length - 1].sender.name : defaultSender.name}
          </div>
          {/* You can add more information about the sender here */}
        </div>
      </div>
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto px-4 py-2 w-full flex flex-col-reverse">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`text-white p-2 rounded mt-3 ${
                msg.sender.name === 'User' ? 'bg-blue-500 ml-auto' : 'bg-gray-500'
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="flex items-center p-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 rounded border"
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Send
          </button>
        </div>
      </div>
     
    </div>
  );
};

export default ChatComponent;
