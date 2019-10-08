import React from 'react';
import Aux from '../../../hoc/Auxilliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {

    const ingSummary = Object.keys(props.ingredients).map(ingKey => {
        return <li key={ingKey}><span style={{textTransform: 'capitalize'}}>{ingKey}</span>: {props.ingredients[ingKey]}</li>
    });

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>Burger with the following ingredients:</p>
            <ul>
                {ingSummary}
            </ul>
            <p><strong>Price Total: {props.price.toFixed(2)}</strong></p>
            <Button btnType={'Danger'} clicked={props.cCancel} >Cancel Order</Button>
            <Button btnType={'Success'} clicked={props.cCheckOut} >CheckOut</Button>
        </Aux>
    );  
};

export default orderSummary;