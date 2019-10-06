import React,  { useState } from 'react';
import Aux from '../../hoc/Auxilliary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import BackDrop from '../UI/BackDrop/BackDrop';
import styles from './Layout.module.css';



const Layout = (props) => {

    const [showSide, changeShowSide] = useState(false);

    return (
        <Aux>
            <Toolbar cMenu={() => changeShowSide(!showSide)}/> 
            <SideDrawer show={showSide} cBackDrop={() => changeShowSide(!showSide)}/>
            <BackDrop />
            <main className={styles.Content}>
                {props.children}
            </main>
        </Aux>
    );
}

export default Layout;