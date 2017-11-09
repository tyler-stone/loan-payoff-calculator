import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

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

function App (props) {
   const { classes } = props;

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
               <Grid item xs={9}>
                  { /* <ChartContainer /> */ }

                  <Paper className={classes.paper}>
                     <Typography type="title" color="inherit">
                        Loan Graph
                     </Typography>
                  </Paper>
               </Grid>
               <Grid item xs={3}>
                  <Paper className={classes.paper}>
                     <Typography type="title" color="inherit">
                        Payment Information
                     </Typography>
                  </Paper>
               </Grid>
               <Grid item xs={12}>
                  <Paper className={classes.paper}>
                     <Typography type="title" color="inherit">
                        Loans
                     </Typography>
                  </Paper>
               </Grid>
            </Grid>
         </div>
      </MuiThemeProvider>
   );
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);