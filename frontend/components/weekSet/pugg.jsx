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
        languageSelected: false,
    }
    render() {
        return (
            <div id={styles["page"]}>
                <Header />
                {<LanguageSelector /> && !this.state.languageSelected}
            </div>
        )
    }
}
export default Pugg;