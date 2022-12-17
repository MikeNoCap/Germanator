import Head from 'next/head'
import React, { Component, useEffect, useState } from 'react';
import ReactDOM from 'react-dom'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/header.jsx'

import io from 'socket.io-client';


class Word extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tooltip: true,
    }
  }


  render() {
    return (
      <React.Fragment>
        {(this.props.wordType == "noun") && <h3 className={styles["article"]}>{this.getArticle()}</h3>}
        <h3 className={styles[this.props.wordType]}>
          {this.props.word}
        </h3>
      </React.Fragment>
    )
  }

  getArticle() {
    if (this.props.gender == "masculine") {
      return "der";
    }
    else if (this.props.gender == "feminine") {
      return "die";
    }
    else if (this.props.gender == "neuter") {
      return "das";
    }
  }
}



class WeekSet extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { words, title, week, year } = this.props;
    let tagNum = 0;
    return (
      <div className={styles["word-set"]}>
        <h1 className={styles["uke"]}>{"Woche " + week + " - " + year}</h1>
        <h1 className={styles["tema"]}>{title}</h1>
        <ul className={styles["words-preview"]}>
          {words.map((item) => (
            <li key={tagNum++}>{item}</li>
          ))}
        </ul>
        <a href={"/weeks/" + year + "/" + week} className={styles["study-button"]}>Øv på gloser</a>
      </div>
    )
  }
}



let socket;

export default function Home() {
  const [weekSets, setWeekSets] = useState(null);
  useEffect(() => {
    if (weekSets) { return; }
    socket = io("http://panel.mogus.lol:8080");
    socket.on('connect', () => {
      socket.emit("getAllWeekSets", {}, (data) => {
        const weekSets = [];
        for (const wordSet of data) {
          const setWords = [];
          for (const word of wordSet.words) {
            setWords.push(
              <Word key={word.id} word={word.german_word} wordType={word.word_type} gender={word.gender} />
            )
          }
          weekSets.push(  
            <WeekSet
              key={wordSet.id}
              year={wordSet.year}
              week={wordSet.week}
              title={wordSet.title}
              words={setWords} />
          )
        }
        setWeekSets(weekSets);
      })
    });

    socket.on('disconnect', () => {

    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };

  });

  return (
    <div>
      <Head>
        <title>Germanator</title>
      </Head>
      <Header></Header>
      <div id={styles["tabs"]}>
        <button className={styles["tab"] + " " + styles["current"]}>Ukesgloser</button>
        <button className={styles["tab"]}>Ordsamlinger</button>
        <button className={styles["tab"]}>Ordbok</button>
      </div>
      <div id={styles["word-sets"]}>
        {weekSets}
      </div>
    </div>
  )
};
