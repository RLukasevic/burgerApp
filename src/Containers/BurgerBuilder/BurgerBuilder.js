import React, { Component } from 'react'; 
import Aux from '../../hoc/Auxilliary';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';

const ING_PRICES = {
    salad: 0.2,
    bacon: 0.7,
    cheese: 0.5,
    meat: 1.1,
}

class BurgerBuilder extends Component {
    state = { 
        ingredients: {
            // seeds: false,
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
            },
        totalPrice: 2
        }
        
    ingAdded = (type) => {
        const updCount = this.state.ingredients[type] +1;
        const updState = {...this.state.ingredients};
        updState[type] = updCount;
        const priceChange = ING_PRICES[type] + this.state.totalPrice;
        this.setState({ totalPrice: priceChange, ingredients: updState });
    }

    ingDeleted = (type) => {
        const updCount = this.state.ingredients[type] -1;
        const updState = {...this.state.ingredients};
        updState[type] = updCount;
        const priceChange = this.state.totalPrice - ING_PRICES[type];
        this.setState({ totalPrice: priceChange, ingredients: updState });
        
    }

    render() { 
        const disabledInfo = {...this.state.ingredients};
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return ( 
            <Aux>
                <div>
                    <Burger ingredients={this.state.ingredients}  />
                </div>
                <div>
                    <BuildControls cMore={this.ingAdded} cLess={this.ingDeleted} disabled={disabledInfo} price={this.state.totalPrice} />
                </div>
            </Aux>
         );
    }
}
 
export default BurgerBuilder;