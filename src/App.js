import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/wallet" component={ Wallet } />
      <Route path="*" component={ Login } />
    </Switch>
  );
}

export default App;
