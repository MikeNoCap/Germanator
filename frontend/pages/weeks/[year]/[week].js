import React, { Component, useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import WordPanels from '../../../components/wordPanels';
import Header from '../../../components/header.jsx';

import io from 'socket.io-client';
import Head from 'next/head';

let socket;

function getWordArrayFormat(word) {
    const wordArray = [];
    wordArray[0] = word.german_word;
    wordArray[1] = word.norwegian_word;
    wordArray[2] = word.word_type;

    if (word.word_type === 'noun') {
        wordArray[3] = word.german_plural;
        wordArray[4] = word.gender;
        wordArray[5] = word.norwegian_proper;
        wordArray[6] = word.norwegian_plural;
    }


    return wordArray;
}


export default function Week(props) {
    const [words, setWords] = useState(null);
    const router = useRouter();
    const { week, year } = router.query;
    useEffect(() => {
        if (!router.isReady) return;
        socket = io("http://194.195.244.202:8080");
        socket.on('connect', () => {
            socket.emit("getWeekSet", { week, year })
        });
        socket.on("weekSet", (data) => {
            const arrayWords = [];
            for (let i = 0; i < data.length; i++) {
                arrayWords.push(getWordArrayFormat(data[i]))
            }
            setWords(arrayWords);
        })

        socket.on('disconnect', () => {

        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('pong');
        };

    }, [router.isReady]);

    return (
        <React.Fragment>
            <Header />
            <WordPanels words={words} />
        </React.Fragment>
    )

}

