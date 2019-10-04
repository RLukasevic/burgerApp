import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './Toolbar.module.css';

const toolbar = (props) => {
    return(
        <header className={styles.Toolbar} >
            <div>Menu</div>
            <Logo />
            <nav className={styles.nav}>
                <NavigationItems />
            </nav>
        </header>
    );
}

export default toolbar;