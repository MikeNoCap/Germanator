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
    2: "adjective",
    3: "adverb"
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



const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ['POST', "GET"]
    }
});

app.use(corsMiddleware({
    origin: "*"
}))


async function getNounData(wordId) {
    const wordInfo = await pool.query("SELECT * FROM noun WHERE word_id = $1", [wordId]);
    const nounInfo = { german_plural, gender, norwegian_proper, norwegian_plural } = wordInfo.rows[0];
    nounInfo.gender = genders[nounInfo.gender];
    return nounInfo;
}

async function getVerbData(wordId) {
    const wordInfo = await pool.query("SELECT * FROM noun WHERE word_id = $1", [wordId]);
    
}

async function getFullWord(wordId) {
    const setWord = await pool.query("SELECT * FROM words WHERE id = $1", [wordId]);
    const wordInfo = {
        id,
        german_word,
        norwegian_word,
        word_type
    } = setWord.rows[0];
    wordInfo.word_type = wordtypes[wordInfo.word_type];

    let word;
    if (wordInfo.word_type === "noun") {
        const nounInfo = await getNounData(wordId);
        word = Object.assign({}, wordInfo, nounInfo);
    }
    else if (wordInfo.word_type === "adverb") {
        word = wordInfo;
    }
    return word;
}


async function getSetWords(setId) {
    const setWordsResult = await pool.query("SELECT * FROM word_groups WHERE group_id = $1", [setId]);
    const setWordsRows = setWordsResult.rows;

    const setWords = [];
    for (let i = 0; i < setWordsRows.length; i++) {
        setWords.push(setWordsRows[i].word_id)
    }
    return setWords;
}


io.on("connection", (socket) => {
    console.log("User connected");
    socket.on("getAllWeekSets", async (data, callback) => {
        const weekSetsResult = await pool.query("SELECT * FROM groups WHERE is_weekly = true");
        const weekSetsRows = weekSetsResult.rows;

        const weekSets = [];
        for (const weekSetRow of weekSetsRows) {
            const weekSet = {
                id,
                group_name,
                is_weekly,
                week,
                title
            } = weekSetRow;

            const setWordIds = await getSetWords(weekSet.id);
            const setWords = [];
            for (const setWordId of setWordIds) {
                const fullWord = await getFullWord(setWordId);
                setWords.push(fullWord);
            }
            weekSet.words = setWords;

            weekSets.push(weekSet);
        }
        callback(weekSets);

    })
    socket.on("getWeekSet", async (data) => {
        const { week, year } = data;
        const weekSet = await pool.query("SELECT * FROM groups WHERE is_weekly = true AND week = $1 AND year = $2", [week, year]);
        if (weekSet.rows.length == 0) {
            socket.emit("error", { code: 404, message: "No such week-set: " + year + "/" + week });
            return
        }
        const weekSetId = weekSet.rows[0].id;



        const words = [];

        const wordIds = await getSetWords(weekSetId);
        for (const wordId of wordIds) {
            const fullWord = await getFullWord(wordId);
            words.push(fullWord);
        }

        socket.emit("weekSet", words);
    })
})


server.listen(8080, () => {
    console.log('listening on 8080')
})

