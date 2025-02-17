import React, { useEffect, useState, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { createSocketConnection } from "../../utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
  const { targetUserId } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const targetUserName = searchParams.get("targetUserName");

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null); // For auto-scrolling

  // Function to format time
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    if (!user) return;

    socketRef.current = createSocketConnection();
    socketRef.current.emit("joinChat", { userId, targetUserId });

    socketRef.current.on(
      "receiveMessage",
      ({ firstName, lastName, text, timestamp }) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: `${firstName} ${lastName}`,
            text,
            timestamp,
          },
        ]);
      }
    );

    return () => {
      socketRef.current.emit("leaveChat", { userId, targetUserId });
      socketRef.current.disconnect();
    };
  }, [userId, targetUserId]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "" && socketRef.current) {
      const timestamp = new Date().toISOString();

      socketRef.current.emit("sendMessage", {
        firstName: user.firstName,
        lastName: user.lastName,
        senderId: userId,
        text: newMessage,
        targetUserId,
        timestamp,
      });
      setNewMessage(""); // Clear input field
    }
  };

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="max-w-2xl mt-24 mb-5 mx-auto p-6 bg-[#272626] shadow-xl rounded-lg border-[0.1px] border-gray-800">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold">Chat with {targetUserName}</h2>
      </div>
      <div className="p-4 h-[54vh] overflow-y-auto flex flex-col space-y-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat flex flex-col ${
              message.sender === `${user.firstName} ${user.lastName}`
                ? "chat-end"
                : "chat-start"
            }`}
          >
            <div className="chat-header">
              {message.sender}
            </div>
            <div className="chat-bubble">{message.text}</div>
            <time className="text-xs opacity-50">{formatTime(message.timestamp)}</time>
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* Invisible div for auto-scrolling */}
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
          className="btn rounded-md border-none bg-slate-700 text-white"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
