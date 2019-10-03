import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import styles from './BuildControls.module.css';

const buildControls = (props) => {

    const controls = [
            {label: 'Salad', type: 'salad'},
            {label: 'Bacon', type: 'bacon'},
            {label: 'Cheese', type: 'cheese'},
            {label: 'Meat', type: 'meat'},
    ]

    return(
        <div className={styles.BuildControls}>
            <p>Total price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(ctrl => (
                <BuildControl key={ctrl.label} label={ctrl.label} cMore={() => props.cMore(ctrl.type)} cLess={() => props.cLess(ctrl.type)} disabled={props.disabled[ctrl.type]} />
            ))}
        </div>
    );
};

export default buildControls;