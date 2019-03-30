import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/Burgerbuilder/BurgerBuilder';
import { BrowserRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <BurgerBuilder></BurgerBuilder>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
