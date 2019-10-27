import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../UI/BackDrop/BackDrop';
import Aux from '../../../hoc/Auxilliary';
import styles from './SideDrawer.module.css';



const sideDrawer = (props) => {

    let mergedStyles = [styles.SideDrawer, styles.Close];
    if (props.show) {
        mergedStyles = [styles.SideDrawer, styles.Open];
    }


    return (
        <Aux>
        <div className={mergedStyles.join(' ')} >
            <Logo height='10%' />
            <nav>
                <NavigationItems isAuth={props.isAuth} clicked={props.cBackDrop}/>
            </nav>
        </div>
        <BackDrop show={props.show} cBackDrop={props.cBackDrop}/>
        </Aux>
    );
}

export default sideDrawer;