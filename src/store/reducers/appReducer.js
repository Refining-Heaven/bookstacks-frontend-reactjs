import actionTypes from '../actions/actionTypes';

const initialState = {
	started: true,
	language: 'vi',
	theme: 'light',
	manageBookModalIsOpen: false,
	manageChapterModalIsOpen: false,
	optionMenuIsOpen: false,
	subOptionsMenuIsOpen: false,
	allRequiredBookData: [],
	allBooks: [],
	allChapters: [],
	newBooks: [],
	booksFound: null,
	bookInfo: null,
	chapterInfo: null,
	clearSearchValue: true,
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
		case actionTypes.OPEN_MANAGE_CHAPTER_MODAL:
			return {
				...state,
				manageChapterModalIsOpen: true,
			};
		case actionTypes.CLOSE_MANAGE_CHAPTER_MODAL:
			return {
				...state,
				manageChapterModalIsOpen: false,
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
			state.allBooks = action.allBooks;
			return {
				...state,
			};
		case actionTypes.FETCH_ALL_BOOK_FAILED:
			state.allBooks = [];
			return {
				...state,
			};
		case actionTypes.FETCH_ALL_NEW_BOOK_SUCCEED:
			state.newBooks = action.newBooks;
			return {
				...state,
			};
		case actionTypes.FETCH_ALL_NEW_BOOK_FAILED:
			state.newBooks = [];
			return {
				...state,
			};
		case actionTypes.FETCH_ALL_BOOK_BY_NAME_SUCCEED:
			state.booksFound = action.booksFound;
			state.clearSearchValue = false;
			return {
				...state,
			};
		case actionTypes.FETCH_ALL_BOOK_BY_NAME_FAILED:
			state.booksFound = [];
			return {
				...state,
			};
		case actionTypes.FETCH_ALL_BOOK_BY_GENRE_SUCCEED:
			state.booksFound = action.booksFound;
			return {
				...state,
			};
		case actionTypes.FETCH_ALL_BOOK_BY_GENRE_FAILED:
			state.booksFound = [];
			return {
				...state,
			};
		case actionTypes.FETCH_BOOK_INFO_SUCCEED:
			state.bookInfo = action.bookInfo;
			return {
				...state,
			};
		case actionTypes.FETCH_BOOK_INFO_FAILED:
			state.bookInfo = [];
			return {
				...state,
			};
		case actionTypes.FETCH_ALL_CHAPTER_SUCCEED:
			state.allChapters = action.allChapters;
			return {
				...state,
			};
		case actionTypes.FETCH_ALL_CHAPTER_FAILED:
			state.allChapters = [];
			return {
				...state,
			};
		case actionTypes.FETCH_CHAPTER_INFO_SUCCEED:
			state.chapterInfo = action.chapterInfo;
			return {
				...state,
			};
		case actionTypes.FETCH_CHAPTER_INFO_FAILED:
			state.chapterInfo = [];
			return {
				...state,
			};
		case actionTypes.CLEAR_BOOKS_FOUND:
			state.booksFound = null;
			state.clearSearchValue = true;
			return {
				...state,
			};
		case actionTypes.CLEAR_BOOK_INFO:
			state.bookInfo = null;
			return {
				...state,
			};
		case actionTypes.CLEAR_ALL_BOOK:
			state.allBooks = [];
			return {
				...state,
			};
		case actionTypes.CLEAR_ALL_CHAPTER:
			state.allChapters = [];
			return {
				...state,
			};
		case actionTypes.CLEAR_CHAPTER_INFO:
			state.chapterInfo = null;
			return {
				...state,
			};
		default:
			return state;
	}
};

export default appReducer;
