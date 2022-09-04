const express = require('express');
const corsMiddleware = require('cors');
const { Pool } = require('pg');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');


const wordtypes = {
    0: "noun",
    1: "verb",
    2: "adjective"
}
const genders = {
    0: "masculine",
    1: "feminine",
    2: "neuter"
}

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
    gender SMALLINT,
    norwegian_proper VARCHAR(255),
    norwegian_plural VARCHAR(255)
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


async function getFullWord(wordId) {
    const setWord = await pool.query("SELECT * FROM words WHERE id = $1", [wordId]);
    let word = {
        german_word,
        norwegian_word,
        word_type
    } = setWord.rows[0];
    word.word_type = wordtypes[word.word_type];
    if (word.word_type === "noun") {
        const wordInfo = await pool.query("SELECT * FROM noun WHERE word_id = $1", [setWords.rows[rowIndex].word_id]);
        const { german_plural, gender, norwegian_proper, norwegian_plural } = wordInfo.rows[0];
        word.german_plural = german_plural;
        word.gender = genders[gender];
        word.norwegian_proper = norwegian_proper;
        word.norwegian_plural = norwegian_plural;
    }
    return word;
}


io.on("connection", (socket) => {
    console.log("User connected");
    socket.on("getWeekSet", async (data) => {
        const { week, year } = data;
        const weekSet = await pool.query("SELECT * FROM groups WHERE is_weekly = true AND week = $1 AND year = $2", [week, year]);
        if (weekSet.rows.length == 0) {
            socket.emit("error", { code: 404, message: "No such week-set: " + year + "/" + week });
            return
        }
        const weekSetId = weekSet.rows[0].id;


        const setWords = await pool.query("SELECT * FROM word_groups WHERE group_id = $1", [weekSetId]);
        const words = [];
        for (let rowIndex = 0; rowIndex < setWords.rows.length; rowIndex++) {
            words.push(await getFullWord(setWords.rows[rowIndex].word_id));

        }

        socket.emit("weekSet", words);
    })
})


server.listen(8080, () => {
    console.log('listening on 8080')
})

