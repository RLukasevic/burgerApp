import React, { Component } from 'react';
import Button from '../../../Components/UI/Button/Button';
import styles from './ContactData.module.css';
import axios from '../../../axiosOrders';
import Input from '../../../Components/UI/Input/Input';
import Spinner from '../../../Components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = { 
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name',
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Contact E-Mail',
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Address',
                },
                value: ''
            },
            zip: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Postal Code',
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}],
                },
                value: ''
            },
        },
        ingredients: null,
        totalPrice: null,
        loading: false,
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
            // customer: {
            //     name: this.state.name,
            //     address: {
            //         street: this.state.address.street,
            //         zip: this.state.address.zip,
            //     },
            //     email: this.state.email,               
            // },
        }
        this.setState({loading: true});
        axios.post('/orders.json', order)
            .then((response) => {
                this.setState({loading: false});
                console.log(response);
                // this.modalHandler();
                this.props.history.push('/') 
            })
                .catch(e => {
                    this.setState({loading: false});
                    console.log(e);
                    // this.modalHandler();
                });
    }

    onChangeHandler = () => {
        
    }


    render() { 

        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({id:key, config: this.state.orderForm[key]});
        }

        let form = (                
            <form>
                {formElementsArray.map(formElement => (
                    <Input key={formElement.id} elementType={formElement.config.elementType} elementConfig={formElement.config.elementConfig} value={formElement.config.value} onChange={this.onChangeHandler} />
                ))}
                <Button className={styles.Input} btnType='Success' clicked={this.cConfirmHandler}>Confirm</Button>
            </form>
        );
        if(this.state.loading) {
            form = <Spinner />;
        }

        return ( 
            <div className={styles.ContactData} >
                <h4>Please input your data</h4>
                {form}
            </div>
         );
    }
}
 
export default ContactData;