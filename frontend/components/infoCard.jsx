import React, { Component } from 'react';
import styles from "../styles/InfoCard.module.css"

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

function NounGenderDisplay(props) {
    return (
        <div className={styles["gender"]}>
            <h2>Kjønn</h2>
            <h3>{props.gender}</h3>
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
    const { properArticle, properArticlePlural, german_word, german_plural } = props;
    return (
        <div className={styles["propers"]}>
            <h2>Bestemt</h2>

            <div className={styles["singular"]}>
                <h3 className={styles["singular-text"]}>Entall</h3>
                <h3 className={styles["article"] + " " + styles["word"]}>
                    {properArticle}
                </h3>
                <h3 className={styles["word"] + " " + styles["noun"]}>
                    {german_word}
                </h3>
            </div>
            <div className={styles["plural"]}>
                <h3 className={styles["plural-text"]}>Flertall</h3>
                <h3 className={styles["article"] + " " + styles["word"]}>
                    {properArticlePlural}
                </h3>
                <h3 className={styles["word"] + " " + styles["noun"]}>
                    {german_plural}
                </h3>
            </div>
        </div>
    );
}
function NounNonProperInfo(props) {
    const { nonProperArticle, nonProperArticlePlural, german_word, german_plural } = props;
    return (
        <div className={styles["non-propers"]}>
            <h2>Ubestemt</h2>

            <div className={styles["singular"]}>
                <h3 className={styles["singular-text"]}>Entall</h3>
                <h3 className={styles["article"] + " " + styles["word"]}>
                    {nonProperArticle}
                </h3>
                <h3 className={styles["word"] + " " + styles["noun"]}>
                    {german_word}
                </h3>
            </div>
            <div className={styles["plural"]}>
                <h3 className={styles["plural-text"]}>Flertall</h3>
                <h3 className={styles["article"] + " " + styles["word"]}>
                    {nonProperArticlePlural}
                </h3>
                <h3 className={styles["word"] + " " + styles["noun"]}>
                    {german_plural}
                </h3>
            </div>
        </div>
    );
}

class NounCard extends Component {
    constructor(props) {
        super(props);
    }
    state = { forms: ["Nominative", "Accusative", "Dative", "Genitive"], formIndex: 0 };
    handlePrevious = () => {
        if (this.state.formIndex === 0) {
            this.setState({ formIndex: this.state.forms.length - 1 })
        }
        else {
            this.setState({ formIndex: this.state.formIndex - 1 })
        }
    }
    handleNext = () => {
        if (this.state.formIndex === this.state.forms.length - 1) {
            this.setState({ formIndex: 0 })
        }
        else[
            this.setState({ formIndex: this.state.formIndex + 1 })
        ]
    }
    render() {
        const properArticle = articleTable[this.state.forms[this.state.formIndex]]["proper"][this.props.gender]
        const nonProperArticle = articleTable[this.state.forms[this.state.formIndex]]["non-proper"][this.props.gender]
        const properArticlePlural = articleTable[this.state.forms[this.state.formIndex]]["proper"]["plural"]
        const nonProperArticlePlural = articleTable[this.state.forms[this.state.formIndex]]["non-proper"]["plural"]
        const { german_word, german_plural, gender } = this.props;
        return (
            <div key={this.props.german_word} className={styles["info-card"]}>
                <h1 className={styles["title"] + " " + styles["noun"]}>Substantiv</h1>
                <NounGenderDisplay gender={this.props.gender} />
                <NounCaseSelector handlePrevious={this.handlePrevious} handleNext={this.handleNext} form={this.state.forms[this.state.formIndex]} />
                <div className={styles["conjugations"]}>
                    <NounProperInfo properArticle={properArticle} properArticlePlural={properArticlePlural} german_word={german_word} german_plural={german_plural} />
                    <NounNonProperInfo nonProperArticle={nonProperArticle} nonProperArticlePlural={nonProperArticlePlural} german_word={german_word} german_plural={german_plural} />
                </div>
            </div>
        );
    }
}

function InfoCard(props) {
    let Card;
    if (props.word_type === 'noun') {
        Card = <NounCard
            german_word={props.german_word}
            german_plural={props.german_plural}
            gender={props.gender}
        />;
    }
    return (Card);
}

export default InfoCard;


