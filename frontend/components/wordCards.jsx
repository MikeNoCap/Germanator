import React, { Component } from 'react';
import styles from "../styles/WordCards.module.css"

class WordCards extends Component {
    constructor(props) {
        super(props);
    }
    state = { word: 0 }
    render() {
        return (
            <React.Fragment>

                <button className={styles["left"]+" "+styles["next-prev-buttons"]}>&#8249;</button>
                <div id={styles["word-container"]}>
                    <h1
                        className={styles["word"] + " " + styles["article"]}>
                        {(this.props.words[this.state.word][4] === "feminine") && "die"}
                        {(this.props.words[this.state.word][4] === "masculine") && "der"}
                        {(this.props.words[this.state.word][4] === "neuter") && "das"}
                    </h1>
                    <h1
                        className={styles["word"] + " " + styles["noun"]}>
                        {this.props.words[this.state.word][0]}
                    </h1>
                </div>
                <button className={styles["right"]+" "+styles["next-prev-buttons"]}>&#8250;</button>
            </React.Fragment>
        );
    }
}

export default WordCards;
