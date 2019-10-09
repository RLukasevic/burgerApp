import React from 'react';
import Layout from './Components/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Containers/Checkout/Checkout';
import Orders from './Containers/Orders/Orders';
import { Route, Switch } from 'react-router-dom';


function App() {
  return (
      <Layout>
        <Switch>
          <Route path='/checkout' component={Checkout} />
          <Route path='/my-orders' component={Orders}/>
          <Route path='/' exact component={BurgerBuilder} />         
        </Switch>
      </Layout>
  );
}

export default App;
