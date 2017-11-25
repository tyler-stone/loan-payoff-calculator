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
		let interest = loan.total * (loan.interestRate / 100 / 12);
		loan.total += interest;
	}
};

const subtractMinPayments = (loans, budget) => {
	for (let loan of loans) {
		// not yet accounting for budgets lower than minimum payment
		// which would cause unexpected behavior with this current logic
		if (budget > 0) {
			if (loan.total >= loan.minPayment) {
				budget -= loan.minPayment;
				loan.total -= loan.minPayment;
			} else {
				budget -= loan.total;
				loan.total = 0;
			}
		}
	}

	return budget;
};

const subtractFromHighInterest = (loans, budget) => {
	loans.sort((a, b) => (a.interestRate < b.interestRate));

	for (let loan of loans) {
		if (loan.total > budget) {
			loan.total -= budget;
			budget = 0;
			break;
		} else {
			budget -= loan.total;
			loan.total = 0;
		}
	}

	return budget;
};

const calculateRepaymentResults = state => {
	let results = [];
	let loanTotal = state.loans.reduce((acc, l) => acc + l.total, 0);
	let initialLoans = [];

	// parse loan values to usable float value
	for (let loan of state.loans) {
		initialLoans.push({
			...loan,
			interestRate: parseFloat(loan.interestRate.replace(',','')),
			minPayment: parseFloat(loan.minPayment.replace(',','')),
			total: parseFloat(loan.total.replace(',',''))
		});
	}

	while (loanTotal > 0) {
		let monthBudget = parseFloat(state.monthlyPayment.replace(',',''));
		let monthLoans = [];
		
		if (results.length > 0) {
			for (let loan of results[results.length - 1]) {
				monthLoans.push({ ...loan });
			}
		} else {
			monthLoans = initialLoans;
		}
		
		applyLoanInterestToPrincipal(monthLoans);
		monthBudget = subtractMinPayments(monthLoans, monthBudget);
		monthBudget = subtractFromHighInterest(monthLoans, monthBudget);
		
		loanTotal = monthLoans.reduce((acc, l) => acc + l.total, 0);
		results.push(monthLoans);
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