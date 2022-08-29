import React, { Component, useEffect } from 'react';
import { useRouter } from 'next/router'

import io from 'socket.io-client';

let socket;


export default function Week(props) {
    const router = useRouter();
    const { week, year } = router.query;
    useEffect(() => {
        if (!router.isReady) return;
        socket = io("http://194.195.244.202:8080");
        socket.on('connect', () => {
            socket.emit("getWeekSet", { week, year })
        });

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
            <h1>{week} {year}</h1>
        </React.Fragment>

    )

}

