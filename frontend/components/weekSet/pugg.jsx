import React, { Component, useState } from 'react';
import styles from "../../styles/Pugg.module.css";
import Header from "../header.jsx";


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
    }
    state = {
        selectedLang: null,
    }
    setLang(lang) {
        this.setState(
            {
                selectedLang: lang
            }
        );
    }
    render() {
        return (
            <React.Fragment>
                <Header />
                <div id={styles["page"]}>
                    {(this.state.selectedLang == null) && <LanguageSelector handler = {this.setLang} />}
                </div>
            </React.Fragment>
        )
    }
}
export default Pugg;