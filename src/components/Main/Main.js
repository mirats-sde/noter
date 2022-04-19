import React from 'react'
import Navbar from "../Navbar/Navbar";
import GettingStarted from '../GettingStarted/GettingStarted';
import styles from "./main.module.css"
const Main = () => {
  return (
    <div className={styles.main}>
        <Navbar/>
        <GettingStarted/>
    </div>
  )
}

export default Main