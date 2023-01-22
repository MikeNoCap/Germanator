import { NounArticles } from "./languageTables"
import React from "react"


export default function getWordStyles(elementType, word_type, german_word, gender, isProper=true, nounCase="nominative") {
    return <div>
        {(word_type === "noun") &&
        React.createElement(elementType, {className: "word article"}, NounArticles.article(nounCase, isProper, gender))
        }
        {React.createElement(elementType, {className: "word" + " " + word_type}, german_word)}
    </div>
}