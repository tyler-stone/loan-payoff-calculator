import React from 'react';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

class PaymentInput extends React.Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div>
				<TextField id="contribution" label="Monthly Contribution" margin="normal" fullWidth />
				<Button raised color="primary">Calculate</Button>
			</div>
		);
	}
}

export default PaymentInput;