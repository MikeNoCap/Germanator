import Head from 'next/head'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Image from 'next/image'
import styles from '../styles/Home.module.css'


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
    const { words, title, week, year} = this.props;
    let tagNum = 0;
    return (
      <div className={styles["word-set"]}>
        <h1 className={styles["uke"]}>{"Woche " + week}</h1>
        <h1 className={styles["tema"]}>{title}</h1>
        <ul className={styles["words-preview"]}>
          {words.map((item) => (
            <li key={"tag"+tagNum++}>{item}</li>
          ))}
        </ul>
        <a href={"/weeks/"+year+"/"+week} className={styles["study-button"]}>Øv på gloser</a>
      </div>
    )
  }
}

export default function Home() {


  return (
    <div>
      <Head>
        <link href='https://fonts.googleapis.com/css?family=Roboto:100, 300, 400, 500, 700, 900' rel='stylesheet' />
        <title>Germanator</title>
      </Head>
      <div id={styles["topbar"]}>
        <h1 id={styles["logo-text"]}>der Germanator</h1>
      </div>
      <div id={styles["tabs"]}>
        <button className={styles["tab"] + " " + styles["current"]}>Ukesgloser</button>
        <button className={styles["tab"]}>Ordsamlinger</button>
        <button className={styles["tab"]}>Ordbok</button>
      </div>
      <div id={styles["word-sets"]}>
        <WeekSet
          year="2020"
          week="34"
          title="Das ist meine welt"
          words={[
            <Word word="sein" wordType="verb" key="0" />,
            <Word word="Stunde" wordType="noun" key="feminine" id="1" />
          ]} />
      </div>
    </div>
  )
};
