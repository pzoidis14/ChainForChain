import React from 'react';
import Routes from './components/Routes';

import './css/oswald.css';
import './css/open-sans.css';
import './css/pure-min.css';
import './App.css';
import { MuiThemeProvider } from 'material-ui/styles';

const App = () => (
  <MuiThemeProvider>
    <div className="App">
      <Routes />
    </div>
  </MuiThemeProvider>
);

export default App;
