import React, { Component } from 'react';
import styles from "../../styles/Pugg.module.css";

class Pugg extends Component {
    constructor(props) {
        super(props);
    }
    state = {
    }
    render() {
        return (
            <div id={styles["page"]}>
                HELLO WORLD!!!
            </div>
        )
    }
}
export default Pugg;