const express = require('express');
const corsMiddleware = require('cors');
const pg = require('pg');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server, {
    cors: { 
        origin: "*",
        methods: ['POST', "GET"]
    }
});

app.use(corsMiddleware({
    origin: "*"
}))

io.on("connection", (socket) => {
    console.log("User connected");
    socket.on("getWeekSet", (data) => {
	console.log(data);
    })
})


server.listen(8080, () => {
    console.log('listening on 8080')
})

