require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const morgan = require('morgan');
const router = require('./routes');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
app.use(morgan('dev'));
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "https://the-road-trip-v-t.surge.sh",
        methods: ["GET", "POST"],
    }
});
const passport = require('passport');
app.use(passport.initialize());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));


router(app);

io.on("connection", (socket) => {
    console.log(`Use connected: ${socket.id}`);
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID ${socket.id} joined room ${data}`);
    });
    socket.on("leave_room", (data) => {
        socket.leave(data);
        console.log(`User with ID ${socket.id} leave room ${data}`);
    });
    socket.on("send_comment", (data) => {
        socket.to(`Post`).emit("receive_comment", data);
    });
    socket.on("send_message", (data) => {
        socket.to(`Post`).emit("receive_message", data);
    });
    socket.on("send_invitation", (data) => {
        socket.to(`Post`).emit("receive_invitation", data);
    });
    socket.on("send_story", (data) => {
        socket.to(`Post`).emit("receive_story", data);
    });
    socket.on("send_request", (data) => {
        socket.to(`Post`).emit("receive_request", data);
    });

    socket.on("answer_request", (data) => {
        socket.to(`Post`).emit("receive_answer", data);
    });
    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    });
})
server.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});
