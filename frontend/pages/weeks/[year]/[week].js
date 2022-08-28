import React, { Component, useEffect } from 'react';
import { useRouter } from 'next/router'

import io from 'socket.io-client';

const socket = io("localhost:8080");


export default function Week(props) {
    const router = useRouter();
    const { week, year } = router.query;
    return (
        <React.Fragment>
            <h1>{week} {year}</h1>
        </React.Fragment>

    )

}

