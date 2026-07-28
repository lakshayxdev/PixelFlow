const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const imageRoutes = require("./routes/imageRoutes");

const app = express();

// Middlewares
app.use(
    cors({
        origin: "http://localhost:5175",
        credentials: true,
    })
);
app.use(express.json());

// Static Folder
app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/images", imageRoutes);

// Health Check
app.get("/", (req, res) => {
    res.send("API is running");
});

module.exports = app;