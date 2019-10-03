import React from 'react';
import styles from './Ingredient.module.css';
import PropTypes from 'prop-types';


const ingredient = (props) => {

    let ingr = null; 

    switch (props.type) {
        case('bread-bottom'):
            ingr = <div className={styles.BreadBottom} ></div>;
            break;
        case('bread-top'):
            ingr = (
            <div className={styles.BreadTop}>
                <div className={styles.Seeds1}></div>
                <div className={styles.Seeds2}></div>
            </div>
            );  
            break;
        case('meat'):
            ingr = <div className={styles.Meat}></div>;
            break;
        case('cheese'):
            ingr = <div className={styles.Cheese}></div>;
            break;
        case('salad'):
            ingr = <div className={styles.Salad}></div>;
            break;
        case('bacon'):
            ingr = <div className={styles.Bacon}></div>;
            break;
        default:
            ingr = null;
    }
    return ingr;
};

ingredient.propTypes = {
    type: PropTypes.string.isRequired
};

export default ingredient;