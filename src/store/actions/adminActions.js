import { toast } from 'react-toastify';
import actionTypes from './actionTypes';
import * as services from '../../services';
import * as actions from '../actions';

// Add new book
export const handleAddNewBook = (data) => {
	return async (dispatch, getState) => {
		try {
			const response = await services.addNewBookService(data);
			if (response && response.data.errCode === 0) {
				toast.success(response.data.errMessage);
				dispatch(handleAddNewBookSucceed());
			} else {
				toast.warning(response.data.errMessage);
				dispatch(handleAddNewBookFailed());
			}
		} catch (e) {
			toast.error('Error from server!');
			dispatch(handleAddNewBookFailed());
			console.log(e);
		}
	}
};
const handleAddNewBookSucceed = () => ({
	type: actionTypes.ADD_NEW_BOOK_SUCCEED,
});
const handleAddNewBookFailed = () => ({
	type: actionTypes.ADD_NEW_BOOK_FAILED,
});

// Update book
export const handleUpdateBookInfo = (data) => {
	return async (dispatch, getState) => {
		try {
			const response = await services.updateBookInfoService(data);
			if (response && response.data.errCode === 0) {
				toast.success(response.data.errMessage);
				dispatch(handleUpdateBookInfoSucceed());
			} else {
				toast.warning(response.data.errMessage);
				dispatch(handleUpdateBookInfoFailed());
			}
		} catch (e) {
			toast.error('Error from server!');
			dispatch(handleUpdateBookInfoFailed());
			console.log(e);
		}
	}
};
const handleUpdateBookInfoSucceed = () => ({
	type: actionTypes.UPDATE_BOOK_INFO_SUCCEED,
});
const handleUpdateBookInfoFailed = () => ({
	type: actionTypes.UPDATE_BOOK_INFO_FAILED,
});

// Delete book
export const handleDeleteBook = (bookId) => {
	return async (dispatch, getState) => {
		try {
			const response = await services.deleteBookService(bookId);
			if (response && response.data.errCode === 0) {
				toast.success(response.data.errMessage);
				dispatch(handleDeleteBookSucceed());
			} else {
				toast.warning(response.data.errMessage);
				dispatch(handleDeleteBookFailed());
			}
		} catch (e) {
			toast.error('Error from server!');
			dispatch(handleDeleteBookFailed());
			console.log(e);
		}
	}
};
const handleDeleteBookSucceed = () => ({
	type: actionTypes.DELETE_BOOK_SUCCEED,
});
const handleDeleteBookFailed = () => ({
	type: actionTypes.DELETE_BOOK_FAILED,
});

// Add new book
export const handleAddNewChapter = (data) => {
	return async (dispatch, getState) => {
		try {
			const response = await services.addNewChapterService(data);
			if (response && response.data.errCode === 0) {
				toast.success(response.data.errMessage);
				dispatch(handleAddNewChapterSucceed());
			} else {
				toast.warning(response.data.errMessage);
				dispatch(handleAddNewChapterFailed());
			}
		} catch (e) {
			toast.error('Error from server!');
			dispatch(handleAddNewChapterFailed());
			console.log(e);
		}
	}
};
const handleAddNewChapterSucceed = () => ({
	type: actionTypes.ADD_NEW_CHAPTER_SUCCEED,
});
const handleAddNewChapterFailed = () => ({
	type: actionTypes.ADD_NEW_CHAPTER_FAILED,
});

// Update chapter
export const handleUpdateChapterInfo = (data) => {
	return async (dispatch, getState) => {
		try {
			const response = await services.updateChapterInfoService(data);
			if (response && response.data.errCode === 0) {
				toast.success(response.data.errMessage);
				dispatch(handleUpdateChapterInfoSucceed());
			} else {
				toast.warning(response.data.errMessage);
				dispatch(handleUpdateChapterInfoFailed());
			}
		} catch (e) {
			toast.error('Error from server!');
			dispatch(handleUpdateChapterInfoFailed());
			console.log(e);
		}
	}
};
const handleUpdateChapterInfoSucceed = () => ({
	type: actionTypes.UPDATE_CHAPTER_INFO_SUCCEED,
});
const handleUpdateChapterInfoFailed = () => ({
	type: actionTypes.UPDATE_CHAPTER_INFO_FAILED,
});

// Delete chapter
export const handleDeleteChapter = (chapterId) => {
	return async (dispatch, getState) => {
		try {
			const response = await services.deleteChapterService(chapterId);
			if (response && response.data.errCode === 0) {
				toast.success(response.data.errMessage);
				dispatch(handleDeleteChapterSucceed());
			} else {
				toast.warning(response.data.errMessage);
				dispatch(handleDeleteChapterFailed());
			}
		} catch (e) {
			toast.error('Error from server!');
			dispatch(handleDeleteChapterFailed());
			console.log(e);
		}
	}
};
const handleDeleteChapterSucceed = () => ({
	type: actionTypes.DELETE_CHAPTER_SUCCEED,
});
const handleDeleteChapterFailed = () => ({
	type: actionTypes.DELETE_CHAPTER_FAILED,
});

// Change account info
export const handleChangeAccountInfo = (data) => {
	return async (dispatch, getState) => {
		try {
			const response = await services.changeAccountInfoService(data);
			if (response && response.data.errCode === 0) {
				toast.success(response.data.errMessage);
				dispatch(handleChangeAccountInfoSucceed());
			} else {
				toast.warning(response.data.errMessage);
				dispatch(handleChangeAccountInfoFailed());
			}
		} catch (e) {
			toast.error('Error from server!');
			dispatch(handleChangeAccountInfoFailed());
			console.log(e);
		}
	}
};
const handleChangeAccountInfoSucceed = () => ({
	type: actionTypes.CHANGE_ACCOUNT_INFO_SUCCEED,
});
const handleChangeAccountInfoFailed = () => ({
	type: actionTypes.CHANGE_ACCOUNT_INFO_FAILED,
});

// Change account info
export const handleResetAccountPassword = (data) => {
	return async (dispatch, getState) => {
		try {
			const response = await services.resetAccountPasswordService(data);
			if (response && response.data.errCode === 0) {
				toast.success(response.data.errMessage);
				dispatch(handleResetAccountPasswordSucceed());
			} else {
				toast.warning(response.data.errMessage);
				dispatch(handleResetAccountPasswordFailed());
			}
		} catch (e) {
			toast.error('Error from server!');
			dispatch(handleResetAccountPasswordFailed());
			console.log(e);
		}
	}
};
const handleResetAccountPasswordSucceed = () => ({
	type: actionTypes.CHANGE_ACCOUNT_INFO_SUCCEED,
});
const handleResetAccountPasswordFailed = () => ({
	type: actionTypes.CHANGE_ACCOUNT_INFO_FAILED,
});

// Delete account
export const handleDeleteAccount = (userId) => {
	return async (dispatch, getState) => {
		try {
			const response = await services.deleteAccountService(userId);
			if (response && response.data.errCode === 0) {
				toast.success(response.data.errMessage);
				dispatch(handleDeleteAccountSucceed());
				dispatch(actions.clearSelectedAccountInfo());
			} else {
				toast.warning(response.data.errMessage);
				dispatch(handleDeleteAccountFailed());
			}
		} catch (e) {
			toast.error('Error from server!');
			dispatch(handleDeleteAccountFailed());
			console.log(e);
		}
	}
};
const handleDeleteAccountSucceed = () => ({
	type: actionTypes.DELETE_ACCOUNT_SUCCEED,
});
const handleDeleteAccountFailed = () => ({
	type: actionTypes.DELETE_ACCOUNT_FAILED,
});
