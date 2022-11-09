import React, { Component } from 'react';
import styles from "../styles/WordCards.module.css"
import { motion } from "framer-motion";


function CardSide(props) {
    const language = props.isFlipped ? 'norwegian' : 'german';
    const initialAnimations = props.isFlipped ? 
    [{rotateX: "0deg"}, {rotateX: "180deg"}] :
    [{rotateX: "180deg"}, {rotateX: "0deg"}]

    const animateAnimations = props.isFlipped ? 
    [{rotateX: "180deg"}, {rotateX: "0deg"}] :
    [{rotateX: "0deg"}, {rotateX: "180deg"}]

    return (
        <div className={styles["sides"]}>
            <motion.div initial={initialAnimations[0]} 
                        animate={animateAnimations[0]} 
                        transition={{type: "tween", duration: 0.15}}

                        onClick={props.handleFlip} 
                        key={props.german_word} 
                        className={styles["side"]}>
                <div className={styles["card"]}>
                    <div className={styles["word-container"]}>
                        {(props.word_type === "noun") &&
                            <h1
                                className={"word" + " " + "article"}>
                                {(props.gender === "feminine") && "die"}
                                {(props.gender === "masculine") && "der"}
                                {(props.gender === "neuter") && "das"}
                            </h1>
                        }
                        <h1
                            className={"word" + " " + props.word_type}>
                            {props.german_word}
                        </h1>
                    </div>
                </div>
            </motion.div>

            <motion.div initial={initialAnimations[1]}
                        animate={animateAnimations[1]} 
                        transition={{type: "tween", duration: 0.15}}

                        onClick={props.handleFlip} 
                        key={props.german_word} 
                        className={styles["side"]}>
                <div className={styles["card"]}>
                    <div className={styles["word-container"]}>
                        <h1
                            className={"word" + " " + props.word_type}>
                            {props.word_type==="noun" ? props.norwegian_proper : props.norwegian_word}
                        </h1>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

class WordCard extends Component {
    constructor(props) {
        super(props);
        this.handleFlip = this.handleFlip.bind(this);
    }
    state = {
        isFlipped: false,
    }
    handleFlip() {
        this.setState({isFlipped: !this.state.isFlipped})
    }
    render() {
        return (
            <div key={this.props.wordNumber} id={styles["card"]}>
                <button onClick={this.props.previousClick} className={styles["left"] + " " + styles["next-prev-buttons"]}>&#8249;</button>
                <CardSide 
                isFlipped={this.state.isFlipped} 
                handleFlip={this.handleFlip}

                german_word={this.props.german_word} 
                norwegian_word={this.props.norwegian_word}
                norwegian_proper={this.props.norwegian_proper}
                
                gender={this.props.gender} 
                word_type={this.props.word_type}  
                />
                <button onClick={this.props.nextClick} className={styles["right"] + " " + styles["next-prev-buttons"]}>&#8250;</button>
                <h4 className={styles["word-number"]}>{this.props.wordNumber}</h4>
            </div>
        );
    }
}

export default WordCard;
