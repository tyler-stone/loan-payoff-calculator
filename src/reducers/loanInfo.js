import { CALCULATE_REPAYMENT } from '../actionTypes'

const loanInfo = (state = {}, action) => {
	switch (action.type) {
		case CALCULATE_REPAYMENT:
		default:
			return state;
	}
}

export default loanInfo