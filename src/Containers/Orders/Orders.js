import React, { Component } from 'react';
import Order from '../../Components/Order/Order';
import axios from '../../axiosOrders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'; 
import Spinner from '../../Components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Orders extends Component {


    componentDidMount = () => {
        this.props.fetchOrders(this.props.token);
    }


    render() { 

        let returns = null;

        if (this.props.loading) {
            returns = <Spinner/> ;
        }   else {
            returns =             
            <div>
                {this.props.orders.map(order => (<Order key={order.id} ings={order.ingredients} price={+order.price} customer={order.customer} />))}
            </div>
        }

        return ( 
            <div>
                {returns}
            </div>
         );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.authData.idToken,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: (token) => dispatch(actions.fetchOrders(token)),
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders, axios));