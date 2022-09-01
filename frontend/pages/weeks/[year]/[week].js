import React, { Component, useEffect } from 'react';
import { useRouter } from 'next/router'
import styles from '../../../styles/Week.module.css'
import Header from '../../../components/header.jsx';
import WordCards from '../../../components/wordCards';

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
            <Header></Header>
            <div id={styles["panels"]}>
                <div
                    id={styles["word-panel"]}
                    className={styles["panel"]}>
                    <WordCards words={words}></WordCards>
                </div>
                <div
                    id={styles["info-panel"]}
                    className={styles["panel"]}>
                </div>
            </div>

        </React.Fragment>

    )

}

