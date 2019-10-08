import React from 'react';
import styles from './Order.module.css';

const order = (props) => {

    return ( 
        <div className={styles.Order}>
            <p>Ingredients : Salad(0)</p>
            <p>Price: <strong>USD 5.32</strong></p>
        </div>
     );
}

export default order;