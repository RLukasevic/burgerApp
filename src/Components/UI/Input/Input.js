import React from 'react';
import styles from './Input.module.css';

const input = (props) => {

    let InputEl = null;
    const inputClasses = [styles.InputElement];

    if(props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(styles.Invalid);
    }

    let validationError = null;
    if (props.invalid && props.touched) {
        validationError = <p className={styles.ValidationError}>Please enter a valid {props.name}</p>;
    }

    switch(props.elementType) {
        case ('input'): {
            InputEl = <input onChange={props.onChange} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}/>;
            break;
        }   
        case ('textarea'): {
            InputEl = <textarea onChange={props.onChange} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}/>;
            break;
        }
        case ('select'): {
            InputEl = (
            <select onChange={props.onChange} className={inputClasses.join(' ')} value={props.value}>
                {props.elementConfig.options.map(option => (
                    <option key={option.value} value={option.value} >{option.displayValue}</option>
                ))}
            </select>
            );
            break;
        }
        default: InputEl = <input onChange={props.onChange} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}/>;
            break;
    }

    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {InputEl}
            {validationError}
        </div>
    );
}

export default input;