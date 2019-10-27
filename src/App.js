import React, { Component } from 'react';
import Layout from './Components/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Logout from './Containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => {
  return import ('./Containers/Checkout/Checkout')
});

const asyncOrders = asyncComponent(() => {
  return import ('./Containers/Orders/Orders')
});

const asyncAuth = asyncComponent(() => {
  return import ('./Containers/Auth/Auth')
});

class App extends Component {



  componentDidMount() {
    this.props.authCheckState();
  }
  

  render() {

    let routes = (
      <Switch>
        <Route path='/auth' component={asyncAuth} />
        <Route path='/' exact component={BurgerBuilder} /> 
        <Redirect to='/' />        
      </Switch>
    );

    if(this.props.isAuth) {
      routes = (
        <Switch>
          <Route path='/logout' component={Logout} />
          <Route path='/auth' component={asyncAuth} />
          <Route path='/checkout' component={asyncCheckout} />
          <Route path='/my-orders' component={asyncOrders}/>
          <Route path='/' exact component={BurgerBuilder} /> 
          <Redirect to='/' />        
        </Switch>
      )
    }

    return (
      <Layout>
        {routes}
      </Layout>
  );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.authData.idToken !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authCheckState: () => dispatch(actions.authCheckState()),
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
