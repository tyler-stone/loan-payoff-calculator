import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import PaymentInput from './PaymentInput';
import LoanList from './LoanList';

const theme = createMuiTheme();

const styles = theme => ({
   container: {
      marginTop: theme.spacing.unit,
   },
   appBar: {
      margin: 0,
   },
   layoutContainer: {
      margin: theme.spacing.unit,
   },
   paper: {
      padding: theme.spacing.unit,
   }
});

class App extends React.Component {
   constructor(props) {
      super(props);
   }

   render() {
      const { classes } = this.props;
      return (
         <MuiThemeProvider theme={theme}>
            <AppBar position="static" color="primary" className={classes.appBar}>
               <Toolbar>
                  <Typography type="title" color="inherit">
                     Loan Payoff Calculator
                  </Typography>
               </Toolbar>
            </AppBar>
            <div className={classes.layoutContainer}>
               <Grid container spacing={16} className={classes.container}>
                  <Grid item md={9} xs={12}>
                     { /* <ChartContainer /> */ }

                     <Paper className={classes.paper}>
                        <Typography type="title" color="inherit">
                           Loan Graph
                        </Typography>
                     </Paper>
                  </Grid>
                  <Grid item md={3} xs={12}>
                     <Paper className={classes.paper}>
                        <Typography type="title" color="inherit">
                           Payment Information
                        </Typography>
                        <PaymentInput />
                     </Paper>
                  </Grid>
                  <Grid item xs={12}>
                     <Paper className={classes.paper}>
                        <Typography type="title" color="inherit">
                           Loans
                        </Typography>
                        <LoanList />
                     </Paper>
                  </Grid>
               </Grid>
            </div>
         </MuiThemeProvider>
      );
   }
}

function mapStateToProps(state) {
	return {
		loans: state.loanInfo.loans
	};
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(App));