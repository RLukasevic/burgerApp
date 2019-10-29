import React, { Component } from 'react'; 
import Aux from '../../hoc/Auxilliary';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import axios from '../../axiosOrders';
import * as actions from '../../store/actions/index';


export class BurgerBuilder extends Component {
    state = { 
        // purchasable: false,
        modalShow: false,
        }

    componentDidMount() {
        if(!this.props.ings) {
            this.props.onInitIngredients();
         } 
    }
    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
    // ingAdded = (type) => {
    //     const updCount = this.state.ingredients[type] +1;
    //     const updState = {...this.state.ingredients};
    //     updState[type] = updCount;
    //     const priceChange = ING_PRICES[type] + this.state.totalPrice;
    //     this.setState({ totalPrice: priceChange, ingredients: updState });
    //     this.updatePurchasable(updState);
    // }

    // ingDeleted = (type) => {
    //     const updCount = this.state.ingredients[type] -1;
    //     const updState = {...this.state.ingredients};
    //     updState[type] = updCount;
    //     const priceChange = this.state.totalPrice - ING_PRICES[type];
    //     this.setState({ totalPrice: priceChange, ingredients: updState });
    //     this.updatePurchasable(updState);
    // }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    updatePurchasable = (ings) => {
        const sum = Object.keys(ings).map(ingKey => {
            return ings[ingKey];
        }).reduce((sum,el) => {
            return (sum+el);
        },0);
        return sum > 0;
    }


    modalHandler = () => {
        this.setState({modalShow: !this.state.modalShow});
    }

    orderHandler = () => {
        // const order = {
        //     ingredients: this.state.ingredients,
        //     //in reality price should be on backend for safety reasons
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Name',
        //         address: {
        //             street: 'Allyson alley 8',
        //             zip: '345678',
        //             country: 'Country'
        //         },
        //         email: 'email@email.com',               
        //     },
        //     deliveryMethod: 'SonicSpeed'
        // }
        // this.setState({loading: true});
        // axios.post('/orders.json', order)
        //     .then((response) => {
        //         this.setState({loading: false});
        //         console.log(response);
        //         this.modalHandler();
        //     })
        //         .catch(e => {
        //             this.setState({loading: false});
        //             console.log(e);
        //             this.modalHandler();
        //         }); 

        //QUERY IF NEEDED
        // const queryParams = [];
        // for (let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // const queryString = queryParams.join('&');
        //this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString,
        // });

        // const stateToTransfer = [this.props.ings, this.props.totalPrice];
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    // componentDidUpdate() {
    //     if (!this.state.purchasable){
    //         if(this.props.totalPrice > 4.5) {
    //             this.setState({purchasable: true})
    //         }
    //     }   else {
    //         if(this.props.totalPrice <= 4.5) {
    //             this.setState({purchasable: false})
    //         }
    //     }
    // }

    render() { 

        let burger = this.props.error ? <p>Ingredients couldnt load</p> : <Spinner />;
        let orderSummary = null;


        if (this.props.ings !== null ) {
            const disabledInfo = {...this.props.ings};
            for(let key in disabledInfo) {
                disabledInfo[key] = disabledInfo[key] <= 0
            }

        burger =  (<Aux>
                    <Burger ingredients={this.props.ings}  />
                    <BuildControls cMore={this.props.onIngAdded} cLess={this.props.onIngRemoved} disabled={disabledInfo} price={this.props.totalPrice} purchasable={this.updatePurchasable(this.props.ings)} cOrder={this.modalHandler} />
                </Aux>);
        orderSummary = <OrderSummary ingredients={this.props.ings} cCheckOut={this.orderHandler} cCancel={this.modalHandler} price={this.props.totalPrice} history={this.props.history} isAuth={this.props.isAuth}/>;
        }

        return ( 
            <Aux>
                <Modal show={this.state.modalShow} cBackDrop={this.modalHandler} >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
         );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuth: state.auth.authData.idToken,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onIngAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));