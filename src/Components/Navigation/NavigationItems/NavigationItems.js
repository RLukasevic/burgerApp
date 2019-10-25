import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import styles from './NavigationItems.module.css';



const navItems = (props) => {
    return (
        <ul className={styles.NavigationItems}>
            <NavigationItem link='/' >Burger Builder</NavigationItem>
            {props.isAuth != null ? <NavigationItem link='/my-orders' >Orders</NavigationItem> : null}
            {props.isAuth != null ? <NavigationItem link='/logout' >Logout</NavigationItem> : <NavigationItem link='/auth' >Authentication</NavigationItem> }
        </ul>
    );
}

export default navItems;