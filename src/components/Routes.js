import React from 'react';
import { Route, Switch, Router, Link } from 'react-router-dom';
import history from '../history';
import VendorComponent from './VendorComponent';
import ShipperComponent from './ShipperComponent';
import UserApp from './UserApp';

// const styles = {
//   nav: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'start',
//     height: '50px',
//     padding: '20px',
//     margin: 0,
//     width: '100%',
//   },
// };

const Routes = () => (
  <Router history={history}>
    <div>
      <nav>
        <div>
          <h1 id="main-header">Chains On Chains</h1>
          <p>Smart contracts for smart supply chain stakeholders</p>
        </div>
        <div>
          <Link to="/vendor">Vendor</Link>
        </div>
        <div>
          <Link to="/shipper">Shipper</Link>
        </div>
      </nav>
      <Switch>
        {/* <Route exact path="/" component={SimpleStorage} /> */}
        <Route path="/todos" component={UserApp} />
        <Route path="/vendor" component={VendorComponent} />
        <Route path="/shipper" component={ShipperComponent} />
      </Switch>
    </div>
  </Router>
);

export default Routes;
