import React, { Component } from 'react';
import styles from "../styles/WordCards.module.css"

class WordCard extends Component {
    constructor(props) {
        super(props);
    }
    state = {
    }
    render() {
        return (
            <React.Fragment>

                <button onClick={this.props.previousClick} className={styles["left"] + " " + styles["next-prev-buttons"]}>&#8249;</button>
                <div className={styles["scene"]}>
                    <div className={styles["card"]}>
                        <div key={this.props.german_word} id={styles["word-container"]}>
                            {this.props.word_type === "noun" &&
                                <h1
                                    className={styles["word"] + " " + styles["article"]}>
                                    {(this.props.gender === "feminine") && "die"}
                                    {(this.props.gender === "masculine") && "der"}
                                    {(this.props.gender === "neuter") && "das"}
                                </h1>
                            }
                            <h1
                                className={styles["word"] + " " + styles[this.props.word_type]}>
                                {this.props.german_word}
                            </h1>
                        </div>
                    </div>
                </div>
                <button onClick={this.props.nextClick} className={styles["right"] + " " + styles["next-prev-buttons"]}>&#8250;</button>
                <h4 className={styles["word-number"]}>{this.props.wordNumber}</h4>
            </React.Fragment >
        );
    }
}

export default WordCard;
