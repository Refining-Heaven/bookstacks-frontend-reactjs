import { toast } from 'react-toastify';
import actionTypes from './actionTypes';
import * as services from '../../services/adminService';

// Add new book
const handleAddNewBook = (data) => {
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
const handleUpdateBookInfo = (data) => {
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
const handleDeleteBook = (bookId) => {
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
const handleAddNewChapter = (data) => {
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
const handleUpdateChapterInfo = (data) => {
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

export {
	handleAddNewBook,
	handleUpdateBookInfo,
	handleDeleteBook,
	handleAddNewChapter,
	handleUpdateChapterInfo
};