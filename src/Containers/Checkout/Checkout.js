import React, { Component } from 'react';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';


class Checkout extends Component {
    state = { 
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 1,
            meat: 1,
        },
        totalPrice: null,
     }

    componentDidMount() {
        console.log(this.props);

        //QUERY IF NEEDED
        // const query = new URLSearchParams(this.props.location.search);
        // const ingredients = {};
        // for (let param of query.entries()) {
        //     ingredients[param[0]] = +param[1]    //['salad', '1']
        // }
        // this.setState({ ingredients: ingredients });




        const gotState = {...this.props.history.location.state};
        this.setState({ingredients: gotState[0]});
        this.setState({totalPrice: gotState[1]});
    }

    cCancelHandler() {
        this.props.history.goBack();
    }

    cContinueHandler() {
        const stateToTransfer = [this.state.ingredients, this.state.totalPrice];
        this.props.history.replace('/checkout/contact-data', stateToTransfer);
    }



    render() { 
        return ( 
            <div>
                <CheckoutSummary ingredients={this.state.ingredients} cCancel={() => this.cCancelHandler()} cContinue={() => this.cContinueHandler()}/>
                <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
            </div>
         );
    }
}
 
export default Checkout;