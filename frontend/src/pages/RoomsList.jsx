import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function RoomsList() {
  const [rooms, setRooms] = useState([]);
  const [passwords, setPasswords] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      const response = await fetch("http://localhost:3001/api/rooms");
      const data = await response.json();
      setRooms(data);
    };
    fetchRooms();
  }, []);

  const joinRoom = async (roomId, roomName,roomTopic) => {
    const response = await fetch("http://localhost:3001/api/rooms/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: roomName, password: passwords[roomId] }),
    });

    if (response.ok) navigate(`/rooms/${roomId}?topic=${roomTopic}`);
      // navigate(`/rooms/${data.roomId}?topic=${topicName}`);
    else alert("Invalid password or room does not exist");
  };

  const handlePasswordChange = (roomId, value) => {
    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [roomId]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h2 className="text-3xl font-bold mb-8">Available Rooms</h2>
      <div className="w-full max-w-3xl grid gap-6">
        {rooms.map((room) => (
          <div
            key={room._id}
            className="bg-white p-6 rounded-lg shadow-lg transition hover:shadow-xl"
          >
            <h3 className="text-xl font-semibold mb-4">{room.name}</h3>
            <h3 className="text-xl font-semibold mb-4">{room.topic}</h3>
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <input
                type="password"
                placeholder="Enter password"
                value={passwords[room._id] || ""}
                onChange={(e) => handlePasswordChange(room._id, e.target.value)}
                className="w-full md:w-1/2 p-3 border rounded-md focus:outline-none focus:border-blue-400"
              />
              <button
                onClick={() => joinRoom(room._id, room.name,room.topic)}
                className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
              >
                Join Room
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomsList;
