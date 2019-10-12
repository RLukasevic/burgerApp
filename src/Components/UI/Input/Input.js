import React from 'react';
import styles from './Input.module.css';

const input = (props) => {

    let InputEl = null;

    switch(props.elementType) {
        case ('input'): {
            InputEl = <input className={styles.InputElement} {...props.elementConfig} value={props.value}/>;
            break;
        }   
        case ('textarea'): {
            InputEl = <textarea className={styles.InputElement} {...props.elementConfig} value={props.value}/>;
            break;
        }
        case ('select'): {
        console.log(props.elementConfig)
            InputEl = (
            <select className={styles.InputElement} value={props.value}>
                {props.elementConfig.options.map(option => (
                    <option key={option.value} value={option.value} >{option.displayValue}</option>
                ))}
            </select>
            );
            break;
        }
        default: InputEl = <input className={styles.InputElement} {...props.elementConfig} value={props.value}/>;
            break;
    }

    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {InputEl}
        </div>
    );
}

export default input;