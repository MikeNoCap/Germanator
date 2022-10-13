import React, { Component, useState } from 'react';
import styles from "../../styles/Pugg.module.css";
import Header from "../header.jsx";
import shuffleArray from '../../utils/arrayShuffle';

const articleTable = {
    "Nominative": {
        "proper": {
            "masculine": "der",
            "feminine": "die",
            "neuter": "das",
            "plural": "die"
        },
        "non-proper": {
            "masculine": "ein",
            "feminine": "eine",
            "neuter": "ein",
            "plural": "keine"
        }
    },
    "Accusative": {
        "proper": {
            "masculine": "den",
            "feminine": "die",
            "neuter": "das",
            "plural": "die"
        },
        "non-proper": {
            "masculine": "einen",
            "feminine": "eine",
            "neuter": "ein",
            "plural": "keine"
        }
    },
    "Dative": {
        "proper": {
            "masculine": "dem",
            "feminine": "der",
            "neuter": "dem",
            "plural": "den"
        },
        "non-proper": {
            "masculine": "einem",
            "feminine": "einer",
            "neuter": "einem",
            "plural": "keinen"
        }
    },
    "Genitive": {
        "proper": {
            "masculine": "des",
            "feminine": "der",
            "neuter": "des",
            "plural": "der"
        },
        "non-proper": {
            "masculine": "eines",
            "feminine": "einer",
            "neuter": "eines",
            "plural": "keiner"
        }
    }
}

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
        let norwegian;
        let german;
        if (currentWord[2] == "noun") {
            norwegian = currentWord[5]
            german = articleTable["Nominative"]["proper"][currentWord[4]]+" "+currentWord[0]
        }
        else {
            norwegian = currentWord[1]
        }
        return (
            <React.Fragment>
                <Header />
                <div id={styles["page"]}>
                    {(this.state.selectedLang == null) && <LanguageSelector handler = {this.setLang} />}
                    <div id={styles["question"]}>
                        <h2>Skriv <span className={styles["bold"]+" "+currentWord[2]+" word"}>{norwegian}</span> på tysk</h2>
                        <input type="text" spellcheck="false" id={styles["svar-input"]}></input>
                        <div id={styles["answer-buttons"]}>
                            <button className={styles["answer-button"]}>Hopp over</button>
                            <button className={styles["answer-button"]}>Svar</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default Pugg;