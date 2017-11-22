import React from 'react';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';

class PaymentInput extends React.Component {
	constructor() {
		super();
	}

	calculateRepayment() {
		this.props.dispatch({ type: 'CALCULATE_REPAYMENT' });
	}

	render() {
		return (
			<div>
				<TextField id="contribution" label="Monthly Contribution" margin="normal" fullWidth />
				<Button raised color="primary" onClick={ this.calculateRepayment }>Calculate</Button>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		monthlyContribution: state.loanInfo.monthlyContribution
	};
}

export default connect(mapStateToProps)(PaymentInput);