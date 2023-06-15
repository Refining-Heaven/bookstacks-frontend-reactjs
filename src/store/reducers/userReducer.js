import actionTypes from '../actions/actionTypes';

const initialState = {
	isLoggedIn: false,
	accountInfo: null,
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.USER_SIGN_UP_SUCCEED:
			return {
				...state,
			};
		case actionTypes.USER_SIGN_UP_FAILED:
			return {
				...state,
			};
		case actionTypes.USER_LOGIN_SUCCEED:
			return {
				...state,
				isLoggedIn: true,
				accountInfo: action.accountInfo,
			};
		case actionTypes.USER_LOGIN_FAILED:
			return {
				...state,
				isLoggedIn: false,
				accountInfo: null,
			};
		case actionTypes.USER_LOGOUT:
			return {
				...state,
				isLoggedIn: false,
				accountInfo: null,
			};
		case actionTypes.FETCH_ACCOUNT_INFO_SUCCEED:
			state.accountInfo = action.accountInfo;
			return {
				...state,
			};
		case actionTypes.FETCH_ACCOUNT_INFO_FAILED:
			state.accountInfo = [];
			return {
				...state,
			};
		default:
			return state;
	}
};

export default userReducer;
