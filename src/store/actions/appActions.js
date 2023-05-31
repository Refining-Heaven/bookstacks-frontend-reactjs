import {
	getAllGenreService,
	getAllKindService,
	getAllCodeService,
	getAllBookService,
	getBookInfoByIdService,
} from '../../services/appService';
import actionTypes from './actionTypes';

const handleChangeLanguage = (language) => ({
	type: actionTypes.CHANGE_LANGUAGE,
	language: language,
});

const handleChangeTheme = (theme) => ({
	type: actionTypes.CHANGE_THEME,
	theme: theme,
});

// Modal
const handleOpenManageBookModal = () => ({
	type: actionTypes.OPEN_MANAGE_BOOK_MODAL,
});

const handleCloseManageBookModal = () => ({
	type: actionTypes.CLOSE_MANAGE_BOOK_MODAL,
});

// Option menu
const handleOpenCloseOptionsMenu = () => ({
	type: actionTypes.OPEN_CLOSE_OPTION_MENU,
});

const handleCloseOptionsMenu = () => ({
	type: actionTypes.CLOSE_OPTION_MENU,
});

// Sub option menu
const handleOpenSubOptionsMenu = () => ({
	type: actionTypes.OPEN_SUB_OPTION_MENU,
});

const handleCloseSubOptionsMenu = () => ({
	type: actionTypes.CLOSE_SUB_OPTION_MENU,
});

// Fetch required book data
const fetchRequiredBookData = () => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: actionTypes.FETCH_REQUIRED_BOOK_DATA_START,
			});
			const resGenre = await getAllGenreService();
			const resKind = await getAllKindService();
			const resStatus = await getAllCodeService('STATUS');
			const resVersion = await getAllCodeService('VERSION');
			const resLanguage = await getAllCodeService('LANGUAGE');
			if (
				resGenre &&
				resGenre.data.errCode === 0 &&
				resKind &&
				resKind.data.errCode === 0 &&
				resStatus &&
				resStatus.data.errCode === 0 &&
				resVersion &&
				resVersion.data.errCode === 0 &&
				resLanguage &&
				resLanguage.data.errCode === 0
			) {
				const data = {
					resGenre: resGenre.data,
					resKind: resKind.data,
					resStatus: resStatus.data,
					resVersion: resVersion.data,
					resLanguage: resLanguage.data,
				};
				dispatch(fetchRequiredBookDataSucceed(data));
			} else {
				dispatch(fetchRequiredBookDataFailed());
			}
		} catch (e) {
			dispatch(fetchRequiredBookDataFailed());
			console.log(e);
		}
	};
};

const fetchRequiredBookDataSucceed = (data) => ({
	type: actionTypes.FETCH_REQUIRED_BOOK_DATA_SUCCEED,
	allRequiredBookData: data,
});

const fetchRequiredBookDataFailed = () => ({
	type: actionTypes.FETCH_REQUIRED_BOOK_DATA_FAILED,
});

// Fetch all book
const fetchAllBook = () => {
	return async (dispatch, getState) => {
		try {
			const response = await getAllBookService();
			if (response && response.data.errCode === 0) {
				dispatch(fetchAllBookSucceed(response.data.data));
			} else {
				dispatch(fetchAllBookFailed());
			}
		} catch (e) {
			dispatch(fetchAllBookFailed());
			console.log(e);
		}
	};
};

const fetchAllBookSucceed = (data) => ({
	type: actionTypes.FETCH_ALL_BOOK_SUCCEED,
	bookList: data,
});

const fetchAllBookFailed = () => ({
	type: actionTypes.FETCH_ALL_BOOK_FAILED,
});

// Fetch all book info
const fetchBookInfoById = (bookId) => {
	return async (dispatch, getState) => {
		try {
			const response = await getBookInfoByIdService(bookId);
			if (response && response.data.errCode === 0) {
				dispatch(fetchBookInfoByIdSucceed(response.data.data));
			} else {
				dispatch(fetchBookInfoByIdFailed());
			}
		} catch (e) {
			dispatch(fetchBookInfoByIdFailed());
			console.log(e);
		}
	};
};

const fetchBookInfoByIdSucceed = (data) => ({
	type: actionTypes.FETCH_BOOK_INFO_BY_ID_SUCCEED,
	bookInfo: data,
});

const fetchBookInfoByIdFailed = () => ({
	type: actionTypes.FETCH_BOOK_INFO_BY_ID_FAILED,
});

//
const clearBookInfo = () => ({
	type: actionTypes.CLEAR_BOOK_INFO
})

export {
	handleChangeLanguage,
	handleChangeTheme,
	handleOpenManageBookModal,
	handleCloseManageBookModal,
	handleOpenCloseOptionsMenu,
	handleCloseOptionsMenu,
	handleOpenSubOptionsMenu,
	handleCloseSubOptionsMenu,
	fetchRequiredBookData,
	fetchAllBook,
	fetchBookInfoById,
	clearBookInfo
};
