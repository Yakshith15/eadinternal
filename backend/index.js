const express = require("express");
const connectDB = require("./config/db");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const authRoute = require("./routes/authRoute");
const dataRoute = require("./routes/dataRoute");
const roomRoute = require("./routes/roomRoute");
const Message = require("./models/Message"); // Import the Message model
const Room = require("./models/Room"); // Import the Room model
const messageRoute = require("./routes/messageRoute");
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "http://localhost:5173" },
});

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/auth", authRoute);
app.use("/api/data", dataRoute);
app.use("/api/rooms", roomRoute);
app.use("/api/messages", messageRoute);
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ roomId }) => {
    socket.join(roomId);
  });

  socket.on("sendMessage", async ({ roomId, sender, text }) => {
    const message = new Message({
      sender,
      text,
    });

    try {
      // Save message to the database
      await message.save();

      // Find the room by ID and add the new message
      await Room.findByIdAndUpdate(roomId, {
        $push: { messages: message._id },
      });

      // Emit message to the room
      io.to(roomId).emit("receiveMessage", message);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
