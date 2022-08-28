const express = require('express');
const corsMiddleware = require('cors');
const pg = require('pg');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server, {
    cors: { 
        origin: "http://localhost:3000",
        methods: ['POST', "GET"]
    }
});

app.use(corsMiddleware({
    origin: "http://localhost:3000"
}))

io.on("connection", (socket) => {
    console.log("User connected");
})


server.listen(8080, () => {
    console.log('listening on 8080')
})

