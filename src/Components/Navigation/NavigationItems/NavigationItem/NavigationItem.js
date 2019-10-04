import React from 'react';
import styles from './NavigationItem.module.css';

const navItem = (props) => (
    <li className={styles.NavigationItem}><a className={props.active ? styles.active : null} href={props.link}>{props.children}</a></li>
);

export default navItem;