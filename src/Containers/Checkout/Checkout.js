import React, { Component } from 'react';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';


class Checkout extends Component {

    componentDidMount() {
        console.log(this.props);

        //QUERY IF NEEDED
        // const query = new URLSearchParams(this.props.location.search);
        // const ingredients = {};
        // for (let param of query.entries()) {
        //     ingredients[param[0]] = +param[1]    //['salad', '1']
        // }
        // this.setState({ ingredients: ingredients });




        // const gotState = {...this.props.history.location.state};
        // this.setState({ingredients: gotState[0]});
        // this.setState({totalPrice: gotState[1]});
    }

    cCancelHandler() {
        this.props.history.goBack();
    }

    cContinueHandler() {
        // const stateToTransfer = [this.props.ings, this.props.totalPrice];
        this.props.history.replace('/checkout/contact-data');
    }



    render() { 
        return ( 
            <div>
                <CheckoutSummary ingredients={this.props.ings} cCancel={() => this.cCancelHandler()} cContinue={() => this.cContinueHandler()}/>
                <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
            </div>
         );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice
    }
}
 
export default connect(mapStateToProps)(Checkout);