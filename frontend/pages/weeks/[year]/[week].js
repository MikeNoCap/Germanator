import React, { Component, useEffect } from 'react';
import { useRouter } from 'next/router'
import WordPanels from '../../../components/wordPanels';
import Header from '../../../components/header.jsx';

import io from 'socket.io-client';
import Head from 'next/head';

let socket;


export default function Week(props) {
    let words = [
        [
            "Mensa",
            "kantine",
            "noun",

            "Mensen",
            "feminine",
            "kantinen",
            "kantiner",
        ],
        [
            "Stunde",
            "time",
            "noun",

            "Stunden",
            "feminine",
            "timen",
            "timer",
        ],

    ];
    const router = useRouter();
    const { week, year } = router.query;
    useEffect(() => {
        if (!router.isReady) return;
        socket = io("http://194.195.244.202:8080");
        socket.on('connect', () => {
            socket.emit("getWeekSet", { week, year })
        });
        socket.on("weekSet", (data) => {
            console.log(data)
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

