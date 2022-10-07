import React, { Component, useState } from 'react';
import styles from "../../styles/Pugg.module.css";
import Header from "../header.jsx";


function LanguageSelector(props) {
    const [selectedLang, setSelectedLang] = useState("");
    let germanSelected = "";
    let norwegianSelected = "";
    if (selectedLang == "norwegian") {
        norwegianSelected = " "+styles["selected"]
    }
    else if (selectedLang == "german") {
        germanSelected = " "+styles["selected"]
    }
    return (
        <div id={styles["lang-select"]}>
            <h1>Jeg vil svare på ...</h1>
            <div id={styles["lang-options"]}>
                <button onClick={() => {
                    setSelectedLang("german");
                }} id={styles["german"]} className={styles["lang"]+germanSelected}>
                    <h2>Tysk</h2>
                </button>

                <button onClick={() => {
                    setSelectedLang("norwegian");
                }} id={styles["norwegian"]} className={styles["lang"]+norwegianSelected}>
                    <h2>Norsk</h2>
                </button>
            </div>
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
                <LanguageSelector />
                    {<LanguageSelector /> && (!this.state.languageSelected)}
                </div>
            </React.Fragment>
        )
    }
}
export default Pugg;