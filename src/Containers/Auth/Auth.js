import React, { Component } from 'react';
import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button';
import Spinner from '../../Components/UI/Spinner/Spinner';
import Modal from '../../Components/UI/Modal/Modal';
import styles from './Auth.module.css';
import * as authActions from '../../store/actions/index';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { checkValidity } from '../../shared/utility';


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
        isSignup: false,
        modalShow: true,
     }

    componentDidMount() {
        if(this.props.error) {
            this.props.authClearError();
        }
    }


     onChangeHandler = (event, controlName) => {
        const newControls = {
            ...this.state.controls, 
            [controlName]: {
                ...this.state.controls[controlName], 
                value: event.target.value, 
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
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
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        });
    }

    modalHandler = () => {
        this.setState({modalShow: !this.state.modalShow});
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
        let revMode = 'Sign Up'
        if(!this.state.isSignup) {
            mode = 'Sign Up';
            revMode = 'Sign In';
        }
        

        if (this.props.loading) {
            form = <Spinner/>
        }
        
        let error = null;
        if(this.props.error) {
            error = <p style={{color: 'red'}} >{this.props.error}</p>;
        }

        let authOutput = null;
        if(this.props.token !== null) {
            if(this.props.ingredients) {
                if(this.props.ingredients.salad !== 0 || this.props.ingredients.bacon !== 0 || this.props.ingredients.cheese !== 0 || this.props.ingredients.meat !== 0) {
                    authOutput = <Redirect to='/checkout'/>
                } else {
                    authOutput = <Redirect to='/' />
                };
            } else {
                authOutput = <Redirect to='/' />
            };
        }

        return ( 
            <div className={styles.Auth}>       
                {error}
                <form onSubmit={this.submitHandler}>
                    <p>Please {revMode}</p>
                    {form}
                    <Button btnType='Success' >Submit</Button>
                </form>
                <Button btnType='Danger' clicked={this.switchAuthModeHandler}>Switch to {mode}</Button>
                {authOutput}
                <Modal show={this.state.modalShow} cBackDrop={this.modalHandler} >
                    <h4>Testing data</h4>
                    <p>login: test@test.test</p>
                    <p>password: testtest</p>
                </Modal>
            </div>
         );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        loading: state.auth.loading,
        error: state.auth.error,
        token: state.auth.authData.idToken,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        auth: (email,password,isSigningUp) => dispatch(authActions.auth(email,password,isSigningUp)),
        authClearError: () => dispatch(authActions.authClearError()),
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(Auth);