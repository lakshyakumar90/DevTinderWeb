import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../../utils/socket";

const Chat = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      // In a real application, you would send the message to the server here
      const messageObject = {
        sender: "You", // Or get the actual sender info
        text: newMessage,
        timestamp: new Date().toLocaleTimeString(), // Example timestamp
      };
      setMessages([...messages, messageObject]);
      setNewMessage(""); // Clear the input after sending
    }
  };

  return (
    <div className="max-w-2xl mt-24 mb-10 mx-auto p-6 bg-[#272626] shadow-xl rounded-lg border-[0.1px] border-gray-800">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold">Chat with {id}</h2>
      </div>
      <div className="p-4 h-[500px] overflow-y-auto flex flex-col space-y-2">
        {messages.map((message, index) => (
          <div key={index}>
            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <div className="chat-header">
                {message.sender}
                <time className="text-xs opacity-50">12:45</time>
              </div>
              <div className="chat-bubble">{message.text}</div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>
            <div className="chat chat-end">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <div className="chat-header">
                Anakin
                <time className="text-xs opacity-50">12:46</time>
              </div>
              <div className="chat-bubble">I hate you!</div>
              <div className="chat-footer opacity-50">Seen at 12:46</div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-700 flex space-x-2">
        <input
          type="text"
          placeholder="Type your message..."
          className="bg-base-200 px-2 outline-none w-full text-gray-300 border-gray-700 rounded-lg"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />
        <button
          className="btn bg-slate-700 text-white"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
