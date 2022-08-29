const express = require('express');
const corsMiddleware = require('cors');
const { Pool } = require('pg');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');

const pool = new Pool({
    host: 'localhost',
    user: 'germanator',
    database: 'germanator',
    password: "German123"
})

pool.query(`CREATE TABLE IF NOT EXISTS noun (
    id SERIAL PRIMARY KEY,
    word_id INT,
    plural VARCHAR(255),
    gender SMALLINT
)`)
pool.query(`CREATE TABLE IF NOT EXISTS verb (
    id SERIAL PRIMARY KEY,
    word_id INT,
    irregular BOOLEAN
)`)

pool.query(`CREATE TABLE IF NOT EXISTS words (
    id SERIAL PRIMARY KEY,
    german_word VARCHAR(255),
    norwegian_word VARCHAR(255),
    word_type SMALLINT
)`)

pool.query(`CREATE TABLE IF NOT EXISTS groups (
    id SERIAL PRIMARY KEY,
    group_name VARCHAR(255),
    is_weekly BOOLEAN,
    week INT,
    title VARCHAR(255)
)`)
pool.query(`CREATE TABLE IF NOT EXISTS word_groups (
    id SERIAL PRIMARY KEY,
    group_id INT,
    word_id INT
)`)


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
        socket.emit("weekSet");
    })
})


server.listen(8080, () => {
    console.log('listening on 8080')
})

