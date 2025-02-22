import React, { useEffect, useState, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { createSocketConnection } from "../../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../utils/constants/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const targetUserName = searchParams.get("targetUserName");

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null); // For auto-scrolling
  const messagesContainerRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 300;

  const toggleReadMore = () => setIsExpanded(!isExpanded);

  const fetchChatMessages = async () => {
    if (loading) return;
    setLoading(true);

    // Store the current scroll position before loading messages
    const container = messagesContainerRef.current;
    const previousScrollHeight = container?.scrollHeight;

    try {
      const chat = await axios.get(
        `${BASE_URL}/chat/${targetUserId}?page=${page}&limit=50`,
        {
          withCredentials: true,
        }
      );

      const chatData = chat?.data?.data;
      const chatMessages = chat?.data?.data?.messages.map((message) => {
        const { senderId, text, timestamp } = message;
        return {
          sender: senderId.lastName
            ? `${senderId.firstName} ${senderId.lastName}`
            : senderId.firstName,
          text,
          timestamp,
          senderId: senderId._id, // Passing senderId here
        };
      });

      if (page == 1) {
        setMessages(chatMessages);
      } else {
        setMessages((prevMessages) => [...chatMessages, ...prevMessages]);
      }

      setHasMore(chatData?.pagination?.hasMore);
      setPage(page + 1);

      // Restore the previous scroll position
      setTimeout(() => {
        if (container) {
          container.scrollTop = container.scrollHeight - previousScrollHeight;
        }
      }, 0);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

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
      ({ firstName, lastName, text, timestamp, senderId }) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: lastName ? `${firstName} ${lastName}` : firstName,
            text,
            timestamp,
            senderId, // Passing senderId here
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
        senderId: user._id,
        text: newMessage,
        targetUserId,
        timestamp,
      });
      setNewMessage(""); // Clear input field
    }
  };

  // Auto-scroll to latest message
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  }, [messages]);

  return (
    <div className="max-w-2xl mt-24 mb-5 mx-auto p-6 bg-[#272626] shadow-xl rounded-lg border-[0.1px] border-gray-800">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold">Chat with {targetUserName}</h2>
      </div>
      <div
        ref={messagesContainerRef}
        className="p-4 h-[54vh] overflow-y-auto flex flex-col space-y-2"
      >
        {hasMore && (
          <button
            onClick={() => fetchChatMessages(page)}
            disabled={loading}
            className="text-blue-500 text-sm pb-2 cursor-pointer"
          >
            {loading ? "Loading..." : "Load More Messages"}
          </button>
        )}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat flex flex-col ${
              message.senderId === userId ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-header">{message.sender}</div>
            <div className="chat-bubble" style={{ overflowWrap: "break-word" }}>
              {message.text.length > maxLength ? (
                <>
                  {isExpanded
                    ? message.text
                    : `${message.text.slice(0, maxLength)}...`}
                  <button
                    onClick={toggleReadMore}
                    style={{
                      border: "none",
                      background: "none",
                      color: "#007BFF",
                      cursor: "pointer",
                      marginLeft: "5px",
                    }}
                  >
                    {isExpanded ? "Read Less" : "Read More"}
                  </button>
                </>
              ) : (
                message.text
              )}
            </div>
            <time className="text-xs opacity-50">
              {formatTime(message.timestamp)}
            </time>
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
