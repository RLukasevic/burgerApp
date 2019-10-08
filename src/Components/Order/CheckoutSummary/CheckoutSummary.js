import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import styles from './CheckoutSummary.module.css';

const checkoutSummary = props => {



    return (
        <div className={styles.CheckoutSummary}>
            <h1>Hopefully it tastes good</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients} routed={true}/>
            </div>
            <Button btnType='Danger' clicked={props.cCancel} >Cancel order</Button>
            <Button btnType='Success' clicked={props.cContinue} >Continue</Button>
        </div>
    );
}

export default checkoutSummary;