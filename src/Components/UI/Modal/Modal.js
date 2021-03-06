import React from 'react';
import styles from './Modal.module.css';
import Aux from '../../../hoc/Auxilliary';
import BackDrop from '../BackDrop/BackDrop';


const modal = (props) => {
    return (
        <Aux>
            <BackDrop show={props.show} cBackDrop={props.cBackDrop}/>
            <div className={styles.Modal} style={{transform: props.show ? 'translateY(0)' : 'translateY(-100vh)', opacity: props.show ? '1': '0'}}>
                {props.children}
            </div>
        </Aux>
    )
}

export default React.memo(modal);