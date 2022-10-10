import React, { Component, useState } from 'react';
import styles from "../../styles/Pugg.module.css";
import Header from "../header.jsx";
import shuffleArray from '../../utils/arrayShuffle';


function LanguageSelector(props) {
    const [selectedLang, setSelectedLang] = useState("...");
    let germanSelected = "";
    let norwegianSelected = "";
    if (selectedLang == "Norsk") {
        norwegianSelected = " "+styles["selected"]
    }
    else if (selectedLang == "Tysk") {
        germanSelected = " "+styles["selected"]
    }
    return (
        <div id={styles["lang-select"]}>
            <h1>Jeg vil svare på {selectedLang}</h1>
            <div id={styles["lang-options"]}>
                <button onClick={() => {
                    setSelectedLang("Tysk");
                }} id={styles["german"]} className={styles["lang"]+germanSelected}>
                </button>

                <button onClick={() => {
                    setSelectedLang("Norsk");
                }} id={styles["norwegian"]} className={styles["lang"]+norwegianSelected}>
                </button>
            </div>
            <button onClick={() => {
                props.handler(selectedLang);
            }} className={styles["start-btn"]}>
                Start
            </button>
        </div>
    )
}

class Pugg extends Component {
    constructor(props) {
        super(props);
        this.setLang = this.setLang.bind(this);
        this.words = this.props.words;
        shuffleArray(this.words);
    }
    state = {
        selectedLang: null,
        currentWord: 0,
    }
    setLang(lang) {
        this.setState(
            {
                selectedLang: lang
            }
        );
    }
    render() {
        const currentWord = this.words[this.state.currentWord];
        return (
            <React.Fragment>
                <Header />
                <div id={styles["page"]}>
                    {(this.state.selectedLang == null) && <LanguageSelector handler = {this.setLang} />}
                    {JSON.stringify(currentWord)}

                  
                    <input></input>
                </div>
            </React.Fragment>
        )
    }
}
export default Pugg;