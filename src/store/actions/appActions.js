import * as services from '../../services/appService';
import actionTypes from './actionTypes';

// Change language
export const handleChangeLanguage = (language) => ({
	type: actionTypes.CHANGE_LANGUAGE,
	language: language,
});
export const handleChangeTheme = (theme) => ({
	type: actionTypes.CHANGE_THEME,
	theme: theme,
});

// Modal book
export const handleOpenManageBookModal = () => ({
	type: actionTypes.OPEN_MANAGE_BOOK_MODAL,
});
export const handleCloseManageBookModal = () => ({
	type: actionTypes.CLOSE_MANAGE_BOOK_MODAL,
});

// Modal chapter
export const handleOpenManageChapterModal = () => ({
	type: actionTypes.OPEN_MANAGE_CHAPTER_MODAL,
});
export const handleCloseManageChapterModal = () => ({
	type: actionTypes.CLOSE_MANAGE_CHAPTER_MODAL,
});

// Update account info menu
export const handleOpenUpdateAccountInfoModal = () => ({
	type: actionTypes.OPEN_UPDATE_ACCOUNT_INFO_MODAL,
});
export const handleCloseUpdateAccountInfoModal = () => ({
	type: actionTypes.CLOSE_UPDATE_ACCOUNT_INFO_MODAL,
});

// Option menu
export const handleOpenCloseOptionsMenu = () => ({
	type: actionTypes.OPEN_CLOSE_OPTIONS_MENU,
});
export const handleCloseOptionsMenu = () => ({
	type: actionTypes.CLOSE_OPTIONS_MENU,
});

// Sub option menu
export const handleOpenSubOptionsMenu = () => ({
	type: actionTypes.OPEN_SUB_OPTIONS_MENU,
});
export const handleCloseSubOptionsMenu = () => ({
	type: actionTypes.CLOSE_SUB_OPTIONS_MENU,
});

