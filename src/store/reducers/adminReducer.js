import actionTypes from '../actions/actionTypes';

const initialState = {
	isLoadingGender: false,
	genders: [],
};

const adminReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.USER_SIGN_UP_SUCCEED:
			return {
				...state,
			};
		default:
			return state;
	}
};

export default adminReducer;
