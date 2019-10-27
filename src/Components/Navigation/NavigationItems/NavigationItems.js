import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import styles from './NavigationItems.module.css';



const navItems = (props) => {
    return (
        <ul className={styles.NavigationItems}>
            <NavigationItem link='/' clicked={props.clicked} >Burger Builder</NavigationItem>
            {props.isAuth != null ? <NavigationItem link='/my-orders' clicked={props.clicked} >Orders</NavigationItem> : null}
            {props.isAuth != null ? <NavigationItem link='/logout' clicked={props.clicked} >Logout</NavigationItem> : <NavigationItem link='/auth' clicked={props.clicked} >Authentication</NavigationItem> }
        </ul>
    );
}

export default navItems;