// Fetch required book data
export const fetchRequiredBookData = () => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: actionTypes.FETCH_REQUIRED_BOOK_DATA_START,
			});
			const resGenre = await services.getAllGenreService();
			const resKind = await services.getAllKindService();
			const resStatus = await services.getAllCodeService('STATUS');
			const resVersion = await services.getAllCodeService('VERSION');
			const resLanguage = await services.getAllCodeService('LANGUAGE');
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
export const fetchAllBook = () => {
	return async (dispatch, getState) => {
		try {
			const response = await services.getAllBookService();
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
	allBooks: data,
});
const fetchAllBookFailed = () => ({
	type: actionTypes.FETCH_ALL_BOOK_FAILED,
});

// Fetch all new book
export const fetchAllNewBook = () => {
	return async (dispatch, getState) => {
		try {
			const response = await services.getAllNewBookService();
			if (response && response.data.errCode === 0) {
				dispatch(fetchAllNewBookSucceed(response.data.data));
			} else {
				dispatch(fetchAllNewBookFailed());
			}
		} catch (e) {
			dispatch(fetchAllNewBookFailed());
			console.log(e);
		}
	};
};
const fetchAllNewBookSucceed = (data) => ({
	type: actionTypes.FETCH_ALL_NEW_BOOK_SUCCEED,
	newBooks: data,
});
const fetchAllNewBookFailed = () => ({
	type: actionTypes.FETCH_ALL_NEW_BOOK_FAILED,
});

// Fetch all book by name
export const fetchAllBookByName = (name) => {
	return async (dispatch, getState) => {
		try {
			const response = await services.getAllBookByNameService(name);
			if (response && response.data.errCode === 0) {
				dispatch(fetchAllBookByNameSucceed(response.data.data));
			} else {
				dispatch(fetchAllBookByNameFailed());
			}
		} catch (e) {
			dispatch(fetchAllBookByNameFailed());
			console.log(e);
		}
	};
};
const fetchAllBookByNameSucceed = (data) => ({
	type: actionTypes.FETCH_ALL_BOOK_BY_NAME_SUCCEED,
	booksFound: data,
});
const fetchAllBookByNameFailed = () => ({
	type: actionTypes.FETCH_ALL_BOOK_BY_NAME_FAILED,
});

// Fetch all book by genre
export const fetchAllBookByGenre = (genreId) => {
	return async (dispatch, getState) => {
		try {
			const response = await services.getAllBookByGenreService(genreId);
			if (response && response.data.errCode === 0) {
				dispatch(fetchAllBookByGenreSucceed(response.data.data));
			} else {
				dispatch(fetchAllBookByGenreFailed());
			}
		} catch (e) {
			dispatch(fetchAllBookByGenreFailed());
			console.log(e);
		}
	};
};
const fetchAllBookByGenreSucceed = (data) => ({
	type: actionTypes.FETCH_ALL_BOOK_BY_GENRE_SUCCEED,
	booksFound: data,
});
const fetchAllBookByGenreFailed = () => ({
	type: actionTypes.FETCH_ALL_BOOK_BY_GENRE_FAILED,
});

// Fetch book info
export const fetchBookInfo = (bookId) => {
	return async (dispatch, getState) => {
		try {
			const response = await services.getBookInfoService(bookId);
			if (response && response.data.errCode === 0) {
				dispatch(fetchBookInfoSucceed(response.data.data));
			} else {
				dispatch(fetchBookInfoFailed());
			}
		} catch (e) {
			dispatch(fetchBookInfoFailed());
			console.log(e);
		}
	};
};
const fetchBookInfoSucceed = (data) => ({
	type: actionTypes.FETCH_BOOK_INFO_SUCCEED,
	bookInfo: data,
});
const fetchBookInfoFailed = () => ({
	type: actionTypes.FETCH_BOOK_INFO_FAILED,
});

// Fetch all chapter
export const fetchAllChapter = (bookId) => {
	return async (dispatch, getState) => {
		try {
			const response = await services.getAllChapterService(bookId);
			if (response && response.data.errCode === 0) {
				dispatch(fetchAllChapterSucceed(response.data.data));
			} else {
				dispatch(fetchAllChapterFailed());
			}
		} catch (e) {
			dispatch(fetchAllChapterFailed());
			console.log(e);
		}
	};
};
const fetchAllChapterSucceed = (data) => ({
	type: actionTypes.FETCH_ALL_CHAPTER_SUCCEED,
	allChapters: data,
});
const fetchAllChapterFailed = () => ({
	type: actionTypes.FETCH_ALL_CHAPTER_FAILED,
});

// Fetch chapter info
export const fetchChapterInfo = (bookId) => {
	return async (dispatch, getState) => {
		try {
			const response = await services.getChapterInfoService(bookId);
			if (response && response.data.errCode === 0) {
				dispatch(fetchChapterInfoSucceed(response.data.data));
			} else {
				dispatch(fetchChapterInfoFailed());
			}
		} catch (e) {
			dispatch(fetchChapterInfoFailed());
			console.log(e);
		}
	};
};
const fetchChapterInfoSucceed = (data) => ({
	type: actionTypes.FETCH_CHAPTER_INFO_SUCCEED,
	chapterInfo: data,
});
const fetchChapterInfoFailed = () => ({
	type: actionTypes.FETCH_CHAPTER_INFO_FAILED,
});

//
export const clearBooksFound = () => ({
	type: actionTypes.CLEAR_BOOKS_FOUND,
});
export const clearBookInfo = () => ({
	type: actionTypes.CLEAR_BOOK_INFO,
});
export const clearAllBook = () => ({
	type: actionTypes.CLEAR_ALL_BOOK,
});
export const clearAllChapter = () => ({
	type: actionTypes.CLEAR_ALL_CHAPTER,
});
export const clearChapterInfo = () => ({
	type: actionTypes.CLEAR_CHAPTER_INFO,
});
