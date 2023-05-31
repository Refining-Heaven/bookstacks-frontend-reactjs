import { toast } from 'react-toastify';
import actionTypes from './actionTypes';
import { addNewBookService, deleteBookService, updateBookInfoService } from '../../services/adminService';

//
const handleAddNewBook = (data) => {
	return async (dispatch, getState) => {
		try {
			const response = await addNewBookService(data);
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

//
const handleUpdateBookInfo = (data) => {
	return async (dispatch, getState) => {
		try {
			const response = await updateBookInfoService(data);
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

//
const handleDeleteBook = (bookId) => {
	return async (dispatch, getState) => {
		try {
			const response = await deleteBookService(bookId);
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



export {
	handleAddNewBook,
	handleUpdateBookInfo,
	handleDeleteBook
};