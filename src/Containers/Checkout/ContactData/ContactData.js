import React, { Component } from 'react';
import Button from '../../../Components/UI/Button/Button';
import styles from './ContactData.module.css';
import axios from '../../../axiosOrders';

class ContactData extends Component {
    state = { 
        ingredients: null,
        name: '',
        email: '',
        address: {
            street: '',
            zip: '',
        },
        totalPrice: null,
        // loading: false,
     }

    componentDidMount = () => {
        console.log(this.props);
        const gotState = {...this.props.history.location.state};
        this.setState({ingredients: gotState[0]});
        this.setState({totalPrice: gotState[1]});
        
    }

    cConfirmHandler = () => {
        console.log('PURCHASED');
        const order = {
            ingredients: this.state.ingredients,
            //in reality price should be on backend for safety reasons
            price: this.state.totalPrice,
            customer: {
                name: this.state.name,
                address: {
                    street: this.state.address.street,
                    zip: this.state.address.zip,
                },
                email: this.state.email,               
            },
        }
        // this.setState({loading: true});
        axios.post('/orders.json', order)
            .then((response) => {
                // this.setState({loading: false});
                console.log(response);
                // this.modalHandler();
                this.props.history.push('/') 
            })
                .catch(e => {
                    // this.setState({loading: false});
                    console.log(e);
                    // this.modalHandler();
                });
    }

    onChangeHandler = () => {
        
    }


    render() { 
        return ( 
            <div className={styles.ContactData} >
                <h4>Please input your data</h4>
                <form>
                    <input className={styles.Input} type='text' name='name' placeholder='Name' onChange={this.onChangeHandler} value='' />
                    <input className={styles.Input} type='email' name='email' placeholder='Email' onChange={this.onChangeHandler} />
                    <input className={styles.Input} type='text' name='street' placeholder='Street' onChange={this.onChangeHandler} />
                    <input className={styles.Input} type='text' name='zip' placeholder='Postal/ZIP code' onChange={this.onChangeHandler} />
                    <Button className={styles.Input} btnType='Success' clicked={this.cConfirmHandler}>Confirm</Button>
                </form>
            </div>
         );
    }
}
 
export default ContactData;