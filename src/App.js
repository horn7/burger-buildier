import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/Burgerbuilder/BurgerBuilder';
<<<<<<< HEAD
import { BrowserRouter } from "react-router-dom";
=======
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch } from 'react-router-dom';
>>>>>>> bccd6e8986fe8fd5355ef17435990d0e89b50d95

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} /> 
            <Route path="/" component={BurgerBuilder} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
