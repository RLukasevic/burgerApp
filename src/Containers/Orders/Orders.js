import React, { Component } from 'react';
import Order from '../../Components/Order/Order';
import axios from '../../axiosOrders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'; 
import Spinner from '../../Components/UI/Spinner/Spinner';

class Orders extends Component {
    state = { 
        orders: [],
        loading: true,
     }

    componentDidMount = () => {
        axios.get('/orders.json').then( res => {
            const fetchedOrders = [];
            for(let key in res.data) {
                fetchedOrders.push({...res.data[key], id: key});
            }
            console.log(fetchedOrders)
            this.setState({ loading: false , orders: fetchedOrders });}
        ).catch(() => {
            this.setState({ loading: false });
        })
    }


    render() { 

        let returns = null;

        if (this.state.loading) {
            returns = <Spinner/> ;
        }   else {
            returns =             
            <div>
                {this.state.orders.map(order => (<Order key={order.id} ings={order.ingredients} price={+order.price} customer={order.customer} />))}
            </div>
        }

        return ( 
            <div>
                {returns}
            </div>
         );
    }
}
 
export default withErrorHandler(Orders, axios);