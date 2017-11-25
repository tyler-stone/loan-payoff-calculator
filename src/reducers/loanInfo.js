import { 
	UPDATE_MONTHLY_PAYMENT,
	CALCULATE_REPAYMENT,
	ADD_LOAN,
	EDIT_LOAN,
	DELETE_LOAN
} from '../actionTypes'

let nextLoanId = 0;

const initialState = {
	monthlyPayment: 0,
	loans: [],
	results: []
};

const applyLoanInterestToPrincipal = (loans) => {
	for (let loan of loans) {
		let monthIdx = loan.monthTotals.length - 1;
		let interest = loan.monthTotals[monthIdx] * 
			(loan.interestRate / 100 / 12);
		loan.monthTotals.push(loan.monthTotals[monthIdx] + interest);
	}
};

const subtractMinPayments = (loans, budget) => {
	for (let loan of loans) {
		// not yet accounting for budgets lower than minimum payment
		// which would cause unexpected behavior with this current logic
		if (budget > 0) {
			let monthIdx = loan.monthTotals.length - 1;
			if (loan.monthTotals[monthIdx] >= loan.minPayment) {
				budget -= loan.minPayment;
				loan.monthTotals[monthIdx] -= loan.minPayment;
			} else {
				budget -= loan.monthTotals[monthIdx];
				loan.monthTotals[monthIdx] = 0;
			}
		}
	}

	return budget;
};

const subtractFromHighInterest = (loans, budget) => {
	loans.sort((a, b) => (a.interestRate < b.interestRate));

	for (let loan of loans) {
		let monthIdx = loan.monthTotals.length - 1;
		if (loan.monthTotals[monthIdx] > budget) {
			loan.monthTotals[monthIdx] -= budget;
			budget = 0;
			break;
		} else {
			budget -= loan.monthTotals[monthIdx];
			loan.monthTotals[monthIdx] = 0;
		}
	}

	return budget;
};

const calculateRepaymentResults = state => {
	let results = [];
	let loanTotal = state.loans.reduce((acc, l) => acc + l.total, 0);

	// parse loan values to usable float value
	for (let loan of state.loans) {
		results.push({
			...loan,
			interestRate: parseFloat(loan.interestRate.replace(',','')),
			minPayment: parseFloat(loan.minPayment.replace(',','')),
			monthTotals: [parseFloat(loan.total.replace(',',''))]
		});
	}

	while (loanTotal > 0) {
		let monthBudget = parseFloat(state.monthlyPayment.replace(',',''));
		
		applyLoanInterestToPrincipal(results);
		monthBudget = subtractMinPayments(results, monthBudget);
		monthBudget = subtractFromHighInterest(results, monthBudget);
		
		loanTotal = results.reduce((acc, l) => 
			acc + l.monthTotals[l.monthTotals.length - 1], 0);	
	}

	console.log(results);
	return results;
};

const loanInfo = (state = initialState, action) => {
	console.log(state);
	switch (action.type) {
		case UPDATE_MONTHLY_PAYMENT:
			return {
				...state,
				monthlyPayment: action.payload
			};
		case CALCULATE_REPAYMENT:
			return {
				...state,
				results: calculateRepaymentResults(state)
			};
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