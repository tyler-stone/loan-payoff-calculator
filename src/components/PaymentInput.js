import React from 'react';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';

class PaymentInput extends React.Component {
	constructor() {
		super();
	}

	calculateRepayment(payload) {
		this.props.dispatch({ type: 'CALCULATE_REPAYMENT', payload });
	}

	render() {
		return (
			<div>
				<TextField id="payment" label="Monthly Payment" margin="normal" fullWidth />
				<Button raised color="primary" onClick={ this.calculateRepayment }>Calculate</Button>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		monthlyPayment: state.loanInfo.monthlyPayment
	};
}

export default connect(mapStateToProps)(PaymentInput);