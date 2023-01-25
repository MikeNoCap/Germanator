import React, { Component } from 'react';
import styles from '../styles/Header.module.css'


export default function Header(props) {
    return (
        <div id={styles["topbar"]}>
            <h1 id={styles["logo-text"]}><a href="/">der Germanator</a></h1>
        </div>
    );
}