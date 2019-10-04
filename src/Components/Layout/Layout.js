import React from 'react';
import Aux from '../../hoc/Auxilliary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import styles from './Layout.module.css';

const layout = (props) => {


    return (
        <Aux>
            <Toolbar /> 
            <main className={styles.Content}>
                {props.children}
            </main>
        </Aux>
    );
}

export default layout;