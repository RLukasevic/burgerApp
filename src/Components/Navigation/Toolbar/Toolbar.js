import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './Toolbar.module.css';

const toolbar = (props) => {
    return(
        <header className={styles.Toolbar} >
            <div onClick={props.cMenu}>Menu</div>
            <Logo height='70%'/>
            <nav className={styles.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    );
}

export default toolbar;