import { combineReducers } from 'redux'
import loanInfo from './loanInfo'

const loanApp = combineReducers({
	loanInfo
});

export default loanApp;