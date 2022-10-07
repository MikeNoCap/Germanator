import React, { Component } from 'react';
import styles from "../../styles/Pugg.module.css";
import Header from "../header.jsx";


function LanguageSelector(props) {
    return (
        <React.Fragment>
            <h1>Jeg vil svare på ...</h1>
        </React.Fragment>
    )
}

class Pugg extends Component {
    constructor(props) {
        super(props);
    }
    state = {
    }
    render() {
        return (
            <div id={styles["page"]}>
                <Header />

            </div>
        )
    }
}
export default Pugg;