import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

function App() {
  return (
   <BrowserRouter>
    <div className="grid-container">
    <header className="row">
      <div>
        <Link className="brand" to="/">Duka Letu</Link>
      </div>
      <div>
        <Link to="/cart">Cart</Link>
        <Link to="/signin">Sign In</Link>
      </div>

    </header>

    <main>
      <Switch>
        <Route path='/cart/:id?' component={CartScreen} ></Route>
        <Route path='/product/:id' component={ProductScreen} ></Route>
        <Route path="/" component={HomeScreen} exact ></Route>
      </Switch>
    </main>

    <footer className="row center">
      All Rights Reserved &copy; 2021
    </footer>
  </div>
  </BrowserRouter>
  );
}

export default App;
