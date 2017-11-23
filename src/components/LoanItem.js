import React from 'react';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';

import {
	EDIT_LOAN,
	DELETE_LOAN
} from '../actionTypes'

const mapDispatchToProps = dispatch => ({
	onChange: payload => {
		dispatch({ type: EDIT_LOAN, payload });
	},
	onDelete: payload => {
		dispatch({ type: DELETE_LOAN, payload });
	}
});

class LoanItem extends React.Component {
	constructor(props) {
		super(props)

		const updateLoanFieldEvent = 
			key => evt => this.props.onChange({
				...this.props.loan,
				[key]: evt.target.value
			});
		this.onNameChange = updateLoanFieldEvent("name");
		this.onInterestRateChange = updateLoanFieldEvent("interestRate");
		this.onMinPaymentChange = updateLoanFieldEvent("minPayment");
		this.onTotalChange = updateLoanFieldEvent("total");

		this.onClickDelete = () => 
			this.props.onDelete(this.props.loan.id);
	}

	render() {
		const loan = this.props.loan;
		return (
			<Paper>
				<Grid container spacing={16}>
					<Grid item xs={3}>
						<TextField id="loan-name" label="Loan Name" margin="normal" onChange={this.onNameChange} value={loan.name} />
					</Grid>
					<Grid item xs={3}>
						<TextField id="loan-interest-rate" label="Interest Rate" margin="normal" onChange={this.onInterestRateChange} value={loan.interestRate} />
					</Grid>
					<Grid item xs={3}>
						<TextField id="loan-minimum-payment" label="Minimum Payment" margin="normal" onChange={this.onMinPaymentChange} value={loan.minPayment} />
					</Grid>
					<Grid item xs={2}>
						<TextField id="loan-total" label="Total Loan Balance" margin="normal" onChange={this.onTotalChange} value={loan.total} />
					</Grid>
					<Grid item xs={1}>
						<Button raised color="primary" onClick={this.onClickDelete}>Delete</Button>
					</Grid>
				</Grid>
			</Paper>
		);
	}
}

export default connect(() => ({}), mapDispatchToProps)(LoanItem);