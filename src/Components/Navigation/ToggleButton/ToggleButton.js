import React from 'react';
import styles from './ToggleButton.module.css';


const toggleButton = (props) => (<div onClick={props.cMenu} className={styles.DrawerToggle}><div></div><div></div><div></div></div>)

export default toggleButton;