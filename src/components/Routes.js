import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import history from '../history';
import SimpleStorage from './SimpleStorage';
import VendorComponent from './VendorComponent';
import ShipperComponent from './ShipperComponent';
import UserApp from './UserApp';

const Routes = () => (
  <Router history={history}>
    <div>
      <span>
        <h1 id="main-header">Chains On Chains</h1>
      </span>
      <Switch>
        <Route exact path="/" component={SimpleStorage} />
        <Route path="/todos" component={UserApp} />
        <Route path="/vendor" component={VendorComponent} />
        <Route path="/shipper" component={ShipperComponent} />
      </Switch>
    </div>
  </Router>
);

export default Routes;
