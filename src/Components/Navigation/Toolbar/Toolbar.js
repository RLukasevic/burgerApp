import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import ToggleButton from '../ToggleButton/ToggleButton';
import styles from './Toolbar.module.css';

const toolbar = (props) => {
    return(
        <header className={styles.Toolbar} >
            <ToggleButton cMenu={props.cMenu} />
            <Logo height='70%' />
            <nav className={styles.DesktopOnly}>
                <NavigationItems isAuth={props.isAuth}/>
            </nav>
        </header>
    );
}

export default toolbar;