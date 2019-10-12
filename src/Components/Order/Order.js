import React from 'react';
import styles from './Order.module.css';

const order = (props) => {

    const ingredients = [];

    for (let ing in props.ings) {
        ingredients.push({ name: ing, amount: props.ings[ing]})
    }

    const ingOutput = ingredients.map(ing => {
        return <span key={ing.name} style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid black',
            padding: '5px'}} >
        {ing.name} ({ing.amount})
        </span>; 
    })

    return ( 
        <div className={styles.Order}>
            <p>Ingredients: {ingOutput}</p>
            <p>Price: <strong>{props.price}</strong></p>
        </div>
     );
}

export default order;