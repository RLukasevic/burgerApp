import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import styles from './NavigationItems.module.css';


const navItems = () => {
    return (
        <ul className={styles.NavigationItems}>
            <NavigationItem link='/' >Burger Builder</NavigationItem>
            <NavigationItem link='/my-orders' >Orders</NavigationItem>
        </ul>
    );
}

export default navItems;