import React, { Component } from 'react';
import styles from "../styles/WordPanels.module.css"
import WordCard from "./wordCard.jsx"
import InfoCard from "./infoCard.jsx";

class WordPanels extends Component {
    constructor(props) {
        super(props);
    }
    state = { wordIndex: 0 }
    render() {
        if (!this.props.words) {
            return (<div></div>);
        }
        const wordArray = this.props.words[this.state.wordIndex];
        const word = {
            // General
            german_word: wordArray[0],
            norwegian_word: wordArray[1],
            word_type: wordArray[2],


            // Noun
            german_plural: wordArray[3],
            gender: wordArray[4],
            norwegian_proper: wordArray[5],
            norwegian_plural: wordArray[6],
        }

        return (
            <div id={styles["panels"]}>
                <div
                    id={styles["word-panel"]}
                    className={styles["panel"]}>
                    <WordCard
                        wordNumber={this.state.wordIndex+1+"/"+this.props.words.length}

                        german_word={word.german_word}
                        norwegian_word={word.norwegian_word}
                        word_type={word.word_type}

                        // Noun specific
                        german_plural={word.german_plural}
                        gender={word.gender}
                        norwegian_proper={word.norwegian_proper}
                        norwegian_plural={word.norwegian_plural}

                        nextClick={() => {
                            if (this.state.wordIndex + 1 !== this.props.words.length) {
                                this.setState({ wordIndex: this.state.wordIndex + 1 });
                            }
                        }}
                        previousClick={() => {
                            if (this.state.wordIndex !== 0) {
                                this.setState({ wordIndex: this.state.wordIndex - 1 });
                            }
                        }}

                    />
                </div>
                <div
                    id={styles["info-panel"]}
                    className={styles["panel"]}>
                    <InfoCard
                        german_word={word.german_word}
                        norwegian_word={word.norwegian_word}
                        word_type={word.word_type}

                        // Noun specific
                        german_plural={word.german_plural}
                        gender={word.gender}
                        norwegian_proper={word.norwegian_proper}
                        norwegian_plural={word.norwegian_plural}
                    />
                </div>
            </div>
        );
    }
}

export default WordPanels;
