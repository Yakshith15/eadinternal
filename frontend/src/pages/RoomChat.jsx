import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

function RoomChat() {
  const { roomId } = useParams();
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [dataEntries, setDataEntries] = useState([]);
  const topicName = new URLSearchParams(location.search).get("topic");
  const [userId, setUserId] = useState(null); // State to store the user ID

  // Fetching the user ID from the localStorage or sessionStorage
  useEffect(() => {
    const user = localStorage.getItem("userEmail"); // Assuming userId is stored in localStorage
    if (user) {
      setUserId(user);
    } else {
      console.error("User ID is not found");
    }
  }, []);

  useEffect(() => {
    socket.emit("joinRoom", { roomId });

    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [roomId]);

  useEffect(() => {
    const fetchTopicData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/data/data/${topicName}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setDataEntries(data);
        } else {
          console.error("Failed to fetch topic data.");
        }
      } catch (error) {
        console.error("Error fetching topic data:", error);
      }
    };

    if (topicName) fetchTopicData();
  }, [topicName]);

  // const sendMessage = () => {
  //   if (!newMessage.trim()) return; // Prevent sending empty messages

  //   const message = { roomId, text: newMessage, sender: userId }; // Use actual user ID here
  //   socket.emit("sendMessage", message);
  //   setMessages((prevMessages) => [...prevMessages, message]); // Update messages on the client-side
  //   setNewMessage("");
  // };

  const sendMessage = async () => {
    const message = { roomId, text: newMessage, sender: userId }; // Replace with actual sender ID
    console.log(message);
    // Send message to backend to save in DB
    try {
      const response = await fetch("http://localhost:3001/api/messages/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // If necessary
        },
        body: JSON.stringify(message),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Message stored:", data);
        setMessages((prevMessages) => [...prevMessages, message]); // Update messages on the client-side
        setNewMessage(""); // Clear the input after sending
      } else {
        console.error("Failed to send message to DB");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };


  return (
    <div className="flex flex-col h-screen items-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl flex-grow bg-white rounded-lg shadow-md p-4 overflow-y-auto mb-4">
        <h2 className="text-2xl font-semibold text-center mb-4">Room Chat</h2>

        {/* Display Data Entries */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Topic: {topicName}</h3>
          <ul className="space-y-2">
            {dataEntries.map((entry, index) => (
              <li key={index} className="p-2 border-b">
                <p>
                  <strong>Provider:</strong> {entry.provider.username}
                </p>
                <p>
                  <strong>Summary:</strong> {entry.summary}
                </p>
                <p>
                  <strong>Link:</strong>{" "}
                  <a
                    href={entry.dataLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {entry.dataLink}
                  </a>
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Chat Messages */}
        <div className="space-y-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-md ${
                msg.sender === userId ? "bg-blue-200 self-end" : "bg-gray-200"
              }`}
            >
              <p>
                <strong>{msg.sender === userId ? "You" : msg.sender}:</strong>{" "}
                {msg.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className="w-full max-w-2xl flex items-center space-x-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Enter message"
          className="flex-grow p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default RoomChat;
