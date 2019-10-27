import React, { Component } from 'react';
import Button from '../../../Components/UI/Button/Button';
import styles from './ContactData.module.css';
import axios from '../../../axiosOrders';
import Input from '../../../Components/UI/Input/Input';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as orderActions from '../../../store/actions/index';

class ContactData extends Component {
    state = { 
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name',
                },
                value: '',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                },
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Contact E-Mail',
                },
                value: '',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    isEmail: true,
                },
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Address',
                },
                value: '',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                },
            },
            zip: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Postal Code',
                },
                value: '',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    // exactLength: 5,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true,
                },
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}],
                },
                value: 'fastest',
                valid: true,
                validation: {
                    required: true,
                },
            },
        },
        formIsValid: false,
     }

     checkValidity(value, rules) {
        let isValid = true;

        // if(!rules) {
        //     return true;
        // }

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        // if(rules.exactLength) {
        //     isValid = value.length == rules.exactLength;
        // }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }
        
        if(rules.isEmail) {
            const pattern = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;
            isValid = pattern.test(value) && isValid
        }

        if(rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        
        return isValid;
     }

    componentDidMount = () => {
        console.log(this.props);
        // const gotState = {...this.props.history.location.state};
        // this.setState({ingredients: gotState[0]});
        // this.setState({totalPrice: gotState[1]});
        
    }

    cConfirmHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElID in this.state.orderForm) {
            formData[formElID] = this.state.orderForm[formElID].value;
        };

        const order = {
            ingredients: this.props.ings,
            //in reality price should be on backend for safety reasons
            price: this.props.totalPrice,
            customer: formData,
            customerId: this.props.id,
        }
        this.props.purchaseBurgerStart(order, this.props.token);
        // this.props.history.push('/my-orders');

    }

    onChangeHandler = (event, inputID) => {
        const newOrderForm = {...this.state.orderForm};
        const updatedOrderFormElement = {...newOrderForm[inputID]};
        updatedOrderFormElement.value = event.target.value;
        updatedOrderFormElement.valid = this.checkValidity(updatedOrderFormElement.value, updatedOrderFormElement.validation);
        updatedOrderFormElement.touched = true;
        newOrderForm[inputID] = updatedOrderFormElement;

        let formIsValid = true;
        for(let inputID in newOrderForm) {
            formIsValid = newOrderForm[inputID].valid && formIsValid;
        }

        this.setState({orderForm: newOrderForm, formIsValid: formIsValid});
    }


    render() { 

        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({id:key, config: this.state.orderForm[key]});
        }

        let form = (                
            <form onSubmit={this.cConfirmHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                    key={formElement.id}
                    name={formElement.id}
                    touched={formElement.config.touched} 
                    shouldValidate={formElement.config.validation} 
                    invalid={!formElement.config.valid} 
                    elementType={formElement.config.elementType} 
                    elementConfig={formElement.config.elementConfig} 
                    value={formElement.config.value} 
                    onChange={(event) => this.onChangeHandler(event,formElement.id)} />
                ))}
                <Button className={styles.Input} btnType='Success' disabled={!this.state.formIsValid} >Confirm</Button>
            </form>
        );
        if(this.props.loading) {
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

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.authData.idToken,
        id: state.auth.authData.id,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        purchaseBurgerStart: (orderData,token) => dispatch(orderActions.purchaseBurgerStart(orderData,token)),
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData,axios));