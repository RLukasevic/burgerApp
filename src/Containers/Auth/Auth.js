import React, { Component } from 'react';
import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button';
import Spinner from '../../Components/UI/Spinner/Spinner';
import styles from './Auth.module.css';
import * as authActions from '../../store/actions/index';
import { connect } from 'react-redux';

class Auth extends Component {
    state = { 
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email address',
                },
                value: '',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    isEmail: true,
                },
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                },
                value: '',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6,
                },
            },
        },
        isSignup: true,
     }

     checkValidity(value, rules) {
        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

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

     onChangeHandler = (event, controlName) => {
        const newControls = {
            ...this.state.controls, 
            [controlName]: {
                ...this.state.controls[controlName], 
                value: event.target.value, 
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true,
            }
        };
        this.setState({controls: newControls});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.auth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        console.log('switching mode')
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        });
    }


    render() { 

        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({id:key, config: this.state.controls[key]});
        }

        let form = (                     
                formElementsArray.map(formElement => (
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
                ))
        );
        
        let mode = 'Sign In';
        if(!this.state.isSignup) {
            mode = 'Sign Up';
        }

        if (this.props.loading) {
            form = <Spinner/>
        }


        return ( 
            <div className={styles.Auth}>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType='Success' >Submit</Button>
                </form>
                <Button btnType='Danger' clicked={this.switchAuthModeHandler}>Switch to {mode}</Button>
            </div>
         );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        auth: (email,password,isSigningUp) => dispatch(authActions.auth(email,password,isSigningUp)),
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(Auth);