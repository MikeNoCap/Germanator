import React, { Component } from 'react';
import styles from "../styles/InfoCard.module.css"
import { NounArticles } from '../utils/languageTables';
import getWordStyles from '../utils/getWordStyles';

function NounGenderDisplay(props) {
    return (
        <div className={styles["gender"]}>
            <h2>Kjønn</h2>
            <h3 className={styles["load"]} key={props.gender}>{props.gender}</h3>
        </div>
    );
}
function NounCaseSelector(props) {
    return (
        <div className={styles["noun-case-selector"]}>
            <button onClick={props.handlePrevious} className={styles["left"] + " " + styles["next-prev-buttons"]}>&#8249;</button>
            <h1 className={styles["noun-cases"]}>{props.form}</h1>
            <button onClick={props.handleNext} className={styles["right"] + " " + styles["next-prev-buttons"]}>&#8250;</button>
        </div>
    );
}
function NounProperInfo(props) {
    const { nounCase, gender, german_word, german_plural } = props;
    return (
        <div key={german_word+german_plural} className={styles["propers"] + " " + styles["load"]}>
            <h2>Bestemt</h2>

            <div className={styles["singular"]}>
                <h3 className={styles["singular-text"]}>Entall</h3>
                {getWordStyles("h3", "noun", german_word, gender, true, nounCase)}
            </div>
            <div className={styles["plural"]}>
                <h3 className={styles["plural-text"]}>Flertall</h3>
                {getWordStyles("h3", "noun", german_plural, "plural", true, nounCase)}
            </div>
        </div>
    );
}
function NounNonProperInfo(props) {
    const { nounCase, gender, german_word, german_plural } = props;
    return (
        <div key={german_word+german_plural} className={styles["non-propers"] + " " + styles["load"]}>
            <h2>Ubestemt</h2>

            <div className={styles["singular"]}>
                <h3 className={styles["singular-text"]}>Entall</h3>
                {getWordStyles("h3", "noun", german_plural, gender, false, nounCase)}
            </div>
            <div className={styles["plural"]}>
                <h3 className={styles["plural-text"]}>Flertall</h3>
                {getWordStyles("h3", "noun", german_plural, "plural", false, nounCase)}
            </div>
        </div>
    );
}

class NounCard extends Component {
    constructor(props) {
        super(props);
    }
    state = { cases: ["Nominative", "Accusative", "Dative", "Genitive"], caseIndex: 0 };
    handlePrevious = () => {
        if (this.state.caseIndex === 0) {
            this.setState({ caseIndex: this.state.cases.length - 1 })
        }
        else {
            this.setState({ caseIndex: this.state.caseIndex - 1 })
        }
    }
    handleNext = () => {
        if (this.state.caseIndex === this.state.cases.length - 1) {
            this.setState({ caseIndex: 0 })
        }
        else[
            this.setState({ caseIndex: this.state.caseIndex + 1 })
        ]
    }
    render() {
        const { german_word, german_plural, gender } = this.props;
        const nounCase = this.state.cases[this.state.caseIndex]
        return (
            <div key={this.props.word_type} className={styles["info-card"] + " " + styles["load"]}>
                <h1 className={styles["title"]+" noun"}>Substantiv</h1>
                <NounGenderDisplay gender={gender} />
                <NounCaseSelector key={german_word} handlePrevious={this.handlePrevious} handleNext={this.handleNext} form={this.state.cases[this.state.caseIndex]} />
                <div className={styles["conjugations"]}>
                    <NounProperInfo nounCase={nounCase} gender={gender} german_word={german_word} german_plural={german_plural} />
                    <NounNonProperInfo nounCase={nounCase} gender={gender} german_word={german_word} german_plural={german_plural} />
                </div>
            </div>
        );
    }
}


class AdverbCard extends Component {
    constructor(props) {
        super(props);
    }
    state = {}
    render() {
        return (
            <div key={this.props.word_type} className={styles["info-card"] + " " + styles["adverb-card"]+ " " + styles["load"]}>
                <h1 className={styles["title"]}>Adverb</h1>
                <h3>Adverb bøyes ikke</h3>
                
            </div>
        );
    }
}



function InfoCard(props) {
    let Card;
    if (props.word_type === 'noun') {
        Card = <NounCard
            key={props.germam_word}
            german_word={props.german_word}
            german_plural={props.german_plural}
            gender={props.gender}
        />;
    }
    if (props.word_type === 'adverb') {
        Card = <AdverbCard />;
    }
    return (Card);
}

export default InfoCard;


