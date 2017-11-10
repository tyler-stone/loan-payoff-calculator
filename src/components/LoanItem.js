import React from 'react';

class LoanItem extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const loan = this.props.loan;
		return (
			<Paper>
				<Grid container spacing={16}>
					<Grid item xs={4}>
						<TextField id="loan-name" label="Loan Name" margin="normal" value={loan.name} />
					</Grid>
					<Grid item xs={4}>
						<TextField id="loan-interest-rate" label="Interest Rate" margin="normal" value={loan.interestRate} />
					</Grid>
					<Grid item xs={4}>
						<TextField id="loan-minimum-payment" label="Minimum Payment" margin="normal" value={loan.minPayment} />
					</Grid>
					<Grid item xs={4}>
						<TextField id="loan-total" label="Total Loan Balance" margin="normal" value={loan.total} />
					</Grid>
					<Grid item xs={1}>
						<Button raised color="primary">X</Button>
					</Grid>
				</Grid>
			</Paper>
		);
	}
}