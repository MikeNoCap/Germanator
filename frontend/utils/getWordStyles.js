import { NounArticles } from "./languageTables"
import React from "react"


export default function getWordStyles(elementType, word_type, german_word, gender, isProper=true, nounCase="nominative", noArticle=false) {
    const styledWord = React.createElement("span", {className: "word" + " " + word_type}, german_word)
    let article_prefix
    if (word_type === "noun") {
        article_prefix = React.createElement("span", {className: "word article"}, NounArticles.article(nounCase, isProper, gender))
    }
    
    if (noArticle) {
        return styledWord
    }

    return React.createElement(elementType, {}, [article_prefix, styledWord])
}