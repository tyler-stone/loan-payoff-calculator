import React from 'react';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import { 
	CALCULATE_REPAYMENT,
	UPDATE_MONTHLY_PAYMENT
} from '../actionTypes';

const mapDispatchToProps = dispatch => ({
	calculateRepayment: payload => 
		dispatch({ type: CALCULATE_REPAYMENT, payload }),
	onChange: payload =>
		dispatch({ type: UPDATE_MONTHLY_PAYMENT, payload })
});

const mapStateToProps = state => ({
	monthlyPayment: state.loanInfo.monthlyPayment
});

class PaymentInput extends React.Component {
	constructor() {
		super();

		this.onMonthlyPaymentChange = evt =>
			this.props.onChange(evt.target.value);
	}

	render() {
		return (
			<div>
				<TextField id="payment" label="Monthly Payment" onChange={this.onMonthlyPaymentChange} margin="normal" fullWidth />
				<Button raised color="primary" onClick={ this.props.calculateRepayment } value={this.props.monthlyPayment}>Calculate</Button>
			</div>
		);
	}
}



export default connect(mapStateToProps, mapDispatchToProps)(PaymentInput);