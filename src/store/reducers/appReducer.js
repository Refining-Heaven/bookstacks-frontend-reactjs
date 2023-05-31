import actionTypes from '../actions/actionTypes';

const initialState = {
	started: true,
	language: 'vi',
	theme: 'light',
	manageBookModalIsOpen: false,
	optionMenuIsOpen: false,
	subOptionsMenuIsOpen: false,
	allRequiredBookData: [],
	bookList: [],
	bookInfo: null,
};

const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.APP_START_UP_COMPLETE:
			return {
				...state,
				started: true,
			};
		case actionTypes.CHANGE_LANGUAGE:
			return {
				...state,
				language: action.language,
			};
		case actionTypes.CHANGE_THEME:
			return {
				...state,
				theme: action.theme,
			};
		case actionTypes.OPEN_MANAGE_BOOK_MODAL:
			return {
				...state,
				manageBookModalIsOpen: true,
			};
		case actionTypes.CLOSE_MANAGE_BOOK_MODAL:
			return {
				...state,
				manageBookModalIsOpen: false,
			};
		case actionTypes.OPEN_CLOSE_OPTION_MENU:
			return {
				...state,
				optionMenuIsOpen: !state.optionMenuIsOpen,
			};
		case actionTypes.CLOSE_OPTION_MENU:
			return {
				...state,
				optionMenuIsOpen: false,
			};
		case actionTypes.OPEN_SUB_OPTION_MENU:
			return {
				...state,
				subOptionsMenuIsOpen: true,
			};
		case actionTypes.CLOSE_SUB_OPTION_MENU:
			return {
				...state,
				subOptionsMenuIsOpen: false,
			};
		case actionTypes.FETCH_REQUIRED_BOOK_DATA_SUCCEED:
			state.allRequiredBookData = action.allRequiredBookData;
			return {
				...state,
			};
		case actionTypes.FETCH_REQUIRED_BOOK_DATA_FAILED:
			state.allRequiredBookData = [];
			return {
				...state,
			};
		case actionTypes.FETCH_ALL_BOOK_SUCCEED:
			state.bookList = action.bookList;
			return {
				...state,
			};
		case actionTypes.FETCH_ALL_BOOK_FAILED:
			state.bookList = [];
			return {
				...state,
			};
		case actionTypes.FETCH_BOOK_INFO_BY_ID_SUCCEED:
			state.bookInfo = action.bookInfo;
			return {
				...state,
			};
		case actionTypes.FETCH_BOOK_INFO_BY_ID_FAILED:
			state.bookInfo = [];
			return {
				...state,
			};
		case actionTypes.CLEAR_BOOK_INFO:
			state.bookInfo = null;
			return {
				...state,
			};
		default:
			return state;
	}
};

export default appReducer;
