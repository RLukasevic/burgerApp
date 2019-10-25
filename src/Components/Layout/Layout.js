import React,  { useState } from 'react';
import Aux from '../../hoc/Auxilliary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import BackDrop from '../UI/BackDrop/BackDrop';
import styles from './Layout.module.css';
import { connect } from 'react-redux';



const Layout = (props) => {

    const [showSide, changeShowSide] = useState(false);

    return (
        <Aux>
            <Toolbar cMenu={() => changeShowSide(!showSide)} isAuth={props.isAuth} /> 
            <SideDrawer show={showSide} cBackDrop={() => changeShowSide(!showSide)} isAuth={props.isAuth} />
            <BackDrop />
            <main className={styles.Content}>
                {props.children}
            </main>
        </Aux>
    );
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.authData.idToken,
    }
}

export default connect(mapStateToProps)(Layout);