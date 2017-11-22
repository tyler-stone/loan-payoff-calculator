import { CALCULATE_REPAYMENT } from '../actionTypes'

const initialState = {
	monthlyContribution: 0,
	loans: []
};

const loanInfo = (state = initialState, action) => {
	switch (action.type) {
		case CALCULATE_REPAYMENT:
			return state;
		default:
			return state;
	}
}

export default loanInfo;