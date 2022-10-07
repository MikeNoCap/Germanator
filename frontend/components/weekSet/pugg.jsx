import React, { Component } from 'react';
import styles from "../../styles/Pugg.module.css";
import Header from "../header.jsx";


function LanguageSelector(props) {
    return (
        <div id={styles["language-selector"]}>
            <h1>Jeg vil svare på ...</h1>
        </div>
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
            <React.Fragment>
                <Header />
                <div id={styles["page"]}>
                
                    {<LanguageSelector /> && !this.state.languageSelected}
                </div>
            </React.Fragment>
        )
    }
}
export default Pugg;