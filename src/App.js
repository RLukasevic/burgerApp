import React, { Component } from 'react';
import Layout from './Components/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Containers/Checkout/Checkout';
import Orders from './Containers/Orders/Orders';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Auth from './Containers/Auth/Auth';
import Logout from './Containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

class App extends Component {



  componentDidMount() {
    this.props.authCheckState();
  }
  

  render() {

    let routes = (
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/' exact component={BurgerBuilder} /> 
        <Redirect to='/' />        
      </Switch>
    );

    if(this.props.isAuth) {
      routes = (
        <Switch>
          <Route path='/logout' component={Logout} />
          <Route path='/auth' component={Auth} />
          <Route path='/checkout' component={Checkout} />
          <Route path='/my-orders' component={Orders}/>
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
