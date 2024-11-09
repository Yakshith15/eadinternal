const express = require("express");
const connectDB = require('./config/db');
const app = express();
const cors = require("cors");
const authRoute = require("./routes/authRoute");
const dataRoute = require("./routes/dataRoute");

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/auth", authRoute);
app.use("/api/data", dataRoute);


app.get("/", (req, res) => {
    res.send("Hello World");
})

app.listen(3001, () => {
    console.log("Server is running on port 3001");
})
