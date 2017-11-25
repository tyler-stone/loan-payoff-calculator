import React from 'react';
import PropTypes from 'prop-types';
import ReactHighcharts from 'react-highcharts';
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

const renderChartConfig = (xseries) => ({
  title: {
    text: 'Loan Repayment'
  },
  yAxis: {
      title: {
          text: 'Loan Balance'
      }
  },
  legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
  },
  series: xseries
});

class App extends React.Component {
   constructor(props) {
      super(props);
      this.config = renderChartConfig([]);
   }

   componentWillReceiveProps() {
     let chartXSeries = [];
      for (let loan of this.props.results) {
        chartXSeries.push({
          name: loan.name,
          data: loan.monthTotals
        })
      }
      this.config = renderChartConfig(chartXSeries);
      console.log(this.config);
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
                        <ReactHighcharts ref="chart" config={this.config} />
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
    loans: state.loanInfo.loans,
    results: state.loanInfo.results
	};
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(App));