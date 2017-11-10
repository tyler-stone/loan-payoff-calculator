import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

class LoanList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Grid container spacing={16}>
					<Grid item xs={6}>
						<Typography type="body2" color="inherit">
							Minimum Monthly Payment:
						</Typography>
						<label>$0.00</label>
					</Grid>
					<Grid item xs={6}>
						<Typography type="body2" color="inherit">
							Total Loan Balance:
						</Typography>
						<label>$0.00</label>
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

LoanList.propTypes = {
	loans: PropTypes.array.isRequired,
};

export default LoanList;