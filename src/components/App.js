import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

class App extends React.Component {
   render() {
      return (
         <MuiThemeProvider>
            <AppBar title="Loan Payoff Calculator" showMenuIconButton={false} />
         </MuiThemeProvider>
      );
   }
}

export default App;