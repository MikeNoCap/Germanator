import React, { Component, useState } from 'react';
import styles from "../../styles/Pugg.module.css";
import Header from "../header.jsx";
import shuffleArray from '../../utils/arrayShuffle';
import getStyles from "../../utils/getStyles";
import { NounArticles } from '../../utils/languageTables';
import { motion } from "framer-motion";
import getWordStyles from '../../utils/getWordStyles';



function LanguageSelector(props) {
    const [selectedLang, setSelectedLang] = useState("...");
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
            <h1>Jeg vil svare på {selectedLang}</h1>
            <div id={styles["lang-options"]}>
                <button onClick={() => {
                    setSelectedLang("german");
                }} id={styles["german"]} className={styles["lang"]+germanSelected}>
                </button>

                <button onClick={() => {
                    setSelectedLang("norwegian");
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

function WrongAnswerPopup(props) {
    return (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className={styles["popup-container"]}>
            <motion.div className={styles["wrong-answer"]} initial={{y: 1000}} animate={{y: 0}} transition={{type: "tween", duration: 1}}>
                <h1>Du skrev</h1>
                <h1>{props.inputValue}</h1>
                <h1>Riktig svar er</h1>
                {getWordStyles("h1", props.word_type, props.definition, props.gender)}

                <input type="text" placeholder='Gjenta det riktige svaret for å fortsette'></input>
            </motion.div>
        </motion.div>
    )
}


function Prompt(props){
    const xAnimate = props.outro ? (props.correctAnswer ? 900 : -900) : 0;
    const yInitial = props.outro ? 0 : -300

    return (
        <motion.h2 animate={{y: 0, x: xAnimate}} initial={{y: yInitial}} transition={props.outro ? {type: "tween", duration: 0.4} : {}} id={styles["prompt"]}>
            Skriv <span className={
                getStyles([
                    "word",
                    props.word_type,
                ])
            }>
                {props.word}
            </span> på tysk
        </motion.h2>
    )
}

function Main(props) {
    const [fadePropmt, setFadePropmt] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState(true);    

    function skipPrompt() {
        alert("SKIP")
    }
    function validateAnswer() {

        if (/^\s*$/.test(props.inputValue)) {
            return skipPrompt()
        }
        const article = props.word_type === "noun" ? NounArticles.article("nominative", true, props.gender) + " " : ""
        const answer = props.inputValue === article + props.definition
        
        // Clear only once the answer is correct
        if (answer) {
            props.clearInput();
        }
        setCorrectAnswer(answer)
        
        setFadePropmt(true);
        setTimeout(() => {
            props.handleAnswer(answer);
            setFadePropmt(false);
        }, 600);
    }

    return (
        <React.Fragment>
            {!correctAnswer && <WrongAnswerPopup inputValue={props.inputValue} definition={props.definition} word_type={props.word_type} gender={props.gender}></WrongAnswerPopup>}
            <div id={styles["question"]}>
            <Prompt key={fadePropmt} correctAnswer={correctAnswer} outro={fadePropmt} word={props.term} word_type={props.word_type}></Prompt>
            <div id={styles["svar-input"]}>
                <input 
                value={props.inputValue}
                id={styles["svar-input-text"]}
                ref={input => input && input.focus()} 
                type="text" 
                spellCheck="false"
                autoComplete="off"
                onChange={props.handleInput} 
                onKeyDown={(event) => {
                    if (event.key != "Enter") {
                        return
                    }
                    validateAnswer();
                }} />
                

                {(fadePropmt && correctAnswer) && <motion.div id={styles["correct-swipe"]} initial={{width: "0%"}} animate={{width: "100%"}}></motion.div>}
                {(fadePropmt && correctAnswer) && <motion.h2 id={styles["correct-swipe-text"]} initial={{width: "0%"}} animate={{width: "100%"}}>Super!</motion.h2>}
                {(fadePropmt && !correctAnswer) && <motion.div id={styles["wrong-swipe"]} initial={{width: "0%"}} animate={{width: "100%"}}></motion.div>}
                {(fadePropmt && !correctAnswer) && <motion.h2 id={styles["wrong-swipe-text"]} initial={{width: "0%"}} animate={{width: "100%"}}>Noch einmal...</motion.h2>}

                
            </div>

            <div id={styles["answer-buttons"]}>
                <button
                onClick={
                    validateAnswer  
                }
                className={styles["answer-button"]}
                >
                    Hopp over
                </button>
                <button 
                onClick={
                    validateAnswer
                }
                className={styles["answer-button"]}
                >
                    Svar
                </button>
            </div>
            

        </div>
        </React.Fragment>
    )
}

class Pugg extends Component {
    constructor(props) {
        super(props);
        this.setLang = this.setLang.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.clearInput = this.clearInput.bind(this);

        this.handleEnter = this.handleEnter.bind(this);
        this.handleAnswer = this.handleAnswer.bind(this);
        this.handleSkip = this.handleSkip.bind(this);

        this.words = this.props.words;
        shuffleArray(this.words);
    }
    state = {
        selectedLang: null,
        currentWord: 0,
        inputValue: ""    }
    setLang(lang) {
        this.setState(
            {
                selectedLang: lang
            }
        );
    }
    handleInput(event) {
        this.setState({
            inputValue: event.target.value
        })
    }
    clearInput() {
        this.setState({
            inputValue: ""
        })
    }
    handleEnter(event) {
        if (event.key != "Enter") {
            return
        }
        if (this.state.inputValue === "") {
            this.handleSkip()
        }
        else {
            this.handleAnswer()
        }
    }
    handleAnswer(correctAnswer) {

        // User is not allowed to move on to next word before answer is correct
        if (!correctAnswer) {
            return
        }

        let nextWord;
        if (this.state.currentWord === this.words.length-1) {
            nextWord = 0;
        }
        else {
            nextWord = this.state.currentWord+1
        }
        this.setState({
            currentWord: nextWord
        })
        
    }
    handleSkip() {
        alert("SKIP!")
    }
    render() {
        const currentWord = this.words[this.state.currentWord];
        const word_type = currentWord[2];
        const gender = word_type === "noun" ? currentWord[4] : undefined

        let norwegian;
        let german;
        if (word_type == "noun") {
            norwegian = currentWord[5]
            german = currentWord[0]
        }
        else {
            norwegian = currentWord[1]
            german = currentWord[0]
        }
        let term;
        let definition;
        if (this.state.selectedLang != null) {
            if (this.state.selectedLang === "german") {
                term = norwegian;
                definition = german;
            }
            else {
                term = german;
                definition = norwegian;
            }
        }

        return (
            <React.Fragment>
                <Header />
                <div id={styles["page"]}>
                    {
                    (this.state.selectedLang == null) ? 
                    <LanguageSelector handler = {this.setLang} /> : <Main 
                    definition={definition}
                    term={term}
                    handleInput={this.handleInput}
                    clearInput={this.clearInput}
                    handleAnswer={this.handleAnswer}
                    word_type={word_type}
                    gender={gender}
                    inputValue={this.state.inputValue}
                    />
                    }
                    
                    
                </div>
            </React.Fragment>
        )
    }
}
export default Pugg;