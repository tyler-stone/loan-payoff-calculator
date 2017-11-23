import { 
	CALCULATE_REPAYMENT,
	ADD_LOAN,
	EDIT_LOAN,
	DELETE_LOAN
} from '../actionTypes'

let nextLoanId = 0;

const initialState = {
	monthlyPayment: 0,
	loans: []
};

const loanInfo = (state = initialState, action) => {
	console.log(state);
	switch (action.type) {
		case CALCULATE_REPAYMENT:
			return state;
		case ADD_LOAN:
			return {
				...state,
				loans: state.loans.concat({
					id: nextLoanId++,
					...action.payload
				})
			}
		case EDIT_LOAN:
			return {
				...state,
				loans: state.loans.map(loan => {
					if (loan.id === action.payload.id) {
						return action.payload;
					} else {
						return loan;
					}
				})
			}
		case DELETE_LOAN:
			return {
				...state,
				loans: state.loans.filter(loan =>
					loan.id !== action.payload)
			}
		default:
			return state;
	}
}

export default loanInfo;