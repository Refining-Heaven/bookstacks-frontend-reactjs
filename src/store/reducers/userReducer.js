import actionTypes from '../actions/actionTypes';

const initialState = {
	isLoggedIn: false,
	userInfo: null,
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
				userInfo: action.userInfo,
			};
		case actionTypes.USER_LOGIN_FAILED:
			return {
				...state,
				isLoggedIn: false,
				userInfo: null,
			};
		case actionTypes.USER_LOGOUT:
			return {
				...state,
				isLoggedIn: false,
				userInfo: null,
			};
		default:
			return state;
	}
};

export default userReducer;
