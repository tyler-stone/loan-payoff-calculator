import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import LoanItem from './LoanItem';
import { ADD_LOAN } from '../actionTypes';

const loan = {
	name: '',
	interestRate: '0',
	minPayment: '0',
	total: '0'
};

const mapStateToProps = state => ({
	loans: state.loanInfo.loans
});

const mapDispatchToProps = dispatch => ({
	onAddLoan: () => {
		dispatch({ type: ADD_LOAN, payload: loan });
	}
});

class LoanList extends React.Component {
	constructor(props) {
		super(props);
	}

	renderPresentableSum(arr, key) {
		let sum = arr.reduce((acc, el) => {
			let val = parseFloat(el[key].replace(',',''));
			return acc + (typeof val === 'number' && val >= 0 ? val : 0);
		}, 0);
		return sum.toFixed(2);
	}

	render() {
		return (
			<div>
				<Grid container spacing={16}>
					<Grid item xs={6} sm={4}>
						<Typography type="body2" color="inherit">
							Minimum Monthly Payment:
						</Typography>
						<label>${ this.renderPresentableSum(this.props.loans, 'minPayment')}</label>
					</Grid>
					<Grid item xs={6} sm={4}>
						<Typography type="body2" color="inherit">
							Total Loan Balance:
						</Typography>
						<label>${this.renderPresentableSum(this.props.loans, 'total')}</label>
					</Grid>
					<Grid item xs={6} sm={4}>
						<Button raised color="primary" onClick={this.props.onAddLoan}>+ Add Loan</Button>
					</Grid>
				</Grid>
				{ 
					this.props.loans.map(loan => {
						return (
							<LoanItem loan={loan} key={loan.id} />
						);
					})
				}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoanList);